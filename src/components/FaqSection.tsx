"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  [category: string]: FaqItem[];
}

const FAQ_DATA: FaqData = {
  general: [
    {
      question: "What is Aioncy and how does it help Nepali SMEs?",
      answer:
        "Aioncy is an AI-powered digital worker (virtual employee) built for Nepali businesses. It's more than a simple chatbot – Aioncy understands your products and FAQs, then works 24/7 on WhatsApp, Instagram, Website and other social media channels to answer customer queries instantly and capture leads automatically. In practice, this means no more missed messages even outside office hours. Aioncy's AI can handle common questions (pricing, availability, policies) and qualify sales leads while you sleep.",
    },
    {
      question: "Who is Aioncy for?",
      answer:
        "Aioncy is designed for retail shops, travel agencies, service companies, and e-commerce stores in Nepal that receive high message volumes and struggle to respond to customer inquiries immediately. If you want to automate 24/7 client interactions and lead qualification, Aioncy is built for you.",
    },
  ],
  pricing: [
    {
      question: "Are there any setup fees?",
      answer:
        "No, there are absolutely no setup fees. You can get started on our Freemium Plan for free, or subscribe to our paid plans month-to-month with no long-term contracts. You can upgrade, downgrade, or cancel at any time.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "We offer a 7-day money-back guarantee on all our paid plans. If you're not satisfied with the AI's performance, contact our support team and we will issue a full refund, no questions asked.",
    },
  ],
  dashboard: [
    {
      question: "What do I get in the dashboard?",
      answer:
        "The Aioncy dashboard gives you a unified inbox to view chats across WhatsApp, Instagram, and web. It also includes lead capture boards, visual metrics on conversations, and customization controls for your AI's voice and knowledge base.",
    },
    {
      question: "Can I view chat logs in real-time?",
      answer:
        "Yes! Every conversation handled by your AI employee is logged in real-time. You can monitor the chat stream and jump in to take over the conversation manually whenever you wish.",
    },
  ],
  integrations: [
    {
      question: "Which channels do you support?",
      answer:
        "We support direct integrations with WhatsApp Business, Instagram DMs, Facebook Messenger, Slack, Shopify stores, and custom website chat widgets.",
    },
    {
      question: "How hard is it to integrate WhatsApp?",
      answer:
        "It takes less than 5 minutes. You can connect your official WhatsApp Business API directly through our dashboard using our guided setup wizard. No developers required.",
    },
  ],
  credits: [
    {
      question: "How do AI Credits work?",
      answer:
        "Each credit corresponds to one message sent by your AI employee to a customer. Incoming messages are free. Credits reset at the start of every billing cycle.",
    },
    {
      question: "Can I top up credits?",
      answer:
        "Yes! If you run out of credits before the month ends, you can purchase top-up bundles directly from your dashboard billing settings starting at NRS 500.",
    },
  ],
};

const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "pricing", label: "Pricing" },
  { id: "dashboard", label: "Dashboard" },
  { id: "integrations", label: "Integrations" },
  { id: "credits", label: "Credits" },
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const selectCategory = (catId: string) => {
    setActiveCategory(catId);
    setOpenIndex(0); // Open first item of the new category
  };

  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const activeIdx = CATEGORIES.findIndex((cat) => cat.id === activeCategory);
    const activeTab = tabsRef.current[activeIdx];
    if (activeTab) {
      setTabStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeCategory]);

  return (
    <section
      id="faq"
      className="w-full bg-[#F6F6F6] text-neutral-black py-16 lg:py-28 px-6 flex flex-col items-center justify-center border-t border-border-light/20 relative overflow-hidden"
    >
      {/* Header (628px max width) */}
      <div className="max-w-[628px] w-full text-center flex flex-col items-center gap-6 mb-12">
        <h2 className="css-heading--h1 text-neutral-black">
          Got questions?
          <br />
          We've got <span className="text-aioncy">answers</span>.
        </h2>

        {/* Tab Pills Bar Wrapper for Mobile Scrolling */}
        <div className="w-full max-w-full overflow-x-auto pb-2 flex justify-center">
          <div className="relative inline-flex items-center h-10 bg-white border border-[#00000033] rounded-full overflow-hidden select-none whitespace-nowrap min-w-max">
            {/* Sliding Pill Background */}
            <div
              className="absolute top-0 bottom-0 bg-utility-yellow transition-all duration-300 ease-out z-0"
              style={{
                left: `${tabStyle.left}px`,
                width: `${tabStyle.width}px`,
              }}
            />

            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.id;

              return (
                <React.Fragment key={cat.id}>
                  {/* Short vertical divider between tabs */}
                  {idx > 0 && (
                    <div className="w-[1px] h-full bg-[#00000033] flex-shrink-0 z-10" />
                  )}
                  <button
                    ref={(el) => {
                      tabsRef.current[idx] = el;
                    }}
                    onClick={() => selectCategory(cat.id)}
                    className={`relative z-10 h-full flex items-center px-5 font-bold text-[13.5px] cursor-pointer border-none outline-none whitespace-nowrap transition-colors duration-150 ${
                      isActive
                        ? "text-neutral-black"
                        : "text-neutral-black hover:text-neutral-darkgrey"
                    } bg-transparent`}
                  >
                    {cat.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accordion List Container */}
      <div className="w-full max-w-3xl flex flex-col border-t border-neutral-darkgrey/10">
        {FAQ_DATA[activeCategory].map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className="border-b border-neutral-darkgrey/10 py-5 transition-all duration-300"
            >
              {/* Accordion Title Question */}
              <button
                onClick={() => handleToggle(i)}
                className="w-full flex items-center justify-between text-left css-body--lg-500 text-neutral-black hover:text-aioncy transition-colors cursor-pointer border-none outline-none"
              >
                <span>{faq.question}</span>
                <span className="flex-shrink-0 ml-4 w-6 h-6 rounded-full border border-neutral-darkgrey/20 hover:border-aioncy flex items-center justify-center transition-all">
                  {isOpen ? (
                    // Minus Icon
                    <svg
                      width="10"
                      height="2"
                      viewBox="0 0 10 2"
                      fill="none"
                      className="text-current"
                    >
                      <path
                        d="M0 1H10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    // Plus Icon
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="text-current"
                    >
                      <path
                        d="M5 0V10M0 5H10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
              </button>

              {/* Accordion Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out max-w-[550px] ${
                  isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="css-body--re-400 text-neutral-lightgrey whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
