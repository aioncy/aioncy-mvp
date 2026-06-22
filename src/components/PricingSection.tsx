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
      {
        name: "20 Ai Credits",
        tooltip: "Get 20 messages per month to test the AI's capabilities.",
      },
      {
        name: "Website Widget",
        tooltip: "Embed the interactive Wingman chat bubble on your website.",
      },
      {
        name: "Limited Dashboard Access",
        tooltip: "Access basic chat transcripts and analytics logs.",
      },
      {
        name: "Basic AI Automation",
        tooltip: "Auto-reply to standard FAQs and support triggers.",
      },
      {
        name: "Aioncy Branding",
        tooltip: "Displays the 'Powered by Aioncy' badge on the widget.",
      },
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
      {
        name: "200 Ai Credits",
        tooltip: "Get 200 message credits per month for AI conversations.",
      },
      {
        name: "2 Platform Integration",
        tooltip: "Sync with up to 2 social/e-commerce platforms.",
      },
      {
        name: "2 Users",
        tooltip:
          "Invite 2 team members to access and manage conversations inside the dashboard.",
      },
      {
        name: "Dashboard Access",
        tooltip:
          "Full access to settings, user profiling, and agent memory logs.",
      },
      {
        name: "Your Branding",
        tooltip: "Remove Aioncy logos and fully white-label the widget.",
      },
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
      {
        name: "1000 Ai Credits",
        tooltip: "Get 1,000 message credits per month for scaling operations.",
      },
      {
        name: "3 Platform Integration",
        tooltip: "Connect up to 3 platform channels simultaneously.",
      },
      {
        name: "5 Users",
        tooltip:
          "Invite up to 5 team members to collaborate on client support.",
      },
      {
        name: "Dashboard Access +",
        tooltip: "Advanced analytics, custom tagging, and automation rules.",
      },
      {
        name: "Better Analytics",
        tooltip: "Detailed charts on customer behavior and response speeds.",
      },
      {
        name: "Booking / Appointment Flow",
        tooltip:
          "Allows client calendar syncing to book meetings automatically.",
      },
    ],
  },
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  return (
    <section
      id="pricing"
      className="w-full bg-[#F6F6F6] text-neutral-black py-16 lg:py-28 px-6 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Header Container (628px max width) */}
      <div className="max-w-[628px] w-full text-center flex flex-col items-center gap-6 lg:gap-8 mb-16 lg:mb-20">
        <h2 className="text-[40px] lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-neutral-black">
          Start Small.
          <br />
          <span className="text-aioncy">Scale</span> With AI.
        </h2>

        {/* Toggle billing switch container */}
        <div className="relative flex items-center justify-center">
          <div className="relative flex items-center bg-white border border-[#00000033] rounded-full overflow-hidden">
            {/* Sliding Pill Background */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-utility-yellow transition-transform duration-300 ease-out"
              style={{
                width: "50%",
                transform:
                  billingCycle === "annual"
                    ? "translateX(100%)"
                    : "translateX(0)",
              }}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 text-center px-4 py-2 css-misc--button z-10 transition-colors duration-200 cursor-pointer border-none outline-none text-neutral-black`}
            >
              Monthly
            </button>
            {/* Middle Divider */}
            <div className="w-[1px] bg-[#00000033] absolute top-0 bottom-0 left-1/2 z-20" />
            <button
              onClick={() => setBillingCycle("annual")}
              className={`flex-1 text-center px-4 py-2 css-misc--button z-10 transition-colors duration-200 cursor-pointer border-none outline-none text-neutral-black`}
            >
              Annually
            </button>
          </div>

          {/* Cursive Pink Callout (pointing to Annually toggle) */}
          <div className="absolute left-[calc(100%+16px)] top-[50%] hidden lg:flex flex-col gap-2 select-none pointer-events-none whitespace-nowrap">
            {/* SVG Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="23"
              viewBox="0 0 26 23"
              fill="none"
              className="mt-1"
            >
              <path
                d="M25.031 22.6768C27.031 13.1768 14.031 1.67676 2.03101 1.67676"
                stroke="#FF0D49"
                strokeWidth="0.5"
              />
              <path
                d="M3.53101 0.176758C3.03101 0.676758 1.63101 1.67676 0.0310058 1.67676C1.36434 1.84342 3.93101 2.47676 3.53101 3.67676"
                stroke="#FF0D49"
                strokeWidth="0.5"
              />
            </svg>
            {/* Cursive Save Text */}
            <span
              className="text-[20px] font-normal italic tracking-wide text-[#FF0D49]"
              style={{
                fontFamily:
                  "'Segoe Script', 'Comic Sans MS', 'Brush Script MT', cursive",
              }}
            >
              Save 19% with annual billing
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid (411px width proportional mockup) */}
      <div className="w-full css-container grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch justify-center px-0 lg:px-4">
        {PLANS.map((plan) => {
          const price =
            billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;

          return (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-[12px] px-8 py-12 ${
                plan.isFeatured
                  ? "bg-aioncy text-white border-none z-10"
                  : "bg-white text-neutral-black border border-border-light/50 hover:border-border-light hover:shadow-md"
              }`}
              style={{ minHeight: "642px" }}
            >
              {/* Top Details */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="css-heading--h3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="css-body--xl-500">{price}</span>
                  </div>
                </div>

                {/* Billing Badge */}
                <div className="flex items-center">
                  <span
                    className={`inline-block css-misc--label px-2 py-1 text-[#000000] rounded-full ${
                      plan.isFeatured
                        ? "bg-white"
                        : "bg-neutral-offwhite border border-border-light/35"
                    }`}
                  >
                    {billingCycle === "monthly" ? "Monthly" : "Annually"}
                  </span>
                  <div
                    className={
                      plan.isFeatured
                        ? "w-full h-[1px] bg-[#FFFFFF29]"
                        : "w-full h-[1px] bg-[#00000029]"
                    }
                  ></div>
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
              <div className="flex flex-col gap-3.5 mt-8 pt-6">
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-[13px] font-medium group/feat relative"
                  >
                    <span className="css-body--md-400">{feature.name}</span>

                    {/* Tooltip Wrapper */}
                    <div className="relative flex items-center">
                      {/* Info Icon (i) */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_4278_223"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                        >
                          <rect
                            width="20"
                            height="20"
                            fill={plan.isFeatured ? "#F4F4F4" : "#D9D9D9"}
                          />
                        </mask>
                        <g mask="url(#mask0_4278_223)">
                          <path
                            d="M9.37501 13.9583H10.625V9.16658H9.37501V13.9583ZM10.4775 7.54679C10.6079 7.41777 10.6731 7.2579 10.6731 7.06721C10.6731 6.87652 10.6086 6.71666 10.4796 6.58763C10.3506 6.45874 10.1907 6.39429 10 6.39429C9.80932 6.39429 9.64945 6.45874 9.52043 6.58763C9.3914 6.71666 9.32689 6.87652 9.32689 7.06721C9.32689 7.2579 9.39209 7.41777 9.52251 7.54679C9.65279 7.67582 9.81195 7.74033 10 7.74033C10.1881 7.74033 10.3472 7.67582 10.4775 7.54679ZM10.0015 17.9166C8.90647 17.9166 7.87723 17.7088 6.91376 17.2933C5.95029 16.8777 5.11223 16.3137 4.39959 15.6014C3.68695 14.889 3.12272 14.0513 2.70689 13.0883C2.29119 12.1252 2.08334 11.0962 2.08334 10.0014C2.08334 8.90638 2.29112 7.87714 2.70668 6.91367C3.12223 5.9502 3.68619 5.11214 4.39855 4.3995C5.11091 3.68686 5.94862 3.12263 6.91168 2.70679C7.87473 2.2911 8.90369 2.08325 9.99855 2.08325C11.0936 2.08325 12.1228 2.29103 13.0863 2.70658C14.0497 3.12214 14.8878 3.6861 15.6004 4.39846C16.3131 5.11082 16.8773 5.94853 17.2931 6.91159C17.7088 7.87464 17.9167 8.9036 17.9167 9.99846C17.9167 11.0935 17.7089 12.1227 17.2933 13.0862C16.8778 14.0496 16.3138 14.8877 15.6015 15.6003C14.8891 16.313 14.0514 16.8772 13.0883 17.293C12.1253 17.7087 11.0963 17.9166 10.0015 17.9166ZM10 16.6666C11.8611 16.6666 13.4375 16.0208 14.7292 14.7291C16.0208 13.4374 16.6667 11.861 16.6667 9.99992C16.6667 8.13881 16.0208 6.56242 14.7292 5.27075C13.4375 3.97909 11.8611 3.33325 10 3.33325C8.1389 3.33325 6.56251 3.97909 5.27084 5.27075C3.97918 6.56242 3.33334 8.13881 3.33334 9.99992C3.33334 11.861 3.97918 13.4374 5.27084 14.7291C6.56251 16.0208 8.1389 16.6666 10 16.6666Z"
                            fill={plan.isFeatured ? "#F4F4F4" : "#757575"}
                          />
                        </g>
                      </svg>

                      {/* Floating Tooltip Box */}
                      <div
                        className={`absolute bottom-full mb-2 right-0 w-52 py-2 px-3 rounded-xl opacity-0 pointer-events-none group-hover/feat:opacity-100 transition-all duration-200 z-30 shadow-lg css-body--re-400 border ${
                          plan.isFeatured
                            ? "bg-white text-neutral-black border-border-light/40"
                            : "bg-neutral-black text-white border-neutral-darkgrey"
                        }`}
                      >
                        {feature.tooltip}
                        {/* Tooltip Arrow */}
                        <div
                          className={`absolute top-full right-1.5 border-4 border-transparent ${
                            plan.isFeatured
                              ? "border-t-white"
                              : "border-t-neutral-black"
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
