"use client";

import React from "react";
import Image from "next/image";
import Card from "@/components/Card";

const CARDS = [
  {
    title: "Lead Capture Automation",
    preview: "light" as const,
    image: "/card images/ai-conversations.avif",
  },
  {
    title: "AI Conversations in Action",
    preview: "dark" as const,
    image: "/card images/lead-capture-automation.avif",
  },
  {
    title: "Unified Inbox",
    preview: "light" as const,
    image: "/card images/continuous-improvement.avif",
  },
  {
    title: "Continuous AI Improvement",
    preview: "dark" as const,
    image: "/card images/personalized-agents.avif",
  },
  {
    title: "Personalized AI Agents",
    preview: "light" as const,
    image: "/card images/smart-automation.avif",
  },
  {
    title: "Smart Handover",
    preview: "light" as const,
    image: "/card images/unified-inbox.avif",
  },
    {
    title: "Business Insights",
    preview: "dark" as const,
    image: "/card images/analytics-dashboard.avif",
  },
];

function buildOrbitCards(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    card: CARDS[index % CARDS.length],
    angle: (360 / count) * index,
  }));
}

export default function HeroCardArc() {
  // Desktop uses 20 cards for a dense, flat arc. (20 works perfectly for seamless 180° loop since 20/2=10 is a multiple of 5)
  const orbitCardsDesktop = buildOrbitCards(20);
  // Mobile uses 10 cards for a steep arc so they don't overlap horizontally.
  const orbitCardsMobile = buildOrbitCards(10);

  return (
    <div className="hero-card-arc">
      <div className="arc-viewport" aria-hidden="true" tabIndex={-1}>
        {/* Desktop Orbit (20 cards) - Hidden on mobile, visible on sm and up */}
        <div className="arc-orbit hidden lg:block">
          {orbitCardsDesktop.map(({ card, angle }, index) => (
            <div
              key={`desktop-${card.title}-${index}`}
              className="card-wrapper"
              style={
                {
                  "--orbit-angle": `${angle}deg`,
                } as React.CSSProperties
              }
            >
              <Card title={card.title} preview={card.preview} rotation={0}>
                <div className="relative w-full h-full bg-[#201D1D]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover rounded-[4px]"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
        {/* Mobile Orbit (10 cards) - Visible on mobile, hidden on sm and up */}
        <div className="arc-orbit block lg:hidden">
          {orbitCardsMobile.map(({ card, angle }, index) => (
            <div
              key={`mobile-${card.title}-${index}`}
              className="card-wrapper"
              style={
                {
                  "--orbit-angle": `${angle}deg`,
                } as React.CSSProperties
              }
            >
              <Card title={card.title} preview={card.preview} rotation={0}>
                <div className="relative w-full h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover rounded-[4px]"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
