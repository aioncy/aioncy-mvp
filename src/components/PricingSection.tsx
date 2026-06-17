"use client";

import React, { useState } from "react";
import Button from "./Button";

interface FeatureItem {
  name: string;
  tooltip: string;
}

interface PlanData {
  name: string;
  monthlyPrice: string;
  annualPrice: string; // Calculated at 19% discount
  description: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "disabled";
  isFeatured: boolean; // Essential Plan is featured (purple card)
  features: FeatureItem[];
}

const PLANS: PlanData[] = [
  {
    name: "Freemium Plan",
    monthlyPrice: "NRS 0000",
    annualPrice: "NRS 0000",
    description:
      "Perfect for individuals and small businesses wanting to explore AI conversations and automate customer replies before scaling further.",
    buttonText: "Join Waitlist",
    buttonVariant: "primary",
    isFeatured: false,
    features: [
      { name: "20 Ai Credits", tooltip: "Get 20 messages per month to test the AI's capabilities." },
      { name: "Website Widget", tooltip: "Embed the interactive Wingman chat bubble on your website." },
      { name: "Limited Dashboard Access", tooltip: "Access basic chat transcripts and analytics logs." },
      { name: "Basic AI Automation", tooltip: "Auto-reply to standard FAQs and support triggers." },
      { name: "Aioncy Branding", tooltip: "Displays the 'Powered by Aioncy' badge on the widget." },
    ],
  },
  {
    name: "Essential Plan",
    monthlyPrice: "NRS 2,999",
    annualPrice: "NRS 2,429", // ~19% off
    description:
      "Designed for growing businesses that want to automate conversations, capture leads, and manage customers from one dashboard.",
    buttonText: "Get Early Access",
    buttonVariant: "secondary",
    isFeatured: true,
    features: [
      { name: "200 Ai Credits", tooltip: "Get 200 message credits per month for AI conversations." },
      { name: "2 Platform Integration", tooltip: "Sync with up to 2 social/e-commerce platforms." },
      { name: "2 Users", tooltip: "Invite 2 team members to access and manage conversations inside the dashboard." },
      { name: "Dashboard Access", tooltip: "Full access to settings, user profiling, and agent memory logs." },
      { name: "Your Branding", tooltip: "Remove Aioncy logos and fully white-label the widget." },
    ],
  },
  {
    name: "Growth Plan",
    monthlyPrice: "NRS 6,999",
    annualPrice: "NRS 5,669", // ~19% off
    description:
      "Built for businesses handling higher customer volume with advanced automation and operational workflows.",
    buttonText: "Coming Soon",
    buttonVariant: "disabled",
    isFeatured: false,
    features: [
      { name: "1000 Ai Credits", tooltip: "Get 1,000 message credits per month for scaling operations." },
      { name: "3 Platform Integration", tooltip: "Connect up to 3 platform channels simultaneously." },
      { name: "5 Users", tooltip: "Invite up to 5 team members to collaborate on client support." },
      { name: "Dashboard Access +", tooltip: "Advanced analytics, custom tagging, and automation rules." },
      { name: "Better Analytics", tooltip: "Detailed charts on customer behavior and response speeds." },
      { name: "Booking / Appointment Flow", tooltip: "Allows client calendar syncing to book meetings automatically." },
    ],
  },
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="w-full bg-[#F6F6F6] text-neutral-black py-16 lg:py-28 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Header Container (628px max width) */}
      <div className="max-w-[628px] w-full text-center flex flex-col items-center gap-6 lg:gap-8 mb-12 lg:mb-16">
        <h2 className="text-[40px] lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-neutral-black">
          Start Small.<br />
          <span className="text-aioncy">Scale</span> With AI.
        </h2>

        {/* Toggle billing switch container */}
        <div className="relative flex items-center justify-center">
          <div className="relative flex items-center bg-white border border-border-light/40 p-1 rounded-full w-[170px] h-10 select-none shadow-sm">
            {/* Sliding Pill Background */}
            <div
              className="absolute top-1 bottom-1 left-1 rounded-full bg-utility-yellow transition-all duration-300 ease-out"
              style={{
                width: "81px",
                transform: billingCycle === "annual" ? "translateX(81px)" : "translateX(0px)",
              }}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 text-center text-[12px] font-extrabold z-10 transition-colors duration-200 cursor-pointer border-none outline-none ${
                billingCycle === "monthly" ? "text-neutral-black" : "text-placeholder"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`flex-1 text-center text-[12px] font-extrabold z-10 transition-colors duration-200 cursor-pointer border-none outline-none ${
                billingCycle === "annual" ? "text-neutral-black" : "text-placeholder"
              }`}
            >
              Annually
            </button>
          </div>

          {/* Cursive Pink Callout (pointing to Annually toggle) */}
          <div className="absolute left-[calc(100%+16px)] top-[2px] hidden lg:flex items-start gap-1 select-none pointer-events-none whitespace-nowrap">
            {/* SVG Arrow */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
              <path
                d="M4 20C9 18 13 14 15 9M15 9L11 9M15 9L16 13"
                stroke="#FF6B9D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            {/* Cursive Save Text */}
            <span
              className="text-[#FF6B9D] text-[13px] font-normal italic tracking-wide"
              style={{
                fontFamily: "'Segoe Script', 'Comic Sans MS', 'Brush Script MT', cursive",
                transform: "rotate(-1.5deg)",
              }}
            >
              Save 19% with annual billing
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid (411px width proportional mockup) */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch justify-center px-0 lg:px-4">
        {PLANS.map((plan) => {
          const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
          
          return (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl p-6 lg:p-8 transition-all duration-300 shadow-sm ${
                plan.isFeatured
                  ? "bg-aioncy text-white border-none shadow-[0_12px_40px_rgba(161,83,255,0.25)] lg:scale-[1.03] z-10"
                  : "bg-white text-neutral-black border border-border-light/50 hover:border-border-light hover:shadow-md"
              }`}
              style={{ minHeight: "560px" }}
            >
              {/* Top Details */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[24px] font-extrabold tracking-tight">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] font-extrabold tracking-tight">{price}</span>
                  </div>
                </div>

                {/* Billing Badge */}
                <div>
                  <span
                    className={`inline-block text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${
                      plan.isFeatured
                        ? "bg-white text-aioncy"
                        : "bg-neutral-offwhite text-placeholder border border-border-light/35"
                    }`}
                  >
                    {billingCycle === "monthly" ? "Monthly" : "Annually"}
                  </span>
                </div>

                {/* Description */}
                <p
                  className={`text-[13.5px] leading-[1.5] ${
                    plan.isFeatured ? "text-white/80" : "text-neutral-lightgrey"
                  }`}
                >
                  {plan.description}
                </p>

                {/* CTA Action Button */}
                <div className="mt-2">
                  {plan.buttonVariant === "primary" && (
                    <Button variant="purple" size="full">
                      {plan.buttonText}
                    </Button>
                  )}
                  {plan.buttonVariant === "secondary" && (
                    <Button variant="primary" size="full">
                      {plan.buttonText}
                    </Button>
                  )}
                  {plan.buttonVariant === "disabled" && (
                    <Button variant="disabled" size="full">
                      {plan.buttonText}
                    </Button>
                  )}
                </div>
              </div>

              {/* Features List Section */}
              <div className="flex flex-col gap-3.5 mt-8 border-t border-current/15 pt-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center justify-between text-[13px] font-medium group/feat relative">
                    <span className="opacity-95">{feature.name}</span>
                    
                    {/* Tooltip Wrapper */}
                    <div className="relative flex items-center">
                      {/* Info Icon (i) */}
                      <div className="w-4 h-4 rounded-full border border-current/40 hover:border-current hover:bg-current/5 flex items-center justify-center cursor-help transition-all">
                        <span className="text-[9px] font-bold font-serif select-none">i</span>
                      </div>

                      {/* Floating Tooltip Box */}
                      <div
                        className={`absolute bottom-full mb-2 right-0 w-52 p-3 rounded-xl opacity-0 pointer-events-none group-hover/feat:opacity-100 transition-all duration-200 z-30 shadow-lg text-[11px] leading-[1.4] border ${
                          plan.isFeatured
                            ? "bg-white text-neutral-black border-border-light/40"
                            : "bg-neutral-black text-white border-neutral-darkgrey"
                        }`}
                      >
                        {feature.tooltip}
                        {/* Tooltip Arrow */}
                        <div
                          className={`absolute top-full right-1.5 border-4 border-transparent ${
                            plan.isFeatured ? "border-t-white" : "border-t-neutral-black"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
