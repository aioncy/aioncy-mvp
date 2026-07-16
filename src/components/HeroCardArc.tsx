"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/Card";
import Lottie from "lottie-react";

type CardConfig = {
  title: string;
  preview: "light" | "dark";
  image: string;
  useVideo?: boolean;
  videoPath?: string;
  useLottie?: boolean;
  lottiePath?: string;
};

const CARDS: CardConfig[] = [
  {
    title: "Lead Capture Automation",
    preview: "light",
    image: "/card images/ai-conversations.avif",
    useVideo: true,
    videoPath: "https://res.cloudinary.com/ac0d3mm1/video/upload/v1784192476/lead_capture_glfewg.mp4",
  },
  {
    title: "AI Conversations in Action",
    preview: "dark",
    image: "/card images/lead-capture-automation.avif",
    useVideo: true,
    videoPath: "https://res.cloudinary.com/ac0d3mm1/video/upload/v1784192469/AIConverssationin_Action_aq8d74.mp4",
  },
  {
    title: "Unified Inbox",
    preview: "light",
    image: "/card images/continuous-improvement.avif",
  },
  {
    title: "Continuous AI Improvement",
    preview: "dark",
    image: "/card images/personalized-agents.avif",
    useVideo: true,
    videoPath: "https://res.cloudinary.com/ac0d3mm1/video/upload/v1784192458/Continuous_lscx3q.mp4",
  },
  {
    title: "Personalized AI Agents",
    preview: "light",
    image: "/card images/smart-automation.avif",
  },
  {
    title: "Smart Handover",
    preview: "light",
    image: "/card images/unified-inbox.avif",
    useVideo: true,
    videoPath: "https://res.cloudinary.com/ac0d3mm1/video/upload/v1784192478/Smart_Handover_mp4_o6amhx.mp4",
  },
    {
    title: "Business Insights",
    preview: "dark",
    image: "/card images/analytics-dashboard.avif",
    useVideo: true,
    videoPath: "https://res.cloudinary.com/ac0d3mm1/video/upload/v1784192454/Business_Insights_djpcs6.mp4",
  },
];

function buildOrbitCards(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    card: CARDS[index % CARDS.length],
    angle: (360 / count) * index,
  }));
}

function CardContent({ card }: { card: typeof CARDS[0] }) {
  if (card.useVideo && card.videoPath) {
    return (
      <div className="relative w-full h-full bg-[#201D1D]">
        <video
          src={card.videoPath}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-[4px]"
        />
      </div>
    );
  }

  if (card.useLottie && card.lottiePath) {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
      const path = card.lottiePath;
      if (!path) return;
      fetch(path)
        .then((res) => res.json())
        .then((data) => {
          // Update asset paths to be absolute URLs
          if (data.assets) {
            const basePath = path.substring(0, path.lastIndexOf('/'));
            data.assets = data.assets.map((asset: any) => {
              if (asset.u && asset.p) {
                asset.u = `${basePath}/images/`;
              }
              return asset;
            });
          }
          setAnimationData(data);
        })
        .catch((err) => console.error("Failed to load Lottie:", err));
    }, [card.lottiePath]);

    if (animationData) {
      return (
        <div className="relative w-full h-full bg-[#201D1D]">
          <Lottie
            animationData={animationData}
            loop={true}
            renderer="svg"
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid meet',
              imagePreserveAspectRatio: 'xMidYMid meet',
              progressiveLoad: false,
              hideOnTransparent: true,
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      );
    }
  }

  return (
    <div className="relative w-full h-full bg-[#201D1D]">
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover rounded-[4px]"
      />
    </div>
  );
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
                <CardContent card={card} />
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
