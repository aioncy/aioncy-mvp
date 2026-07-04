"use client";

import React from "react";
import Badge from "@/components/Badge";
import WingmanChat from "@/components/WingmanChat";
import HeroCardArc from "@/components/HeroCardArc";
import ActiveWorkerSection from "@/components/ActiveWorkerSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] text-neutral-black font-sans selection:bg-aioncy selection:text-white relative flex flex-col justify-between">
      {/* Hero Header Section */}
      <main className="pt-20 pb-8 px-4 lg:px-6 text-center max-w-7xl mx-auto w-full">
        <Badge text="Launching Soon" variant="yellow" className="mb-3.5" />

        <h1 className="css-heading--h1 text-neutral-black mb-5">
          Your <span className="text-[#A153FF]">AI Employee</span> for
          <br className="hidden lg:block" /> Conversations, Leads & Support
        </h1>

        <p className="css-body--xl-400 text-neutral-lightgrey mx-auto max-w-[848px]">
          Send links, answer questions, collect leads, and close sales —
          automatically —<br className="hidden xl:inline" />
          and stop treating engagement like a full-time job.
        </p>
      </main>

      {/* Curved Cards Arc Section */}
      <section
        id="features"
        className="relative z-20 w-full pt-6 pb-0 overflow-visible"
      >
        <HeroCardArc />
      </section>

      {/* Wingman chat — tucked under the arc; no section bg so edge cards stay visible */}
      <section
        id="demo"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 -mt-[10rem] sm:-mt-[2rem] lg:mt-24 pb-12 md:pb-[164px] flex justify-center pointer-events-none"
      >
        <WingmanChat />
      </section>

      {/* 24/7 Active Digital Worker Slide Section */}
      <ActiveWorkerSection />

      {/* Pricing Plans Section */}
      <PricingSection />

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Early Access CTA Section */}
      <EarlyAccessSection />

      <Footer />
    </div>
  );
}
