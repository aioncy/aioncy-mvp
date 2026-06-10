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
const ORBIT_COUNT = 10;

function buildOrbitCards() {
  return Array.from({ length: ORBIT_COUNT }, (_, index) => ({
    card: CARDS[index % CARDS.length],
    angle: (360 / ORBIT_COUNT) * index,
  }));
}

export default function HeroCardArc() {
  const orbitCards = buildOrbitCards();

  return (
    <div className="hero-card-arc">
      <div className="arc-viewport" aria-hidden="true" tabIndex={-1}>
        <div className="arc-orbit">
          {orbitCards.map(({ card, angle }, index) => (
            <div
              key={`${card.title}-${index}`}
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
