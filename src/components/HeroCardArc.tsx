"use client";

import React from "react";
import Card from "@/components/Card";
import {
  CaptureAutomationGraphic,
  ConversationsGraphic,
  UnifiedInboxGraphic,
  ContinuousImprovementGraphic,
  PersonalizedAgentsGraphic,
} from "@/components/CardGraphics";

const CARDS = [
  {
    title: "Lead Capture Automation",
    preview: "light" as const,
    graphic: <CaptureAutomationGraphic />,
  },
  {
    title: "AI Conversations in Action",
    preview: "dark" as const,
    graphic: <ConversationsGraphic />,
  },
  {
    title: "Unified Inbox",
    preview: "light" as const,
    graphic: <UnifiedInboxGraphic />,
  },
  {
    title: "Continuous AI Improvement",
    preview: "dark" as const,
    graphic: <ContinuousImprovementGraphic />,
  },
  {
    title: "Personalized AI Agents",
    preview: "light" as const,
    graphic: <PersonalizedAgentsGraphic />,
  },
];

/** Evenly spaced around the full circle — ~5 visible on top, seamless -180° loop */
const ORBIT_COUNT = 22;

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
        <div className="arc-orbit orbit-desktop">
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
                {card.graphic}
              </Card>
            </div>
          ))}
        </div>
        <div className="arc-orbit orbit-mobile">
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
                {card.graphic}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
