"use client";

import React, { useState, useEffect, useRef } from "react";

/* ── Scattered feature cards data ───────────────────────────────────────── */
const FEATURE_CARDS = [
  {
    title: "Unified Inbox",
    pills: ["DMs", "Email", "Chat"],
    position: { top: "2%", left: "30%" },
    rotate: -4,
  },
  {
    title: "Capture Automation",
    pills: ["Leads", "Forms"],
    position: { top: "18%", left: "-2%" },
    rotate: -28,
  },
  {
    title: "AI Conversations in Action",
    pills: ["Real-time", "Context"],
    position: { top: "42%", left: "-4%" },
    rotate: -18,
  },
  {
    title: "Continuous AI Improvement",
    pills: ["Learning", "Tuning"],
    position: { top: "4%", right: "28%" },
    rotate: 3,
  },
  {
    title: "Personalized AI Agents",
    pills: ["Custom", "Brand"],
    position: { top: "20%", right: "-3%" },
    rotate: 24,
  },
  {
    title: "Smart Lead Routing",
    pills: ["Auto", "Priority"],
    position: { top: "44%", right: "-2%" },
    rotate: 16,
  },
  {
    title: "Analytics Dashboard",
    pills: ["Metrics", "Reports"],
    position: { bottom: "10%", left: "2%" },
    rotate: -12,
  },
  {
    title: "Workflow Engine",
    pills: ["Triggers", "Actions"],
    position: { bottom: "6%", right: "4%" },
    rotate: 10,
  },
];

interface Message {
  role: "assistant" | "user";
  text: string;
}

export default function WingmanSection() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I'm Wingman — Aioncy's AI Agent. Ask me anything about Aioncy, our dashboard, features, or how the AI works.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Thanks for your message! I'd love to tell you more. Book a demo to see Aioncy in action and get a personalized walkthrough.",
        },
      ]);
    }, 1800);
  };

  return (
    <section className="wm-section">
      {/* Crosshatch background */}
      <div className="wm-bg" />

      {/* Scattered tilted feature cards */}
      {FEATURE_CARDS.map((card, i) => (
        <div
          key={card.title}
          className="wm-feature-card"
          style={{
            ...card.position,
            ["--card-rotate" as any]: `${card.rotate}deg`,
            animationDelay: `${i * 0.12}s`,
          }}
        >
          <div className="wm-feature-card__inner">
            <div className="wm-feature-card__header">
              <span className="wm-feature-card__dot wm-feature-card__dot--green" />
              <span className="wm-feature-card__dot" />
              <span className="wm-feature-card__dot" />
            </div>
            <h4 className="wm-feature-card__title">{card.title}</h4>
            <div className="wm-feature-card__pills">
              {card.pills.map((pill) => (
                <span key={pill} className="wm-feature-card__pill">
                  {pill}
                </span>
              ))}
            </div>
            <div className="wm-feature-card__shimmer" />
          </div>
        </div>
      ))}

      {/* Center chat widget */}
      <div className="wm-chat">
        {/* Header */}
        <div className="wm-chat__header">
          <div className="wm-chat__header-info">
            <h3 className="wm-chat__title">Wingman</h3>
            <p className="wm-chat__subtitle">Ask anything about aioncy</p>
          </div>
          <button
            className="wm-chat__demo-btn"
            onClick={() =>
              alert(
                "Booking a premium demo console with Aioncy Founder Agent...",
              )
            }
          >
            Book a demo
          </button>
        </div>

        {/* Messages */}
        <div className="wm-chat__messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`wm-chat__bubble wm-chat__bubble--${msg.role}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {msg.role === "assistant" && (
                <div className="wm-chat__avatar">
                  <span className="wm-chat__avatar-emoji">🤖</span>
                </div>
              )}
              <div className="wm-chat__bubble-text">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="wm-chat__bubble wm-chat__bubble--assistant">
              <div className="wm-chat__avatar">
                <span className="wm-chat__avatar-emoji">🤖</span>
              </div>
              <div className="wm-chat__bubble-text wm-chat__typing">
                <span className="wm-chat__typing-dot" />
                <span className="wm-chat__typing-dot" />
                <span className="wm-chat__typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="wm-chat__input-area">
          <div className="wm-chat__input-wrapper">
            <input
              type="text"
              className="wm-chat__input"
              placeholder="Message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="wm-chat__send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Handwritten CTA */}
      <div className="wm-handwritten">
        <svg
          className="wm-handwritten__arrow"
          width="60"
          height="50"
          viewBox="0 0 60 50"
          fill="none"
        >
          <path
            d="M55 5C45 5 20 8 15 25C12 35 20 45 30 42"
            stroke="#FF6B9D"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M25 38L30 42L26 47"
            stroke="#FF6B9D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="wm-handwritten__text">Go ahead, say hello</span>
      </div>
    </section>
  );
}
