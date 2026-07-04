"use client";

import React, { useState } from "react";
import { FAQ_DATA } from "@/data/faqData";

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

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);


  return (
    <section
      id="faq"
      className="w-full bg-[#F6F6F6] text-neutral-black py-16 lg:py-[200px] px-6 flex flex-col items-center justify-center border-t border-border-light/20 relative overflow-hidden"
    >
      {/* Header (628px max width) */}
      <div className="max-w-[628px] w-full text-center flex flex-col items-center gap-6 mb-12">
        <h2 className="css-heading--h1 text-neutral-black">
          Got questions?
          <br />
          We've got <span className="text-aioncy">answers</span>.
        </h2>

        {/* Tab Pills Bar Wrapper for Mobile Scrolling */}
        <div className="relative w-[calc(100%+3rem)] -mx-6 sm:w-full sm:mx-0 flex mb-2 sm:mb-0">
          {/* Left Gradient Shadow */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#F6F6F6] to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="w-full overflow-x-auto flex justify-start sm:justify-center px-6 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1"
          >
            <div className="relative inline-flex items-center h-10 bg-white border border-[#00000033] rounded-full overflow-hidden select-none whitespace-nowrap shrink-0">
              {CATEGORIES.map((cat, idx) => {
                const isActive = activeCategory === cat.id;

                return (
                  <React.Fragment key={cat.id}>
                    {/* Short vertical divider between tabs */}
                    {idx > 0 && (
                      <div className="w-[1px] h-full bg-[#00000033] flex-shrink-0 z-10" />
                    )}
                    <button
                      onClick={() => selectCategory(cat.id)}
                      className={`relative z-10 h-full flex items-center px-5 css-misc--button cursor-pointer border-none outline-none whitespace-nowrap transition-colors duration-150 ${
                        isActive
                          ? "bg-utility-yellow text-neutral-black"
                          : "text-neutral-black hover:text-neutral-darkgrey"
                      }`}
                    >
                      {cat.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Gradient Shadow */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#F6F6F6] to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />
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
                <span className="flex-shrink-0 ml-4 w-8 h-8 rounded-full hover:border-aioncy flex items-center justify-center transition-all">
                  {isOpen ? (
                    // Minus Icon
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_4278_359"  maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
<rect width="32" height="32" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_4278_359)">
<path d="M8 16.6668V15.3335H24V16.6668H8Z" fill="#1C1B1F"/>
</g>
</svg>

                  ) : (
                    // Plus Icon
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_4278_365"  maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
<rect width="32" height="32" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_4278_365)">
<path d="M15.3333 16.6667H8V15.3333H15.3333V8H16.6667V15.3333H24V16.6667H16.6667V24H15.3333V16.6667Z" fill="#211E1C"/>
</g>
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
