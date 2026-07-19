"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

interface Message {
  role: "assistant" | "user";
  text: string;
  suggestions?: string[];
  time?: string;
}

export default function WingmanChat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const BUSINESS_ID = "3";
  const WEBHOOK_URL = "https://n8n.apsan.com.np/webhook/db52b5a8-4f10-42fb-8e89-981bcb477395/chat";

  // LocalStorage helpers
  const safeGetItem = (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  const safeSetItem = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable */
    }
  };

  const safeRemoveItem = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  };

  // Session management
  const SESSION_STORAGE_KEY = `n8n_chat_session__${BUSINESS_ID}`;
  const HISTORY_STORAGE_KEY = `n8n_chat_history__${BUSINESS_ID}__`;

  const [sessionId, setSessionId] = useState<string>(() => {
    let id = safeGetItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = "sess_" + Math.random().toString(36).substr(2, 12);
      safeSetItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  });

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = (): Message[] => {
      const raw = safeGetItem(HISTORY_STORAGE_KEY + sessionId);
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    };

    const history = loadHistory();
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Welcome message for new conversations
      setMessages([
        {
          role: "assistant",
          text: "Hi, I'm Wingman — Aioncy's AI Agent. Ask me anything about Aioncy, our dashboard, features, or how the AI works.",
        },
      ]);
    }
  }, [sessionId]);

  // Save chat history
  const saveHistory = (msgs: Message[]) => {
    safeSetItem(HISTORY_STORAGE_KEY + sessionId, JSON.stringify(msgs));
  };

  // Markdown parser (simplified version from n8n script)
  const parseMarkdown = (text: string): string => {
    if (!text) return text;

    const lines = text.split("\n");
    let html = "";
    let inList = false;
    let listBuffer: string[] = [];

    const parseInlineMarkdown = (t: string): string => {
      return t
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.+?)__/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/_(.+?)_/g, "<em>$1</em>")
        .replace(/~~(.+?)~~/g, "<del>$1</del>")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.match(/^[\*\-]\s+/)) {
        if (!inList) {
          inList = true;
          listBuffer = [];
        }
        const itemText = trimmed.replace(/^[\*\-]\s+/, "");
        listBuffer.push(parseInlineMarkdown(itemText));
      } else {
        if (inList && trimmed.length > 0) {
          html += "<ul>";
          listBuffer.forEach((item) => {
            html += `<li>${item}</li>`;
          });
          html += "</ul>";
          inList = false;
          listBuffer = [];
        }

        if (trimmed.length > 0) {
          html += `<p>${parseInlineMarkdown(trimmed)}</p>`;
        }
      }
    }

    if (inList) {
      html += "<ul>";
      listBuffer.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      html += "</ul>";
    }

    return html;
  };

  const timeStr = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    // Only scroll to bottom on initial load if there's history
    if (messages.length > 0 && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue.trim();
    const userMessage: Message = {
      role: "user",
      text: userMsg,
      time: timeStr(),
    };
    setMessages((prev) => {
      const updated = [...prev, userMessage];
      saveHistory(updated);
      return updated;
    });
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: userMsg,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          metaData: { business_id: BUSINESS_ID },
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const contentType = response.headers.get("content-type") || "";

      // Streaming (SSE / text/event-stream)
      if (
        contentType.includes("text/event-stream") ||
        contentType.includes("text/plain")
      ) {
        setIsTyping(false);
        setIsStreaming(true);
        setStreamingText("");
        let buffer = "";
        let fullReply = "";
        let suggestions: string[] = [];

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const raw = line.slice(6).trim();
                if (raw === "[DONE]") break;
                try {
                  const parsed = JSON.parse(raw);
                  if (Array.isArray(parsed)) {
                    const item = parsed[0];
                    if (item?.response?.output?.reply) {
                      const chunk = item.response.output.reply;
                      fullReply += chunk;
                      setStreamingText(fullReply);
                      if (item.response.output.suggestions) {
                        suggestions = item.response.output.suggestions;
                      }
                    }
                  } else if (parsed.text) {
                    fullReply += parsed.text;
                    setStreamingText(fullReply);
                  } else if (typeof parsed === "string") {
                    fullReply += parsed;
                    setStreamingText(fullReply);
                  }
                } catch {
                  fullReply += raw;
                  setStreamingText(fullReply);
                }
              }
            }
          }
        }

        setIsStreaming(false);
        const botMessage: Message = {
          role: "assistant",
          text: fullReply || "No response received.",
          suggestions: suggestions.length ? suggestions : undefined,
          time: timeStr(),
        };
        setMessages((prev) => {
          const updated = [...prev, botMessage];
          saveHistory(updated);
          return updated;
        });
      } else {
        // JSON response (n8n standard)
        const json = await response.json();
        let reply = "";
        let suggestions: string[] = [];

        if (Array.isArray(json)) {
          const item = json[0];
          if (item?.response?.output?.reply) {
            reply = item.response.output.reply;
            suggestions = item.response.output.suggestions || [];
          } else if (item?.output?.reply) {
            reply = item.output.reply;
            suggestions = item.output.suggestions || [];
          } else if (item?.reply) {
            reply = item.reply;
            suggestions = item.suggestions || [];
          } else {
            reply = JSON.stringify(item);
          }
        } else if (json?.output?.reply) {
          reply = json.output.reply;
          suggestions = json.output.suggestions || [];
        } else if (json?.reply) {
          reply = json.reply;
          suggestions = json.suggestions || [];
        } else if (json?.message) {
          reply = json.message;
        } else {
          reply = JSON.stringify(json);
        }

        setIsTyping(false);
        setIsStreaming(true);
        setStreamingText("");

        // Simulate typewriter streaming for non-streaming endpoints
        let i = 0;
        const speed = Math.max(10, Math.min(30, 1400 / reply.length));

        const typeNext = () => {
          if (i < reply.length) {
            const chunk = reply.slice(i, i + 3);
            setStreamingText((prev) => prev + chunk);
            i += 3;
            setTimeout(typeNext, speed);
          } else {
            setIsStreaming(false);
            const botMessage: Message = {
              role: "assistant",
              text: reply,
              suggestions: suggestions.length ? suggestions : undefined,
              time: timeStr(),
            };
            setMessages((prev) => {
              const updated = [...prev, botMessage];
              saveHistory(updated);
              return updated;
            });
          }
        };
        typeNext();
      }
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setIsStreaming(false);
      setMessages((prev) => {
        const updated: Message[] = [
          ...prev,
          {
            role: "assistant",
            text: "Sorry, I couldn't connect right now. Please try again later.",
            time: timeStr(),
          },
        ];
        saveHistory(updated);
        return updated;
      });
    }
  };

  const handleSuggestionClick = (suggestion: string, index: number) => {
    // Remove the suggestion from the message
    setMessages((prev) => {
      const updated = prev.map((msg, i) => {
        if (i === index && msg.suggestions) {
          return { ...msg, suggestions: [] };
        }
        return msg;
      });
      saveHistory(updated);
      return updated;
    });
    setInputValue(suggestion);
  };

  const clearHistory = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hi, I'm Wingman — Aioncy's AI Agent. Ask me anything about Aioncy, our dashboard, features, or how the AI works.",
      },
    ]);
    safeRemoveItem(HISTORY_STORAGE_KEY + sessionId);
  };

  return (
    <div className="relative z-30 w-full max-w-[628px] h-[550px] lg:h-[628px] mx-auto pointer-events-auto">
      {/* Chat Widget Container */}
      <div className="w-full bg-white rounded-[24px] h-full border border-border-light/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
        {/* Header (Dark Theme) */}
        <div className="flex items-center justify-between px-6 py-4.5 bg-neutral-black text-white">
          <div className="flex flex-col gap-0.5">
            <h3 className="css-body--xl-500">Wingman</h3>
            <p className="css-body--re-400 text-[#FFFFFF99]">
              Try me. I don't bite.
            </p>
          </div>
          <Button
            size="small"
            onClick={clearHistory}
          >
            Join Early
          </Button>
        </div>

        {/* Message Thread */}
        <div
          ref={messagesContainerRef}
          className="flex-1 min-h-[280px] h-full overflow-y-auto px-3 lg:px-4 pt-5 pb-2 flex flex-col scrollbar-thin"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2.5 max-w-[386px] mb-3 ${
                msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              {/* Bot Avatar */}
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#F4F4F4] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_4762_213)">
                      <path
                        d="M11.8199 5.98787C11.8199 6.94822 11.0415 7.727 10.0817 7.727C9.12185 7.727 8.35321 6.95796 8.34382 6.00561V5.97013C8.33443 4.64422 7.26508 3.56979 5.9416 3.55309C5.93117 3.55309 5.92039 3.55309 5.90996 3.55309C5.89953 3.55309 5.8891 3.55309 5.87867 3.55309C4.55345 3.56979 3.48305 4.64631 3.4761 5.97466V6.00109C3.46915 6.95553 2.69355 7.727 1.73822 7.727C0.782896 7.727 0 6.94822 0 5.98787C0 5.02753 0.778377 4.24874 1.73822 4.24874C3.07179 4.24874 4.15505 3.1757 4.17174 1.84526C4.17208 1.83483 4.17208 1.82405 4.17208 1.81361V1.80074C4.17904 0.84596 4.95463 0.0748291 5.90996 0.0748291C6.38971 0.0748291 6.82427 0.269612 7.13888 0.584047C7.45072 0.896047 7.64471 1.32561 7.64784 1.80074V1.81361C7.64784 1.82405 7.64784 1.83483 7.64818 1.84526C7.66487 3.1757 8.74813 4.24874 10.0817 4.24874C11.0415 4.24874 11.8199 5.02718 11.8199 5.98787Z"
                        fill="black"
                      />
                      <path
                        d="M5.90996 4.17395C6.86981 4.17395 7.64818 4.95273 7.64818 5.91308C7.64818 6.87343 6.87954 7.64247 5.92769 7.65186H5.89223C4.56701 7.66125 3.49313 8.73117 3.47645 10.0553C3.47645 10.0658 3.47645 10.0766 3.47645 10.087C3.47645 10.0974 3.47645 10.1079 3.47645 10.1183C3.49313 11.4442 4.56909 12.5152 5.89675 12.5221H5.92317C6.87711 12.5291 7.64818 13.3051 7.64818 14.2609C7.64818 15.2167 6.86981 16 5.90996 16C4.95011 16 4.17174 15.2213 4.17174 14.2609C4.17174 12.9266 3.09925 11.8428 1.76951 11.8261C1.75908 11.8258 1.74831 11.8258 1.73788 11.8258H1.72501C0.770728 11.8188 0 11.0428 0 10.087C0 9.60699 0.194681 9.17221 0.508952 8.85743C0.820789 8.54543 1.25013 8.35134 1.72501 8.34821H1.73788C1.74831 8.34821 1.75908 8.34821 1.76951 8.34786C3.09925 8.33117 4.17174 7.24734 4.17174 5.91308C4.17174 4.95273 4.94977 4.17395 5.90996 4.17395Z"
                        fill="black"
                      />
                      <path
                        d="M10.0903 11.8261C9.13043 11.8261 8.35205 11.0473 8.35205 10.087C8.35205 9.13252 9.12069 8.35756 10.0725 8.34817H10.108C11.4332 8.33878 12.5071 7.26887 12.5238 5.9447C12.5238 5.93426 12.5238 5.92348 12.5238 5.91304C12.5238 5.90261 12.5238 5.89217 12.5238 5.88174C12.5071 4.55583 11.4311 3.48487 10.1035 3.47791H10.0771C9.12313 3.47096 8.35205 2.69496 8.35205 1.73913C8.35205 0.778783 9.13043 0 10.0903 0C11.0505 0 11.8285 0.778783 11.8285 1.73913C11.8285 3.07339 12.901 4.15722 14.2307 4.17391C14.2412 4.17426 14.2519 4.17426 14.2624 4.17426H14.2752C15.2295 4.18122 16.0002 4.95722 16.0002 5.91304C16.0002 6.39304 15.8056 6.82783 15.4913 7.14261C15.1794 7.45461 14.7501 7.6487 14.2752 7.65183H14.2624C14.2519 7.65183 14.2412 7.65183 14.2307 7.65217C12.901 7.66887 11.8285 8.7527 11.8285 10.087C11.8285 11.0473 11.0505 11.8261 10.0903 11.8261Z"
                        fill="black"
                      />
                      <path
                        d="M4.17188 10.0869C4.17188 9.12656 4.95025 8.34778 5.9101 8.34778C6.86995 8.34778 7.63859 9.11682 7.64797 10.0692V10.1046C7.65736 11.4306 8.72672 12.505 10.0502 12.5217C10.0606 12.5217 10.0714 12.5217 10.0818 12.5217C10.0923 12.5217 10.1027 12.5217 10.1131 12.5217C11.4383 12.505 12.5087 11.4285 12.5157 10.1001V10.0737C12.5226 9.11926 13.2982 8.34778 14.2536 8.34778C15.2134 8.34778 15.9918 9.12656 15.9918 10.0869C15.9918 11.0473 15.2134 11.826 14.2536 11.826C12.92 11.826 11.8367 12.8991 11.8201 14.2295C11.8197 14.24 11.8197 14.2507 11.8197 14.2612V14.274C11.8128 15.2288 11.0372 16 10.0818 16C9.60209 16 9.16753 15.8052 8.85291 15.4907C8.54107 15.1787 8.34709 14.7492 8.34396 14.274V14.2612C8.34396 14.2507 8.34396 14.24 8.34361 14.2295C8.32692 12.8991 7.24366 11.826 5.9101 11.826C4.95025 11.826 4.17188 11.0476 4.17188 10.0869Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4762_213">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`p-3 rounded-[18px] xl:max-w-[386px] xl:mr-0 css-body--re-400 ${
                  msg.role === "user"
                    ? "bg-neutral-black text-white rounded-br-sm"
                    : "bg-neutral-offwhite text-neutral-black rounded-bl-sm mr-[40px]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(msg.text),
                    }}
                  />
                ) : (
                  msg.text
                )}
                {/* Suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.suggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSuggestionClick(suggestion, i)}
                        className="px-3 py-1.5 text-xs font-medium bg-white border border-neutral-lightgrey rounded-full hover:bg-neutral-offwhite transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Streaming Message */}
          {isStreaming && (
            <div className="flex items-end gap-2.5 max-w-[386px] self-start mb-3">
              <div className="w-7 h-7 rounded-full bg-[#F4F4F4] flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4762_213)">
                    <path
                      d="M11.8199 5.98787C11.8199 6.94822 11.0415 7.727 10.0817 7.727C9.12185 7.727 8.35321 6.95796 8.34382 6.00561V5.97013C8.33443 4.64422 7.26508 3.56979 5.9416 3.55309C5.93117 3.55309 5.92039 3.55309 5.90996 3.55309C5.89953 3.55309 5.8891 3.55309 5.87867 3.55309C4.55345 3.56979 3.48305 4.64631 3.4761 5.97466V6.00109C3.46915 6.95553 2.69355 7.727 1.73822 7.727C0.782896 7.727 0 6.94822 0 5.98787C0 5.02753 0.778377 4.24874 1.73822 4.24874C3.07179 4.24874 4.15505 3.1757 4.17174 1.84526C4.17208 1.83483 4.17208 1.82405 4.17208 1.81361V1.80074C4.17904 0.84596 4.95463 0.0748291 5.90996 0.0748291C6.38971 0.0748291 6.82427 0.269612 7.13888 0.584047C7.45072 0.896047 7.64471 1.32561 7.64784 1.80074V1.81361C7.64784 1.82405 7.64784 1.83483 7.64818 1.84526C7.66487 3.1757 8.74813 4.24874 10.0817 4.24874C11.0415 4.24874 11.8199 5.02718 11.8199 5.98787Z"
                      fill="black"
                    />
                    <path
                      d="M5.90996 4.17395C6.86981 4.17395 7.64818 4.95273 7.64818 5.91308C7.64818 6.87343 6.87954 7.64247 5.92769 7.65186H5.89223C4.56701 7.66125 3.49313 8.73117 3.47645 10.0553C3.47645 10.0658 3.47645 10.0766 3.47645 10.087C3.47645 10.0974 3.47645 10.1079 3.47645 10.1183C3.49313 11.4442 4.56909 12.5152 5.89675 12.5221H5.92317C6.87711 12.5291 7.64818 13.3051 7.64818 14.2609C7.64818 15.2167 6.86981 16 5.90996 16C4.95011 16 4.17174 15.2213 4.17174 14.2609C4.17174 12.9266 3.09925 11.8428 1.76951 11.8261C1.75908 11.8258 1.74831 11.8258 1.73788 11.8258H1.72501C0.770728 11.8188 0 11.0428 0 10.087C0 9.60699 0.194681 9.17221 0.508952 8.85743C0.820789 8.54543 1.25013 8.35134 1.72501 8.34821H1.73788C1.74831 8.34821 1.75908 8.34821 1.76951 8.34786C3.09925 8.33117 4.17174 7.24734 4.17174 5.91308C4.17174 4.95273 4.94977 4.17395 5.90996 4.17395Z"
                      fill="black"
                    />
                    <path
                      d="M10.0903 11.8261C9.13043 11.8261 8.35205 11.0473 8.35205 10.087C8.35205 9.13252 9.12069 8.35756 10.0725 8.34817H10.108C11.4332 8.33878 12.5071 7.26887 12.5238 5.9447C12.5238 5.93426 12.5238 5.92348 12.5238 5.91304C12.5238 5.90261 12.5238 5.89217 12.5238 5.88174C12.5071 4.55583 11.4311 3.48487 10.1035 3.47791H10.0771C9.12313 3.47096 8.35205 2.69496 8.35205 1.73913C8.35205 0.778783 9.13043 0 10.0903 0C11.0505 0 11.8285 0.778783 11.8285 1.73913C11.8285 3.07339 12.901 4.15722 14.2307 4.17391C14.2412 4.17426 14.2519 4.17426 14.2624 4.17426H14.2752C15.2295 4.18122 16.0002 4.95722 16.0002 5.91304C16.0002 6.39304 15.8056 6.82783 15.4913 7.14261C15.1794 7.45461 14.7501 7.6487 14.2752 7.65183H14.2624C14.2519 7.65183 14.2412 7.65183 14.2307 7.65217C12.901 7.66887 11.8285 8.7527 11.8285 10.087C11.8285 11.0473 11.0505 11.8261 10.0903 11.8261Z"
                      fill="black"
                    />
                    <path
                      d="M4.17188 10.0869C4.17188 9.12656 4.95025 8.34778 5.9101 8.34778C6.86995 8.34778 7.63859 9.11682 7.64797 10.0692V10.1046C7.65736 11.4306 8.72672 12.505 10.0502 12.5217C10.0606 12.5217 10.0714 12.5217 10.0818 12.5217C10.0923 12.5217 10.1027 12.5217 10.1131 12.5217C11.4383 12.505 12.5087 11.4285 12.5157 10.1001V10.0737C12.5226 9.11926 13.2982 8.34778 14.2536 8.34778C15.2134 8.34778 15.9918 9.12656 15.9918 10.0869C15.9918 11.0473 15.2134 11.826 14.2536 11.826C12.92 11.826 11.8367 12.8991 11.8201 14.2295C11.8197 14.24 11.8197 14.2507 11.8197 14.2612V14.274C11.8128 15.2288 11.0372 16 10.0818 16C9.60209 16 9.16753 15.8052 8.85291 15.4907C8.54107 15.1787 8.34709 14.7492 8.34396 14.274V14.2612C8.34396 14.2507 8.34396 14.24 8.34361 14.2295C8.32692 12.8991 7.24366 11.826 5.9101 11.826C4.95025 11.826 4.17188 11.0476 4.17188 10.0869Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4762_213">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="bg-neutral-offwhite px-5 py-3.5 rounded-[18px] rounded-bl-sm mr-[40px]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(streamingText),
                  }}
                />
                <span className="inline-block w-0.5 h-3.5 bg-neutral-black ml-0.5 animate-pulse" />
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2.5 max-w-[386px] self-start mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-utility-yellow to-yellow-400 flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-[14px]">🤖</span>
              </div>
              <div className="bg-neutral-offwhite px-5 py-3.5 rounded-[18px] rounded-bl-sm flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-neutral-lightgrey animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-neutral-lightgrey animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-neutral-lightgrey animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-offwhite bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center border border-border-light/70 focus-within:border-aioncy focus-within:ring-2 focus-within:ring-aioncy/10 rounded-full px-5 py-1 transition-all duration-200 bg-white"
          >
            <input
              type="text"
              placeholder="Message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none css-body--re-400 py-2 text-neutral-black placeholder-placeholder"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                inputValue.trim()
                  ? "text-neutral-black hover:text-neutral-darkgrey cursor-pointer"
                  : "text-placeholder opacity-40 cursor-default"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_4278_150)">
                  <mask
                    id="mask0_4278_150"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <path d="M24 0H0V24H24V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_4278_150)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.84648 7.15129C1.54567 7.21614 1.31499 7.45817 1.26465 7.76176C1.21431 8.06534 1.35453 8.36887 1.61831 8.52735L8.13475 12.4422L14.3544 8.08711C14.6938 7.84953 15.1614 7.93199 15.399 8.27129C15.6366 8.6106 15.5541 9.07826 15.2148 9.31584L8.99538 13.6708L10.4455 21.134C10.5042 21.4361 10.7415 21.6716 11.044 21.7282C11.3465 21.7847 11.6528 21.6507 11.8166 21.3902L22.7919 3.93899C22.9526 3.68355 22.9445 3.35671 22.7714 3.10953C22.5983 2.86234 22.294 2.74296 21.999 2.80655L1.84648 7.15129Z"
                      fill="#8C8C8C"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_4278_150">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Handwritten Callout alongside the chat input */}
      <div className="absolute left-[calc(100%+16px)] bottom-[60px] hidden xl:flex items-start gap-1 select-none pointer-events-none whitespace-nowrap">
        <svg
          width="200"
          height="48"
          viewBox="0 0 200 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8279 14.8438C17.255 14.4141 16.8643 13.8867 16.656 13.2617C16.4477 12.6367 16.3826 11.9596 16.4607 11.2305C16.5388 10.4883 16.7341 9.72005 17.0466 8.92578C17.3591 8.11849 17.7432 7.33073 18.199 6.5625C18.6677 5.79427 19.1886 5.0651 19.7615 4.375C20.3474 3.67188 20.9399 3.0599 21.5388 2.53906C22.1508 2.00521 22.7498 1.58203 23.3357 1.26953C23.9347 0.94401 24.4815 0.768229 24.9763 0.742188C25.2107 0.677083 25.4451 0.683594 25.6794 0.761719C25.9268 0.839844 26.1482 0.963542 26.3435 1.13281C26.5388 1.28906 26.7016 1.47786 26.8318 1.69922C26.962 1.92057 27.0466 2.14193 27.0857 2.36328C27.1248 2.57161 27.0987 2.77344 27.0076 2.96875C26.9164 3.15104 26.7472 3.28776 26.4998 3.37891C26.4607 3.40495 26.3956 3.41797 26.3044 3.41797C26.2263 3.41797 26.1873 3.40495 26.1873 3.37891V1.83594C26.1873 1.8099 26.1547 1.78385 26.0896 1.75781C26.0245 1.71875 25.9464 1.69271 25.8552 1.67969C25.7771 1.65365 25.6925 1.63411 25.6013 1.62109C25.5232 1.60807 25.4581 1.60807 25.406 1.62109C24.1169 1.94661 23.0102 2.49349 22.0857 3.26172C21.1742 4.02995 20.4125 4.94141 19.8005 5.99609C18.9281 7.51953 18.2901 8.78906 17.8865 9.80469C17.4958 10.8203 17.2745 11.6276 17.2224 12.2266C17.1833 12.8255 17.294 13.2487 17.5544 13.4961C17.8149 13.7305 18.1664 13.8346 18.6091 13.8086C19.0518 13.7826 19.5662 13.6523 20.1521 13.418C20.738 13.1706 21.3305 12.8711 21.9294 12.5195C22.5414 12.1549 23.1339 11.7578 23.7068 11.3281C24.2797 10.8854 24.781 10.4622 25.2107 10.0586C25.6404 9.65495 25.9659 9.29036 26.1873 8.96484C26.4216 8.6263 26.4998 8.37891 26.4216 8.22266C26.2133 8.18359 25.9854 8.19661 25.738 8.26172C25.4906 8.3138 25.2758 8.3724 25.0935 8.4375C24.9763 8.47656 24.755 8.54818 24.4294 8.65234C24.1169 8.75651 23.7849 8.86719 23.4333 8.98438C23.0818 9.10156 22.7498 9.21224 22.4373 9.31641C22.1248 9.42057 21.9099 9.4987 21.7927 9.55078C21.6104 9.61589 21.4542 9.60286 21.324 9.51172C21.2068 9.40755 21.1222 9.28385 21.0701 9.14062C21.031 8.98438 21.031 8.84115 21.0701 8.71094C21.1091 8.56771 21.2003 8.47656 21.3435 8.4375C21.5518 8.39844 21.9164 8.28776 22.4373 8.10547C22.9711 7.91016 23.5701 7.70182 24.2341 7.48047C24.8982 7.24609 25.5818 7.01823 26.2849 6.79688C26.988 6.57552 27.6065 6.41276 28.1404 6.30859C28.6742 6.20443 29.0779 6.19141 29.3513 6.26953C29.6378 6.33464 29.6964 6.54297 29.5271 6.89453C29.4099 7.02474 29.1951 7.2526 28.8826 7.57812C28.5701 7.89062 28.238 8.22266 27.8865 8.57422C27.5349 8.92578 27.1964 9.25781 26.8708 9.57031C26.5583 9.88281 26.337 10.0977 26.2068 10.2148C26.1547 10.2539 26.005 10.3776 25.7576 10.5859C25.5232 10.7943 25.2498 11.0286 24.9373 11.2891C24.6378 11.5365 24.3383 11.7904 24.0388 12.0508C23.7393 12.2982 23.505 12.487 23.3357 12.6172C23.1664 12.7604 22.9516 12.9427 22.6912 13.1641C22.4307 13.3854 22.1378 13.6133 21.8123 13.8477C21.4998 14.069 21.1677 14.2839 20.8162 14.4922C20.4646 14.6875 20.113 14.8438 19.7615 14.9609C19.4099 15.0781 19.0649 15.1367 18.7263 15.1367C18.4008 15.1367 18.1013 15.0391 17.8279 14.8438ZM29.8005 14.8438C29.2537 14.6224 28.9086 14.2904 28.7654 13.8477C28.6352 13.4049 28.6417 12.9167 28.7849 12.3828C28.9281 11.8359 29.1755 11.276 29.5271 10.7031C29.8787 10.1172 30.2693 9.58333 30.699 9.10156C31.1287 8.61979 31.5583 8.21615 31.988 7.89062C32.4307 7.55208 32.8083 7.36328 33.1208 7.32422C33.9281 7.22005 34.5597 7.27865 35.0154 7.5C35.4841 7.70833 35.8031 8.01432 35.9724 8.41797C36.1417 8.82161 36.1873 9.29688 36.1091 9.84375C36.031 10.3776 35.8552 10.918 35.5818 11.4648C35.3214 12.0117 34.9763 12.5391 34.5466 13.0469C34.13 13.5547 33.6612 13.9844 33.1404 14.3359C32.6326 14.6745 32.0922 14.9023 31.5193 15.0195C30.9464 15.1237 30.3735 15.0651 29.8005 14.8438ZM29.5857 13.7305C29.6899 14.1471 29.9112 14.3815 30.2498 14.4336C30.5883 14.4727 30.9789 14.388 31.4216 14.1797C31.8774 13.9583 32.3526 13.6458 32.8474 13.2422C33.3422 12.8255 33.7914 12.3763 34.1951 11.8945C34.6117 11.4128 34.9503 10.931 35.2107 10.4492C35.4841 9.95443 35.6143 9.52474 35.6013 9.16016C35.6013 8.79557 35.4255 8.52214 35.074 8.33984C34.7354 8.14453 34.1625 8.10547 33.3552 8.22266C33.1729 8.39193 32.9386 8.60026 32.6521 8.84766C32.3656 9.08203 32.0662 9.34245 31.7537 9.62891C31.4542 9.91536 31.1547 10.2279 30.8552 10.5664C30.5557 10.8919 30.2953 11.2305 30.074 11.582C29.8526 11.9336 29.6899 12.2917 29.5857 12.6562C29.4945 13.0208 29.4945 13.3789 29.5857 13.7305ZM48.2771 14.6094C47.9646 14.349 47.7888 13.9648 47.7498 13.457C47.7237 12.9492 47.7953 12.3763 47.9646 11.7383C48.1469 11.1003 48.4073 10.4362 48.7458 9.74609C49.0974 9.04297 49.5011 8.37891 49.9568 7.75391C50.4125 7.11589 50.9073 6.54948 51.4412 6.05469C51.975 5.54688 52.5089 5.17578 53.0427 4.94141C53.5766 4.69401 54.0974 4.60938 54.6052 4.6875C55.113 4.7526 55.5753 5.04557 55.9919 5.56641C56.2524 5.89193 56.4086 6.22396 56.4607 6.5625C56.5128 6.88802 56.5063 7.22656 56.4412 7.57812C56.3761 7.91667 56.2719 8.26823 56.1287 8.63281C55.9854 8.98438 55.8422 9.34245 55.699 9.70703C55.5688 10.0716 55.4581 10.4427 55.3669 10.8203C55.2888 11.1979 55.2758 11.582 55.3279 11.9727C55.393 12.4674 55.6143 12.7604 55.9919 12.8516C56.3695 12.9427 56.8188 12.9167 57.3396 12.7734C57.8735 12.6302 58.4333 12.4023 59.0193 12.0898C59.6052 11.7773 60.1456 11.4648 60.6404 11.1523C61.1482 10.8398 61.5649 10.5664 61.8904 10.332C62.2289 10.0977 62.3982 9.98047 62.3982 9.98047C62.7628 9.90234 62.9646 9.92839 63.0037 10.0586C63.0557 10.1758 62.9841 10.3581 62.7888 10.6055C62.6065 10.8398 62.3266 11.1133 61.949 11.4258C61.5714 11.7253 61.1417 12.0182 60.6599 12.3047C60.1781 12.5911 59.6638 12.8516 59.1169 13.0859C58.5701 13.3203 58.0362 13.4831 57.5154 13.5742C56.9945 13.6523 56.4998 13.6458 56.031 13.5547C55.5753 13.4505 55.1977 13.2161 54.8982 12.8516C54.755 12.6953 54.6443 12.5391 54.5662 12.3828C54.5011 12.2266 54.3904 12.0898 54.2341 11.9727C54.0388 12.1549 53.8044 12.3958 53.531 12.6953C53.2576 12.9818 52.9581 13.2747 52.6326 13.5742C52.3201 13.8607 51.9815 14.1341 51.6169 14.3945C51.2654 14.6549 50.9008 14.8503 50.5232 14.9805C50.1456 15.1107 49.7615 15.1562 49.3708 15.1172C48.9932 15.0781 48.6287 14.9089 48.2771 14.6094ZM48.4919 13.9453C48.6091 14.362 48.8695 14.5573 49.2732 14.5312C49.6768 14.4922 50.1456 14.2904 50.6794 13.9258C51.2133 13.5612 51.7667 13.0664 52.3396 12.4414C52.9125 11.8034 53.4268 11.1003 53.8826 10.332C54.3383 9.55078 54.6833 8.73047 54.9177 7.87109C55.1651 7.01172 55.2302 6.16536 55.113 5.33203C54.8005 5.08464 54.4099 5.07812 53.9412 5.3125C53.4724 5.53385 52.9711 5.90495 52.4373 6.42578C51.9164 6.93359 51.3956 7.54557 50.8748 8.26172C50.3669 8.96484 49.9177 9.68099 49.5271 10.4102C49.1365 11.1263 48.837 11.8034 48.6287 12.4414C48.4333 13.0794 48.3878 13.5807 48.4919 13.9453ZM61.0896 14.6094C61.0766 14.5833 61.0701 14.5508 61.0701 14.5117C61.0701 14.4596 61.0766 14.4206 61.0896 14.3945C61.1417 14.2904 61.2263 14.1146 61.3435 13.8672C61.4737 13.6068 61.6039 13.3398 61.7341 13.0664C61.8774 12.7799 62.0141 12.513 62.1443 12.2656C62.2745 12.0182 62.3656 11.8424 62.4177 11.7383C62.4438 11.6992 62.5089 11.5885 62.613 11.4062C62.7302 11.224 62.8669 11.0026 63.0232 10.7422C63.1925 10.4688 63.3682 10.1693 63.5505 9.84375C63.7458 9.51823 63.9347 9.19922 64.1169 8.88672C64.3123 8.57422 64.488 8.28125 64.6443 8.00781C64.8136 7.73438 64.9503 7.50651 65.0544 7.32422C65.3149 6.89453 65.6143 6.38672 65.9529 5.80078C66.3044 5.21484 66.6625 4.6224 67.0271 4.02344C67.3917 3.42448 67.7498 2.84505 68.1013 2.28516C68.4659 1.72526 68.7979 1.26302 69.0974 0.898438C69.3969 0.533854 69.6508 0.292969 69.8591 0.175781C70.0675 0.0585938 70.2107 0.136719 70.2888 0.410156V1.03516C70.1977 1.17839 70.074 1.36719 69.9177 1.60156C69.7615 1.82292 69.5987 2.0638 69.4294 2.32422C69.2732 2.57161 69.1169 2.8125 68.9607 3.04688C68.8044 3.28125 68.6873 3.46354 68.6091 3.59375C68.4919 3.77604 68.3031 4.06901 68.0427 4.47266C67.7823 4.8763 67.4893 5.33203 67.1638 5.83984C66.8383 6.34766 66.5063 6.88151 66.1677 7.44141C65.8292 7.98828 65.5232 8.5026 65.2498 8.98438C64.9763 9.46615 64.755 9.88281 64.5857 10.2344C64.4294 10.5729 64.3708 10.7878 64.4099 10.8789C64.7224 10.7878 65.0544 10.625 65.406 10.3906C65.7706 10.1432 66.1352 9.88281 66.4998 9.60938C66.8643 9.33594 67.2289 9.07552 67.5935 8.82812C67.9581 8.56771 68.2966 8.36589 68.6091 8.22266C68.9216 8.26172 69.1951 8.37891 69.4294 8.57422C69.6638 8.76953 69.8331 9.01693 69.9373 9.31641C69.9242 9.43359 69.9112 9.65495 69.8982 9.98047C69.8982 10.293 69.8982 10.625 69.8982 10.9766C69.8982 11.3281 69.8982 11.6602 69.8982 11.9727C69.9112 12.2852 69.9242 12.5 69.9373 12.6172C69.9503 12.7604 70.0154 12.9427 70.1326 13.1641C70.2498 13.3724 70.3735 13.5872 70.5037 13.8086C70.6469 14.0169 70.7706 14.1992 70.8748 14.3555C70.9919 14.5117 71.044 14.5964 71.031 14.6094C70.7706 14.7005 70.5232 14.707 70.2888 14.6289C70.0544 14.5378 69.8461 14.401 69.6638 14.2188C69.4945 14.0234 69.3513 13.8086 69.2341 13.5742C69.13 13.3268 69.0649 13.0859 69.0388 12.8516C69.0258 12.7344 69.0063 12.5195 68.9802 12.207C68.9542 11.8815 68.9281 11.543 68.9021 11.1914C68.8891 10.8398 68.8695 10.5078 68.8435 10.1953C68.8305 9.88281 68.824 9.66797 68.824 9.55078L68.3748 9.31641C68.2966 9.27734 68.1599 9.3099 67.9646 9.41406C67.7823 9.51823 67.5675 9.66146 67.3201 9.84375C67.0727 10.026 66.8123 10.2344 66.5388 10.4688C66.2654 10.7031 66.005 10.9245 65.7576 11.1328C65.5232 11.3411 65.3214 11.5234 65.1521 11.6797C64.9828 11.8359 64.8787 11.9336 64.8396 11.9727C64.7354 12.0768 64.5466 12.2656 64.2732 12.5391C63.9998 12.7995 63.7068 13.0859 63.3943 13.3984C63.0948 13.6979 62.8083 13.9844 62.5349 14.2578C62.2745 14.5312 62.0922 14.7266 61.988 14.8438C61.8057 14.8828 61.63 14.9023 61.4607 14.9023C61.3044 14.8893 61.1807 14.7917 61.0896 14.6094ZM73.3552 14.8438C72.9646 14.7135 72.6651 14.5182 72.4568 14.2578C72.2615 13.9844 72.1313 13.6849 72.0662 13.3594C72.0011 13.0339 71.988 12.6953 72.0271 12.3438C72.0792 11.9792 72.1573 11.6341 72.2615 11.3086C72.6521 10.8919 73.0883 10.4167 73.5701 9.88281C74.0649 9.33594 74.5857 8.80208 75.1326 8.28125C75.6794 7.76042 76.2458 7.27865 76.8318 6.83594C77.4307 6.38021 78.0362 6.03516 78.6482 5.80078C78.8565 5.70964 79.0193 5.71615 79.1365 5.82031C79.2667 5.91146 79.3578 6.0612 79.4099 6.26953C79.462 6.47786 79.4815 6.71875 79.4685 6.99219C79.4685 7.26562 79.449 7.53255 79.4099 7.79297C79.3708 8.05339 79.3188 8.28776 79.2537 8.49609C79.1886 8.70443 79.1235 8.84766 79.0583 8.92578C78.9021 9.10807 78.5961 9.32292 78.1404 9.57031C77.6977 9.81771 77.2029 10.0911 76.656 10.3906C76.1091 10.6771 75.5623 10.9766 75.0154 11.2891C74.4685 11.6016 74.0193 11.9141 73.6677 12.2266C73.3162 12.526 73.1078 12.8255 73.0427 13.125C72.9776 13.4245 73.1599 13.6979 73.5896 13.9453C74.0323 13.9974 74.5662 13.9779 75.1912 13.8867C75.8292 13.7826 76.4737 13.6523 77.1248 13.4961C77.7888 13.3268 78.4268 13.1576 79.0388 12.9883C79.6508 12.806 80.1521 12.6628 80.5427 12.5586L80.7771 12.7734C80.4906 13.151 80.0219 13.4961 79.3708 13.8086C78.7198 14.1211 78.0167 14.3815 77.2615 14.5898C76.5063 14.7852 75.7706 14.9154 75.0544 14.9805C74.3383 15.0326 73.7719 14.987 73.3552 14.8438ZM78.0232 7.38281C78.0102 7.36979 77.9125 7.42839 77.7302 7.55859C77.5479 7.67578 77.3201 7.83854 77.0466 8.04688C76.7862 8.24219 76.4998 8.46354 76.1873 8.71094C75.8878 8.94531 75.6078 9.16667 75.3474 9.375C75.1 9.58333 74.8917 9.76562 74.7224 9.92188C74.5531 10.0651 74.4815 10.1367 74.5076 10.1367C74.7159 10.1758 74.9828 10.1497 75.3083 10.0586C75.6469 9.95443 75.9919 9.8112 76.3435 9.62891C76.7081 9.44661 77.0531 9.24479 77.3787 9.02344C77.7042 8.78906 77.9581 8.5612 78.1404 8.33984C78.3357 8.11849 78.4333 7.92318 78.4333 7.75391C78.4464 7.58464 78.3097 7.46094 78.0232 7.38281ZM81.3044 14.6094C80.9919 14.349 80.8162 13.9648 80.7771 13.457C80.7511 12.9492 80.8227 12.3763 80.9919 11.7383C81.1742 11.1003 81.4347 10.4362 81.7732 9.74609C82.1248 9.04297 82.5284 8.37891 82.9841 7.75391C83.4399 7.11589 83.9347 6.54948 84.4685 6.05469C85.0024 5.54688 85.5362 5.17578 86.0701 4.94141C86.6039 4.69401 87.1248 4.60938 87.6326 4.6875C88.1404 4.7526 88.6026 5.04557 89.0193 5.56641C89.2797 5.89193 89.436 6.22396 89.488 6.5625C89.5401 6.88802 89.5336 7.22656 89.4685 7.57812C89.4034 7.91667 89.2992 8.26823 89.156 8.63281C89.0128 8.98438 88.8695 9.34245 88.7263 9.70703C88.5961 10.0716 88.4854 10.4427 88.3943 10.8203C88.3162 11.1979 88.3031 11.582 88.3552 11.9727C88.4203 12.4674 88.6417 12.7604 89.0193 12.8516C89.3969 12.9427 89.8461 12.9167 90.3669 12.7734C90.9008 12.6302 91.4607 12.4023 92.0466 12.0898C92.6326 11.7773 93.1729 11.4648 93.6677 11.1523C94.1755 10.8398 94.5922 10.5664 94.9177 10.332C95.2563 10.0977 95.4255 9.98047 95.4255 9.98047C95.7901 9.90234 95.9919 9.92839 96.031 10.0586C96.0831 10.1758 96.0115 10.3581 95.8162 10.6055C95.6339 10.8398 95.3539 11.1133 94.9763 11.4258C94.5987 11.7253 94.169 12.0182 93.6873 12.3047C93.2055 12.5911 92.6912 12.8516 92.1443 13.0859C91.5974 13.3203 91.0636 13.4831 90.5427 13.5742C90.0219 13.6523 89.5271 13.6458 89.0583 13.5547C88.6026 13.4505 88.225 13.2161 87.9255 12.8516C87.7823 12.6953 87.6716 12.5391 87.5935 12.3828C87.5284 12.2266 87.4177 12.0898 87.2615 11.9727C87.0662 12.1549 86.8318 12.3958 86.5583 12.6953C86.2849 12.9818 85.9854 13.2747 85.6599 13.5742C85.3474 13.8607 85.0089 14.1341 84.6443 14.3945C84.2927 14.6549 83.9281 14.8503 83.5505 14.9805C83.1729 15.1107 82.7888 15.1562 82.3982 15.1172C82.0206 15.0781 81.656 14.9089 81.3044 14.6094ZM81.5193 13.9453C81.6365 14.362 81.8969 14.5573 82.3005 14.5312C82.7042 14.4922 83.1729 14.2904 83.7068 13.9258C84.2406 13.5612 84.794 13.0664 85.3669 12.4414C85.9399 11.8034 86.4542 11.1003 86.9099 10.332C87.3656 9.55078 87.7107 8.73047 87.9451 7.87109C88.1925 7.01172 88.2576 6.16536 88.1404 5.33203C87.8279 5.08464 87.4373 5.07812 86.9685 5.3125C86.4998 5.53385 85.9985 5.90495 85.4646 6.42578C84.9438 6.93359 84.4229 7.54557 83.9021 8.26172C83.3943 8.96484 82.9451 9.68099 82.5544 10.4102C82.1638 11.1263 81.8643 11.8034 81.656 12.4414C81.4607 13.0794 81.4151 13.5807 81.5193 13.9453ZM102.301 14.6094C101.806 14.2708 101.448 13.8542 101.226 13.3594C101.005 12.8516 100.842 12.3112 100.738 11.7383H100.523C99.4685 12.5977 98.5505 13.2422 97.7693 13.6719C97.0011 14.1016 96.35 14.3685 95.8162 14.4727C95.2823 14.5638 94.8656 14.5182 94.5662 14.3359C94.2667 14.1536 94.0714 13.8932 93.9802 13.5547C93.9021 13.2031 93.9216 12.793 94.0388 12.3242C94.156 11.8555 94.3578 11.3867 94.6443 10.918C94.9307 10.4362 95.3018 9.98047 95.7576 9.55078C96.2133 9.12109 96.7341 8.76953 97.3201 8.49609C97.919 8.22266 98.5766 8.05339 99.2927 7.98828C100.022 7.91016 100.803 7.98828 101.636 8.22266L101.851 7.98828L104.488 2.69531C104.84 2.7474 105.048 2.90365 105.113 3.16406C105.178 3.42448 105.172 3.71094 105.094 4.02344C105.028 4.33594 104.924 4.64193 104.781 4.94141C104.651 5.22786 104.553 5.4362 104.488 5.56641C104.449 5.64453 104.371 5.79427 104.254 6.01562C104.149 6.23698 104.019 6.50391 103.863 6.81641C103.72 7.11589 103.564 7.4349 103.394 7.77344C103.225 8.11198 103.062 8.4375 102.906 8.75C102.763 9.04948 102.633 9.31641 102.515 9.55078C102.398 9.77214 102.327 9.91536 102.301 9.98047C102.066 10.4622 101.955 10.9766 101.969 11.5234C101.995 12.0573 102.027 12.5716 102.066 13.0664C102.118 13.3008 102.222 13.4961 102.379 13.6523C102.535 13.7956 102.698 13.9323 102.867 14.0625C103.049 14.1797 103.225 14.2969 103.394 14.4141C103.577 14.5312 103.726 14.6745 103.844 14.8438C103.791 15.013 103.687 15.0977 103.531 15.0977C103.375 15.1107 103.212 15.0846 103.043 15.0195C102.873 14.9544 102.717 14.8763 102.574 14.7852C102.431 14.694 102.34 14.6354 102.301 14.6094ZM95.0154 13.7305C95.0675 13.9518 95.2628 14.0169 95.6013 13.9258C95.9529 13.8346 96.363 13.6458 96.8318 13.3594C97.3005 13.0599 97.7953 12.7018 98.3162 12.2852C98.85 11.8685 99.3253 11.4518 99.7419 11.0352C100.172 10.6185 100.504 10.2344 100.738 9.88281C100.985 9.53125 101.064 9.27083 100.972 9.10156C100.569 8.88021 100.12 8.76953 99.6248 8.76953C99.13 8.76953 98.6352 8.86068 98.1404 9.04297C97.6586 9.21224 97.1899 9.45964 96.7341 9.78516C96.2914 10.0977 95.9138 10.4622 95.6013 10.8789C95.3018 11.2956 95.087 11.7513 94.9568 12.2461C94.8396 12.7279 94.8591 13.2227 95.0154 13.7305ZM104.293 17.9102C104.228 17.7279 104.26 17.513 104.39 17.2656C104.508 17.0312 104.657 16.7904 104.84 16.543C105.035 16.3086 105.23 16.0742 105.426 15.8398C105.621 15.6055 105.758 15.4102 105.836 15.2539C105.953 15.0195 106.038 14.7852 106.09 14.5508C106.142 14.3164 106.174 14.082 106.187 13.8477C106.2 13.6133 106.207 13.3789 106.207 13.1445C106.22 12.8971 106.246 12.6432 106.285 12.3828C106.337 12.0182 106.422 11.888 106.539 11.9922C106.669 12.0833 106.786 12.3047 106.89 12.6562C106.995 12.9948 107.06 13.3919 107.086 13.8477C107.125 14.3034 107.079 14.7005 106.949 15.0391C106.923 15.0781 106.871 15.1953 106.793 15.3906C106.715 15.5859 106.61 15.8073 106.48 16.0547C106.363 16.3151 106.22 16.582 106.051 16.8555C105.894 17.1419 105.725 17.3893 105.543 17.5977C105.373 17.819 105.198 17.9818 105.015 18.0859C104.846 18.2031 104.677 18.2227 104.508 18.1445C104.482 18.1315 104.442 18.0924 104.39 18.0273C104.338 17.9753 104.306 17.9362 104.293 17.9102ZM119.136 14.8438C118.98 14.7396 118.974 14.6029 119.117 14.4336C119.273 14.2513 119.514 14.0625 119.84 13.8672C120.178 13.6589 120.569 13.444 121.011 13.2227C121.454 13.0013 121.877 12.793 122.281 12.5977C122.698 12.4023 123.062 12.2331 123.375 12.0898C123.687 11.9336 123.889 11.8164 123.98 11.7383C124.41 11.3737 124.631 11.0742 124.644 10.8398C124.67 10.5924 124.566 10.3971 124.332 10.2539C124.097 10.0977 123.765 9.98047 123.336 9.90234C122.919 9.8112 122.483 9.73307 122.027 9.66797C121.584 9.58984 121.155 9.51172 120.738 9.43359C120.334 9.35547 120.028 9.2513 119.82 9.12109C119.612 8.99089 119.54 8.82161 119.605 8.61328C119.683 8.39193 119.97 8.11198 120.465 7.77344C120.647 7.64323 120.914 7.45443 121.265 7.20703C121.617 6.95964 121.995 6.70573 122.398 6.44531C122.815 6.1849 123.225 5.95052 123.629 5.74219C124.032 5.53385 124.371 5.39714 124.644 5.33203C124.788 5.30599 124.931 5.31901 125.074 5.37109C125.23 5.42318 125.354 5.5013 125.445 5.60547C125.536 5.69661 125.575 5.80078 125.562 5.91797C125.562 6.03516 125.478 6.13932 125.308 6.23047C124.566 6.64714 123.85 7.03776 123.16 7.40234C122.483 7.76693 121.799 8.18359 121.109 8.65234C121.07 8.75651 121.077 8.84766 121.129 8.92578C121.194 9.00391 121.265 9.0625 121.344 9.10156C122.724 9.24479 123.759 9.44661 124.449 9.70703C125.152 9.96745 125.595 10.2539 125.777 10.5664C125.972 10.8789 125.953 11.2109 125.719 11.5625C125.484 11.9141 125.133 12.2591 124.664 12.5977C124.208 12.9362 123.681 13.2552 123.082 13.5547C122.483 13.8542 121.903 14.1081 121.344 14.3164C120.797 14.5247 120.315 14.681 119.898 14.7852C119.482 14.8893 119.228 14.9089 119.136 14.8438ZM127.418 14.6094C127.105 14.349 126.929 13.9648 126.89 13.457C126.864 12.9492 126.936 12.3763 127.105 11.7383C127.288 11.1003 127.548 10.4362 127.886 9.74609C128.238 9.04297 128.642 8.37891 129.097 7.75391C129.553 7.11589 130.048 6.54948 130.582 6.05469C131.116 5.54688 131.649 5.17578 132.183 4.94141C132.717 4.69401 133.238 4.60938 133.746 4.6875C134.254 4.7526 134.716 5.04557 135.133 5.56641C135.393 5.89193 135.549 6.22396 135.601 6.5625C135.653 6.88802 135.647 7.22656 135.582 7.57812C135.517 7.91667 135.413 8.26823 135.269 8.63281C135.126 8.98438 134.983 9.34245 134.84 9.70703C134.709 10.0716 134.599 10.4427 134.508 10.8203C134.429 11.1979 134.416 11.582 134.469 11.9727C134.534 12.4674 134.755 12.7604 135.133 12.8516C135.51 12.9427 135.959 12.9167 136.48 12.7734C137.014 12.6302 137.574 12.4023 138.16 12.0898C138.746 11.7773 139.286 11.4648 139.781 11.1523C140.289 10.8398 140.705 10.5664 141.031 10.332C141.37 10.0977 141.539 9.98047 141.539 9.98047C141.903 9.90234 142.105 9.92839 142.144 10.0586C142.196 10.1758 142.125 10.3581 141.929 10.6055C141.747 10.8398 141.467 11.1133 141.09 11.4258C140.712 11.7253 140.282 12.0182 139.801 12.3047C139.319 12.5911 138.804 12.8516 138.258 13.0859C137.711 13.3203 137.177 13.4831 136.656 13.5742C136.135 13.6523 135.64 13.6458 135.172 13.5547C134.716 13.4505 134.338 13.2161 134.039 12.8516C133.896 12.6953 133.785 12.5391 133.707 12.3828C133.642 12.2266 133.531 12.0898 133.375 11.9727C133.179 12.1549 132.945 12.3958 132.672 12.6953C132.398 12.9818 132.099 13.2747 131.773 13.5742C131.461 13.8607 131.122 14.1341 130.758 14.3945C130.406 14.6549 130.041 14.8503 129.664 14.9805C129.286 15.1107 128.902 15.1562 128.511 15.1172C128.134 15.0781 127.769 14.9089 127.418 14.6094ZM127.633 13.9453C127.75 14.362 128.01 14.5573 128.414 14.5312C128.817 14.4922 129.286 14.2904 129.82 13.9258C130.354 13.5612 130.907 13.0664 131.48 12.4414C132.053 11.8034 132.567 11.1003 133.023 10.332C133.479 9.55078 133.824 8.73047 134.058 7.87109C134.306 7.01172 134.371 6.16536 134.254 5.33203C133.941 5.08464 133.551 5.07812 133.082 5.3125C132.613 5.53385 132.112 5.90495 131.578 6.42578C131.057 6.93359 130.536 7.54557 130.015 8.26172C129.508 8.96484 129.058 9.68099 128.668 10.4102C128.277 11.1263 127.978 11.8034 127.769 12.4414C127.574 13.0794 127.528 13.5807 127.633 13.9453ZM136.695 22.5586C136.578 22.3763 136.584 22.0898 136.715 21.6992C136.832 21.3216 137.008 20.9245 137.242 20.5078C137.463 20.1042 137.698 19.7201 137.945 19.3555C138.179 19.0039 138.355 18.75 138.472 18.5938C138.577 18.4505 138.739 18.2357 138.961 17.9492C139.169 17.6628 139.41 17.3372 139.683 16.9727C139.957 16.6081 140.243 16.224 140.543 15.8203C140.855 15.4167 141.148 15.0391 141.422 14.6875C141.695 14.3229 141.942 13.9974 142.164 13.7109C142.385 13.4245 142.548 13.2096 142.652 13.0664C142.756 12.9492 142.756 12.7669 142.652 12.5195C142.548 12.2721 142.385 11.9857 142.164 11.6602C141.955 11.3216 141.715 10.957 141.441 10.5664C141.181 10.1628 140.94 9.75911 140.719 9.35547C140.51 8.9388 140.347 8.52865 140.23 8.125C140.126 7.72135 140.126 7.34375 140.23 6.99219C140.373 6.88802 140.53 6.95312 140.699 7.1875C140.868 7.40885 141.044 7.72135 141.226 8.125C141.422 8.51562 141.623 8.95182 141.832 9.43359C142.04 9.90234 142.242 10.332 142.437 10.7227C142.633 11.1003 142.821 11.3997 143.004 11.6211C143.199 11.8424 143.381 11.888 143.551 11.7578C143.889 11.5104 144.221 11.1979 144.547 10.8203C144.872 10.4297 145.185 10.026 145.484 9.60938C145.784 9.19271 146.064 8.78906 146.324 8.39844C146.597 7.99479 146.851 7.64323 147.086 7.34375C147.177 7.22656 147.261 7.14844 147.34 7.10938C147.431 7.05729 147.567 7.0638 147.75 7.12891C147.893 7.18099 147.867 7.40885 147.672 7.8125C147.476 8.21615 147.17 8.73698 146.754 9.375C146.337 10.013 145.836 10.7422 145.25 11.5625C144.677 12.3698 144.065 13.2161 143.414 14.1016C142.776 14.974 142.131 15.8464 141.48 16.7188C140.842 17.5911 140.256 18.3984 139.722 19.1406C139.176 19.8958 138.713 20.5534 138.336 21.1133C137.945 21.6862 137.691 22.1029 137.574 22.3633C137.522 22.4805 137.47 22.5977 137.418 22.7148C137.353 22.832 137.268 22.9297 137.164 23.0078C137.138 22.9948 137.105 22.9688 137.066 22.9297C137.014 22.8906 136.969 22.8451 136.929 22.793C136.877 22.7539 136.832 22.7083 136.793 22.6562C136.741 22.6172 136.708 22.5846 136.695 22.5586ZM159.351 14.6094C159.338 14.5833 159.332 14.5508 159.332 14.5117C159.332 14.4596 159.338 14.4206 159.351 14.3945C159.403 14.2904 159.488 14.1146 159.605 13.8672C159.735 13.6068 159.866 13.3398 159.996 13.0664C160.139 12.7799 160.276 12.513 160.406 12.2656C160.536 12.0182 160.627 11.8424 160.679 11.7383C160.705 11.6992 160.771 11.5885 160.875 11.4062C160.992 11.224 161.129 11.0026 161.285 10.7422C161.454 10.4688 161.63 10.1693 161.812 9.84375C162.008 9.51823 162.196 9.19922 162.379 8.88672C162.574 8.57422 162.75 8.28125 162.906 8.00781C163.075 7.73438 163.212 7.50651 163.316 7.32422C163.577 6.89453 163.876 6.38672 164.215 5.80078C164.566 5.21484 164.924 4.6224 165.289 4.02344C165.653 3.42448 166.011 2.84505 166.363 2.28516C166.728 1.72526 167.06 1.26302 167.359 0.898438C167.659 0.533854 167.913 0.292969 168.121 0.175781C168.329 0.0585938 168.472 0.136719 168.551 0.410156V1.03516C168.459 1.17839 168.336 1.36719 168.179 1.60156C168.023 1.82292 167.86 2.0638 167.691 2.32422C167.535 2.57161 167.379 2.8125 167.222 3.04688C167.066 3.28125 166.949 3.46354 166.871 3.59375C166.754 3.77604 166.565 4.06901 166.304 4.47266C166.044 4.8763 165.751 5.33203 165.426 5.83984C165.1 6.34766 164.768 6.88151 164.429 7.44141C164.091 7.98828 163.785 8.5026 163.511 8.98438C163.238 9.46615 163.017 9.88281 162.847 10.2344C162.691 10.5729 162.633 10.7878 162.672 10.8789C162.984 10.7878 163.316 10.625 163.668 10.3906C164.032 10.1432 164.397 9.88281 164.761 9.60938C165.126 9.33594 165.491 9.07552 165.855 8.82812C166.22 8.56771 166.558 8.36589 166.871 8.22266C167.183 8.26172 167.457 8.37891 167.691 8.57422C167.926 8.76953 168.095 9.01693 168.199 9.31641C168.186 9.43359 168.173 9.65495 168.16 9.98047C168.16 10.293 168.16 10.625 168.16 10.9766C168.16 11.3281 168.16 11.6602 168.16 11.9727C168.173 12.2852 168.186 12.5 168.199 12.6172C168.212 12.7604 168.277 12.9427 168.394 13.1641C168.511 13.3724 168.635 13.5872 168.765 13.8086C168.909 14.0169 169.032 14.1992 169.136 14.3555C169.254 14.5117 169.306 14.5964 169.293 14.6094C169.032 14.7005 168.785 14.707 168.551 14.6289C168.316 14.5378 168.108 14.401 167.926 14.2188C167.756 14.0234 167.613 13.8086 167.496 13.5742C167.392 13.3268 167.327 13.0859 167.301 12.8516C167.288 12.7344 167.268 12.5195 167.242 12.207C167.216 11.8815 167.19 11.543 167.164 11.1914C167.151 10.8398 167.131 10.5078 167.105 10.1953C167.092 9.88281 167.086 9.66797 167.086 9.55078L166.636 9.31641C166.558 9.27734 166.422 9.3099 166.226 9.41406C166.044 9.51823 165.829 9.66146 165.582 9.84375C165.334 10.026 165.074 10.2344 164.801 10.4688C164.527 10.7031 164.267 10.9245 164.019 11.1328C163.785 11.3411 163.583 11.5234 163.414 11.6797C163.245 11.8359 163.14 11.9336 163.101 11.9727C162.997 12.0768 162.808 12.2656 162.535 12.5391C162.261 12.7995 161.969 13.0859 161.656 13.3984C161.357 13.6979 161.07 13.9844 160.797 14.2578C160.536 14.5312 160.354 14.7266 160.25 14.8438C160.067 14.8828 159.892 14.9023 159.722 14.9023C159.566 14.8893 159.442 14.7917 159.351 14.6094ZM171.617 14.8438C171.226 14.7135 170.927 14.5182 170.719 14.2578C170.523 13.9844 170.393 13.6849 170.328 13.3594C170.263 13.0339 170.25 12.6953 170.289 12.3438C170.341 11.9792 170.419 11.6341 170.523 11.3086C170.914 10.8919 171.35 10.4167 171.832 9.88281C172.327 9.33594 172.847 8.80208 173.394 8.28125C173.941 7.76042 174.508 7.27865 175.094 6.83594C175.692 6.38021 176.298 6.03516 176.91 5.80078C177.118 5.70964 177.281 5.71615 177.398 5.82031C177.528 5.91146 177.62 6.0612 177.672 6.26953C177.724 6.47786 177.743 6.71875 177.73 6.99219C177.73 7.26562 177.711 7.53255 177.672 7.79297C177.633 8.05339 177.58 8.28776 177.515 8.49609C177.45 8.70443 177.385 8.84766 177.32 8.92578C177.164 9.10807 176.858 9.32292 176.402 9.57031C175.959 9.81771 175.465 10.0911 174.918 10.3906C174.371 10.6771 173.824 10.9766 173.277 11.2891C172.73 11.6016 172.281 11.9141 171.929 12.2266C171.578 12.526 171.37 12.8255 171.304 13.125C171.239 13.4245 171.422 13.6979 171.851 13.9453C172.294 13.9974 172.828 13.9779 173.453 13.8867C174.091 13.7826 174.735 13.6523 175.386 13.4961C176.051 13.3268 176.689 13.1576 177.301 12.9883C177.913 12.806 178.414 12.6628 178.804 12.5586L179.039 12.7734C178.752 13.151 178.284 13.4961 177.633 13.8086C176.982 14.1211 176.278 14.3815 175.523 14.5898C174.768 14.7852 174.032 14.9154 173.316 14.9805C172.6 15.0326 172.034 14.987 171.617 14.8438ZM176.285 7.38281C176.272 7.36979 176.174 7.42839 175.992 7.55859C175.81 7.67578 175.582 7.83854 175.308 8.04688C175.048 8.24219 174.761 8.46354 174.449 8.71094C174.149 8.94531 173.87 9.16667 173.609 9.375C173.362 9.58333 173.153 9.76562 172.984 9.92188C172.815 10.0651 172.743 10.1367 172.769 10.1367C172.978 10.1758 173.245 10.1497 173.57 10.0586C173.909 9.95443 174.254 9.8112 174.605 9.62891C174.97 9.44661 175.315 9.24479 175.64 9.02344C175.966 8.78906 176.22 8.5612 176.402 8.33984C176.597 8.11849 176.695 7.92318 176.695 7.75391C176.708 7.58464 176.571 7.46094 176.285 7.38281ZM179.566 14.8438C179.189 14.5703 178.941 14.2253 178.824 13.8086C178.72 13.3919 178.707 12.9427 178.785 12.4609C178.863 11.9661 179 11.4583 179.195 10.9375C179.403 10.4167 179.625 9.91536 179.859 9.43359C180.107 8.95182 180.341 8.50911 180.562 8.10547C180.797 7.70182 180.979 7.36979 181.109 7.10938C181.148 7.03125 181.239 6.84245 181.383 6.54297C181.539 6.24349 181.702 5.91797 181.871 5.56641C182.04 5.21484 182.196 4.88932 182.34 4.58984C182.496 4.27734 182.594 4.08203 182.633 4.00391C182.672 3.9388 182.724 3.8151 182.789 3.63281C182.867 3.4375 182.952 3.22917 183.043 3.00781C183.134 2.78646 183.232 2.57812 183.336 2.38281C183.453 2.17448 183.57 2.02474 183.687 1.93359C183.817 1.84245 183.941 1.82943 184.058 1.89453C184.189 1.95964 184.312 2.15495 184.429 2.48047C184.377 2.61068 184.247 2.87109 184.039 3.26172C183.844 3.65234 183.609 4.12109 183.336 4.66797C183.062 5.21484 182.756 5.82031 182.418 6.48438C182.092 7.14844 181.773 7.81901 181.461 8.49609C181.148 9.17318 180.855 9.83724 180.582 10.4883C180.308 11.1263 180.08 11.7122 179.898 12.2461C179.729 12.7669 179.625 13.2031 179.586 13.5547C179.56 13.8932 179.625 14.1016 179.781 14.1797C179.963 14.2708 180.198 14.3099 180.484 14.2969C180.784 14.2708 181.09 14.2318 181.402 14.1797C181.715 14.1276 182.021 14.0755 182.32 14.0234C182.62 13.9583 182.88 13.9323 183.101 13.9453C183.153 14.0625 183.114 14.1797 182.984 14.2969C182.854 14.401 182.672 14.4987 182.437 14.5898C182.203 14.668 181.929 14.7396 181.617 14.8047C181.317 14.8568 181.024 14.8958 180.738 14.9219C180.465 14.9479 180.217 14.9544 179.996 14.9414C179.788 14.9284 179.644 14.8958 179.566 14.8438ZM185.972 14.8438C185.595 14.5703 185.347 14.2253 185.23 13.8086C185.126 13.3919 185.113 12.9427 185.191 12.4609C185.269 11.9661 185.406 11.4583 185.601 10.9375C185.81 10.4167 186.031 9.91536 186.265 9.43359C186.513 8.95182 186.747 8.50911 186.969 8.10547C187.203 7.70182 187.385 7.36979 187.515 7.10938C187.554 7.03125 187.646 6.84245 187.789 6.54297C187.945 6.24349 188.108 5.91797 188.277 5.56641C188.446 5.21484 188.603 4.88932 188.746 4.58984C188.902 4.27734 189 4.08203 189.039 4.00391C189.078 3.9388 189.13 3.8151 189.195 3.63281C189.273 3.4375 189.358 3.22917 189.449 3.00781C189.54 2.78646 189.638 2.57812 189.742 2.38281C189.859 2.17448 189.976 2.02474 190.094 1.93359C190.224 1.84245 190.347 1.82943 190.465 1.89453C190.595 1.95964 190.719 2.15495 190.836 2.48047C190.784 2.61068 190.653 2.87109 190.445 3.26172C190.25 3.65234 190.015 4.12109 189.742 4.66797C189.469 5.21484 189.163 5.82031 188.824 6.48438C188.498 7.14844 188.179 7.81901 187.867 8.49609C187.554 9.17318 187.261 9.83724 186.988 10.4883C186.715 11.1263 186.487 11.7122 186.304 12.2461C186.135 12.7669 186.031 13.2031 185.992 13.5547C185.966 13.8932 186.031 14.1016 186.187 14.1797C186.37 14.2708 186.604 14.3099 186.89 14.2969C187.19 14.2708 187.496 14.2318 187.808 14.1797C188.121 14.1276 188.427 14.0755 188.726 14.0234C189.026 13.9583 189.286 13.9323 189.508 13.9453C189.56 14.0625 189.521 14.1797 189.39 14.2969C189.26 14.401 189.078 14.4987 188.844 14.5898C188.609 14.668 188.336 14.7396 188.023 14.8047C187.724 14.8568 187.431 14.8958 187.144 14.9219C186.871 14.9479 186.623 14.9544 186.402 14.9414C186.194 14.9284 186.051 14.8958 185.972 14.8438ZM192.808 14.8438C192.261 14.6224 191.916 14.2904 191.773 13.8477C191.643 13.4049 191.649 12.9167 191.793 12.3828C191.936 11.8359 192.183 11.276 192.535 10.7031C192.886 10.1172 193.277 9.58333 193.707 9.10156C194.136 8.61979 194.566 8.21615 194.996 7.89062C195.439 7.55208 195.816 7.36328 196.129 7.32422C196.936 7.22005 197.567 7.27865 198.023 7.5C198.492 7.70833 198.811 8.01432 198.98 8.41797C199.149 8.82161 199.195 9.29688 199.117 9.84375C199.039 10.3776 198.863 10.918 198.59 11.4648C198.329 12.0117 197.984 12.5391 197.554 13.0469C197.138 13.5547 196.669 13.9844 196.148 14.3359C195.64 14.6745 195.1 14.9023 194.527 15.0195C193.954 15.1237 193.381 15.0651 192.808 14.8438ZM192.594 13.7305C192.698 14.1471 192.919 14.3815 193.258 14.4336C193.596 14.4727 193.987 14.388 194.429 14.1797C194.885 13.9583 195.36 13.6458 195.855 13.2422C196.35 12.8255 196.799 12.3763 197.203 11.8945C197.62 11.4128 197.958 10.931 198.219 10.4492C198.492 9.95443 198.622 9.52474 198.609 9.16016C198.609 8.79557 198.433 8.52214 198.082 8.33984C197.743 8.14453 197.17 8.10547 196.363 8.22266C196.181 8.39193 195.946 8.60026 195.66 8.84766C195.373 9.08203 195.074 9.34245 194.761 9.62891C194.462 9.91536 194.163 10.2279 193.863 10.5664C193.564 10.8919 193.303 11.2305 193.082 11.582C192.86 11.9336 192.698 12.2917 192.594 12.6562C192.502 13.0208 192.502 13.3789 192.594 13.7305Z"
            fill="#FF0D49"
          />
          <path
            d="M25.031 25.0586C27.031 34.5586 14.031 46.0586 2.03101 46.0586"
            stroke="#FF0D49"
            strokeWidth="0.5"
          />
          <path
            d="M3.53101 47.5586C3.03101 47.0586 1.63101 46.0586 0.0310058 46.0586C1.36434 45.8919 3.93101 45.2586 3.53101 44.0586"
            stroke="#FF0D49"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
