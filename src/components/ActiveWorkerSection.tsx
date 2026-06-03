"use client";

import React, { useState, useEffect, useRef } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  avatar?: string;
}

interface SlideData {
  title: string;
  description: string;
  statusText: string;
  statusColor: string; // Tailwind color class
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
    statusColor: "bg-[#FFFF62]", // Utility yellow
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
    statusColor: "bg-[#FF6B9D]", // Pink status indicator
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

export default function ActiveWorkerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start progress interval
    const intervalTime = 50; // ms
    const duration = 5000; // 5 seconds per slide
    const increment = (intervalTime / duration) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide
          setActiveIndex((prevIdx) => (prevIdx + 1) % SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const selectSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const activeSlide = SLIDES[activeIndex];

  return (
    <section className="w-full bg-utility-bluishpurple text-white py-24 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aioncy/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative z-10">
        
        {/* Left Column: Carousel Details */}
        <div className="flex-1 flex flex-col items-start gap-6 text-left max-w-md">
          {/* Progress Indicators (exactly 142px total width, 3px indicator height) */}
          <div className="flex gap-1.5 w-[142px] h-[3px] mb-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className="h-full flex-1 rounded-full bg-white/25 overflow-hidden relative cursor-pointer border-none outline-none"
              >
                <div
                  className="h-full bg-white transition-all duration-[50ms] ease-linear"
                  style={{
                    width:
                      activeIndex === idx
                        ? `${progress}%`
                        : activeIndex > idx
                        ? "100%"
                        : "0%",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Heading and Paragraph (Title font-size, subtitle max-w-[440px]) */}
          <div className="flex flex-col gap-4 min-h-[160px]">
            <h2 className="text-[44px] font-extrabold leading-[1.12] tracking-tight text-white transition-all duration-300">
              {activeSlide.title}
            </h2>
            <p className="max-w-[440px] text-[16px] text-white/80 leading-[1.5] transition-all duration-300">
              {activeSlide.description}
            </p>
          </div>

          {/* Action Buttons (Exactly 243px combined width, 48px height) */}
          <div className="flex items-center gap-[13px] w-[243px] h-12 mt-4">
            <button className="flex-1 h-full bg-utility-yellow text-neutral-black hover:bg-[#F2F250] active:scale-[0.97] rounded-xl font-extrabold text-[14px] flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer border-none outline-none">
              Test the AI
            </button>
            <button className="flex-1 h-full bg-white text-neutral-black hover:bg-neutral-offwhite active:scale-[0.97] rounded-xl font-extrabold text-[14px] flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer border-none outline-none">
              Join Early
            </button>
          </div>
        </div>

        {/* Right Column: Mobile Screen Mockup */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center">
          {/* Phone Frame (Proportional w-290, h-510) */}
          <div className="w-[290px] h-[510px] rounded-[36px] border-[8px] border-[#0A0A0C] bg-[#0A0A0C] shadow-[0_24px_50px_rgba(0,0,0,0.3)] overflow-hidden relative flex flex-col">
            
            {/* Speaker/Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0A0A0C] rounded-b-xl z-30 flex items-center justify-center">
              <span className="w-6 h-0.5 bg-neutral-darkgrey rounded-full" />
            </div>

            {/* Screen Content */}
            <div className="flex-1 relative flex flex-col pt-7 pb-4 px-3.5 bg-[#0E0E11] justify-end overflow-hidden">
              
              {/* Dark Subtle Dot/Grid Background */}
              <div 
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: "16px 16px"
                }}
              />

              {/* Chat Thread */}
              <div className="flex flex-col gap-3 relative z-10">
                {activeSlide.messages.map((msg, i) => (
                  <div
                    key={`${activeIndex}-${i}`}
                    className={`flex flex-col gap-0.5 max-w-[85%] rounded-[12px] p-3 text-[11.5px] leading-[1.4] transition-all duration-500 ease-out animate-fade-in-up`}
                    style={{
                      animationDelay: `${i * 120}ms`,
                      alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                      background: msg.role === "user" ? "#0D4E41" : "#1E1E22",
                      color: "white",
                      borderBottomRightRadius: msg.role === "user" ? "2px" : "12px",
                      borderBottomLeftRadius: msg.role === "assistant" ? "2px" : "12px",
                    }}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Badge Pill (exact same width as phone frame) */}
          <div
            className={`w-[290px] h-12 flex items-center justify-center ${activeSlide.statusColor} text-neutral-black text-center font-extrabold text-[13px] px-4 rounded-xl shadow-md tracking-wider mt-4 uppercase transition-all duration-300 ease-out`}
          >
            {activeSlide.statusText}
          </div>
        </div>

      </div>
    </section>
  );
}
