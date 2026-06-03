"use client";

import React from "react";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import WingmanChat from "@/components/WingmanChat";
import ActiveWorkerSection from "@/components/ActiveWorkerSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import Footer from "@/components/Footer";
import {
  CaptureAutomationGraphic,
  ConversationsGraphic,
  UnifiedInboxGraphic,
  ContinuousImprovementGraphic,
  PersonalizedAgentsGraphic,
} from "@/components/CardGraphics";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] text-neutral-black font-sans selection:bg-aioncy selection:text-white overflow-x-hidden relative flex flex-col justify-between">
      {/* Hero Header Section */}
      <main className="pt-20 pb-8 px-6 text-center flex flex-col items-center gap-6 max-w-7xl mx-auto w-full">
        <Badge text="Launching Soon" variant="yellow" />

        <h1 className="text-heading-h1 leading-[1.08] tracking-tight text-neutral-black max-w-4xl font-extrabold">
          Your <span className="text-[#A153FF]">AI Employee</span> for
          <br />
          Conversations, Leads & Support
        </h1>

        <p className="text-body-xl-400 text-neutral-lightgrey leading-relaxed max-w-[848px]">
          Send links, answer questions, collect leads, and close sales —
          automatically —<br className="hidden md:inline" />
          and stop treating engagement like a full-time job.
        </p>
      </main>

      {/* Curved Cards Arc Section */}
      <section
        id="features"
        className="w-full max-w-7xl mx-auto px-6 py-24 overflow-hidden"
      >
        <div className="hero-card-arc">
          <Card
            title="Capture Automation"
            preview="light"
            rotation={-22}
            yOffset={48}
          >
            <CaptureAutomationGraphic />
          </Card>

          <Card
            title="AI Conversations in Action"
            preview="dark"
            rotation={-11}
            yOffset={14}
          >
            <ConversationsGraphic />
          </Card>

          <Card
            title="Unified Inbox"
            preview="light"
            rotation={0}
            yOffset={0}
            scale={1.06}
          >
            <UnifiedInboxGraphic />
          </Card>

          <Card
            title="Continuous AI Improvement"
            preview="dark"
            rotation={11}
            yOffset={14}
          >
            <ContinuousImprovementGraphic />
          </Card>

          <Card
            title="Personalized AI Agents"
            preview="light"
            rotation={22}
            yOffset={48}
          >
            <PersonalizedAgentsGraphic />
          </Card>
        </div>
      </section>

      {/* Interactive Chat Console Section */}
      <section
        id="demo"
        className="w-full max-w-7xl mx-auto px-6 pt-6 pb-24 flex justify-center z-20 relative bg-[#F6F6F6]"
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
