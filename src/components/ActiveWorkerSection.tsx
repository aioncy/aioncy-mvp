"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  avatar?: string;
}

interface SlideData {
  title: string;
  description: string;
  statusText: string;
  statusColor: string;
  messages: ChatMessage[];
}

const SLIDES: SlideData[] = [
  {
    title: "24/7 Active Digital Worker",
    description:
      "Your AI stays active even when your team is offline, replying instantly to customer questions and capturing leads.",
    statusText: "Always On. Always Replying.",
    statusColor: "bg-utility-green",
    messages: [
      {
        role: "user",
        text: "Hello, could you tell me about the services you provide?",
      },
      {
        role: "assistant",
        text: "Hi there! 👋 We provide AI-powered customer support and lead generation tools for businesses. Think of Aioncy as a digital team member that can answer questions, capture leads, schedule bookings, and support customers around the clock. What type of business do you run? I can show you a few examples.",
      },
    ],
  },
  {
    title: "Capture Leads Automatically",
    description:
      "Qualify website visitors in real-time, capture contact details, and sync high-intent prospects directly to your CRM.",
    statusText: "Lead Captured & Synced.",
    statusColor: "bg-[#FFFF62]",
    messages: [
      {
        role: "user",
        text: "I want to schedule a call to see how this fits my agency.",
      },
      {
        role: "assistant",
        text: "I'd love to help you with that! 📅 Could you please share your business email and website URL so I can prepare a custom demo?",
      },
      {
        role: "user",
        text: "Sure, it is sarah@agency.co and agency.co",
      },
      {
        role: "assistant",
        text: "Perfect! Lead captured. I have sent a calendar scheduling link to your email. Talk to you soon, Sarah!",
      },
    ],
  },
  {
    title: "Zero Delay Support Desk",
    description:
      "Instantly resolve complex product inquiries and FAQs by reading directly from your documentation database.",
    statusText: "Resolved in 0.4 seconds.",
    statusColor: "bg-utility-green",
    messages: [
      {
        role: "user",
        text: "Does Aioncy integrate with Slack and Shopify?",
      },
      {
        role: "assistant",
        text: "Yes, absolutely! 🔌 We support one-click integrations with Slack, Shopify, HubSpot, and WhatsApp. You can sync customer records and trigger workflows in real-time.",
      },
    ],
  },
  {
    title: "Autopilot Meeting Scheduler",
    description:
      "Eliminate manual scheduling back-and-forth. The AI books qualified meetings directly into your calendar.",
    statusText: "Meeting Confirmed.",
    statusColor: "bg-utility-green",
    messages: [
      {
        role: "user",
        text: "Can I book a demo for this Thursday afternoon?",
      },
      {
        role: "assistant",
        text: "Checking availability... 🗓️ I have Thursday at 2:00 PM or 4:30 PM EST available. Which one works best for you?",
      },
      {
        role: "user",
        text: "Let's do 4:30 PM.",
      },
      {
        role: "assistant",
        text: "Done! Calendar invite sent for Thursday, June 4th at 4:30 PM EST.",
      },
    ],
  },
  {
    title: "Tailored Brand Personality",
    description:
      "Fine-tune the AI's guidelines, tone, and vocabulary to fit your brand identity and voice guidelines perfectly.",
    statusText: "Voice Personality Updated.",
    statusColor: "bg-[#FF6B9D]",
    messages: [
      {
        role: "user",
        text: "Can you speak more casually and use emojis?",
      },
      {
        role: "assistant",
        text: "Yo! You got it! 😎 I can totally chill out and speak your brand's language. Just adjust the Tone slider in the dashboard!",
      },
    ],
  },
];

const SLIDE_COUNT = SLIDES.length;
// 100vh pinned panel + (n-1) viewport-heights of scroll to advance slides
const RUNWAY_VH = 100 + (SLIDE_COUNT - 1) * 50;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function SlidePhone({ slide }: { slide: SlideData }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center">
      <div className="w-[350px] h-[592px] rounded-[18px] border-[8px] border-[#0A0A0C] bg-[#0A0A0C] shadow-[0_24px_50px_rgba(0,0,0,0.3)] overflow-hidden relative flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0A0A0C] rounded-b-xl z-30 flex items-center justify-center">
          <span className="w-6 h-0.5 bg-neutral-darkgrey rounded-full" />
        </div>

        <div className="flex-1 relative flex flex-col pt-7 pb-4 px-3.5 bg-[#0E0E11] justify-end overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "16px 16px",
            }}
          />

          <div className="flex flex-col gap-3 relative z-10">
            {slide.messages.map((msg, i) => (
              <div
                key={i}
                className="flex flex-col gap-0.5 max-w-[85%] rounded-[12px] p-3 text-[11.5px] leading-[1.4]"
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? "#0D4E41" : "#1E1E22",
                  color: "white",
                  borderBottomRightRadius: msg.role === "user" ? "2px" : "12px",
                  borderBottomLeftRadius:
                    msg.role === "assistant" ? "2px" : "12px",
                }}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`w-full h-[56px] flex items-center  ${slide.statusColor} text-neutral-black text-center css-body--lg-500 px-4 rounded-b-xl mt-4`}
      >
        {slide.statusText}
      </div>
    </div>
  );
}

export default function ActiveWorkerSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);
  const lastWheelTime = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const getScrollMetrics = useCallback(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return null;

    const panelHeight = sticky.offsetHeight;
    const scrollableDistance = wrapper.offsetHeight - panelHeight;
    if (scrollableDistance <= 0) return null;

    const rect = wrapper.getBoundingClientRect();
    const scrolled = clamp(-rect.top, 0, scrollableDistance);
    const segment = scrollableDistance / (SLIDE_COUNT - 1);
    const index = clamp(Math.round(scrolled / segment), 0, SLIDE_COUNT - 1);

    return { scrolled, segment, index, wrapperTop: wrapper.offsetTop };
  }, []);

  const snapToSlide = useCallback(
    (index: number, smooth = true) => {
      const wrapper = wrapperRef.current;
      const metrics = getScrollMetrics();
      if (!wrapper || !metrics || isSnappingRef.current) return;

      const rect = wrapper.getBoundingClientRect();
      const isPinned =
        rect.top <= 0 && rect.bottom > (stickyRef.current?.offsetHeight ?? 0);
      if (!isPinned) return;

      const target = metrics.wrapperTop + index * metrics.segment;
      if (Math.abs(window.scrollY - target) < 2) return;

      isSnappingRef.current = true;
      window.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });

      window.setTimeout(
        () => {
          isSnappingRef.current = false;
        },
        smooth ? 400 : 0,
      );
    },
    [getScrollMetrics],
  );

  const updateFromScroll = useCallback(() => {
    const metrics = getScrollMetrics();
    if (!metrics) {
      if (!isSnappingRef.current) setActiveIndex(0);
      return;
    }

    if (!isSnappingRef.current) {
      setActiveIndex(metrics.index);
    }

    if (isSnappingRef.current) return;

    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      snapToSlide(metrics.index);
    }, 80);
  }, [getScrollMetrics, snapToSlide]);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateFromScroll]);

  const scrollToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    snapToSlide(index);
  }, [snapToSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // Allow pinch-to-zoom

      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const rect = wrapper.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const maxScroll = wrapper.offsetHeight - stickyHeight;
      const scrolledIntoWrapper = -rect.top;

      const isPinned = rect.top <= 1 && rect.bottom >= stickyHeight - 1;
      if (!isPinned) return;

      if (scrolledIntoWrapper <= 2 && e.deltaY < 0) return;
      if (scrolledIntoWrapper >= maxScroll - 2 && e.deltaY > 0) return;

      e.preventDefault();

      if (isSnappingRef.current) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 600) return;

      if (Math.abs(e.deltaY) < 15) return;

      lastWheelTime.current = now;

      if (e.deltaY > 0) {
        if (activeIndex < SLIDE_COUNT - 1) scrollToSlide(activeIndex + 1);
      } else {
        if (activeIndex > 0) scrollToSlide(activeIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, scrollToSlide]);

  const translatePercent = (activeIndex / SLIDE_COUNT) * 100;
  const slideTransition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <>
      {/* MOBILE LAYOUT (Sequential Stack) */}
      <div className="w-full bg-utility-bluishpurple text-white px-6 py-20 flex lg:hidden flex-col items-center gap-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-aioncy/10 blur-[80px] rounded-full pointer-events-none" />

        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-10 text-center w-full relative z-10"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-extrabold leading-[1.12] tracking-tight text-white">
                {slide.title}
              </h2>
              <p className="text-[16px] text-white/80 leading-[1.5] max-w-sm mx-auto">
                {slide.description}
              </p>
            </div>

            <SlidePhone slide={slide} />

            {idx === 0 && (
              <div className="w-full flex items-center gap-4 mt-2 max-w-[290px]">
                <Button className="flex-1">Test the AI</Button>
                <Button
                  variant="secondary"
                  className="flex-1 text-neutral-black"
                >
                  Join Early
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP LAYOUT (Sticky Slider) */}
      <div
        ref={wrapperRef}
        style={{ height: `${RUNWAY_VH}vh` }}
        className="hidden lg:block w-full relative shrink-0"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 z-30 w-full h-[100vh] min-h-[100vh] max-h-[100vh] overflow-visible"
        >
          <section className="w-full h-[100vh] bg-utility-bluishpurple text-white relative overflow-visible flex items-center justify-center">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aioncy/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full css-container h-full relative z-10 grid grid-cols-1 lg:grid-cols-2 flex-col lg:flex-row items-center">
              <div className="flex-1 flex flex-col items-start gap-6 text-left self-center justify-center">
                <div className="w-full">
                  <div className="flex gap-1.5 w-[142px] h-[3px] mb-12 shrink-0 mx-auto ">
                    {SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSlide(idx)}
                        className="h-full flex-1 rounded-full bg-white/25 overflow-hidden relative cursor-pointer border-none outline-none"
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <div
                          className="h-full bg-white transition-all duration-300"
                          style={{
                            width: idx <= activeIndex ? "100%" : "0%",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="w-full h-[220px] overflow-hidden mx-auto">
                    <div
                      className="will-change-transform"
                      style={{
                        transform: `translate3d(0, -${translatePercent}%, 0)`,
                        transition: slideTransition,
                      }}
                    >
                      {SLIDES.map((slide) => (
                        <div
                          key={slide.title}
                          className="h-[250px] flex flex-col gap-4 text-center"
                        >
                          <h2 className="css-heading--h2 tracking-tight text-white">
                            {slide.title}
                          </h2>
                          <p className="max-w-[440px] mx-auto css-body--lg-500">
                            {slide.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-[13px] w-[243px] h-12 mt-4 shrink-0 mx-auto">
                    <Button className="flex-1 h-full">Test the AI</Button>
                    <Button variant="secondary" className="flex-1 h-full">
                      Join Early
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 h-[100vh] overflow-visible self-center">
                <div
                  className="will-change-transform"
                  style={{
                    transform: `translate3d(0, -${translatePercent}%, 0)`,
                    transition: slideTransition,
                  }}
                >
                  {SLIDES.map((slide) => (
                    <div
                      key={slide.title}
                      className="h-[100vh] flex items-center justify-center"
                    >
                      <SlidePhone slide={slide} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
