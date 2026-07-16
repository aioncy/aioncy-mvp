"use client";

import React from "react";
import Button from "./Button";

export default function EarlyAccessSection() {
  return (
    <section
      id="early-access"
      className="w-full px-0 xl:px-6 pb-[120px] md:pb-[200px] bg-[#F6F6F6]"
    >
      <div className="css-container mx-auto flex flex-col xl:flex-row gap-3 xl:gap-4 items-stretch xl:min-h-[497px]">
        {/* Left: dark panel with semicircle left edge + video */}
        <div className="relative flex items-center justify-center bg-[#1a1a1a] flex-1 min-h-[320px] sm:min-h-[400px] xl:min-h-0 rounded-[12px] xl:rounded-tl-[300px] xl:rounded-bl-[300px] xl:rounded-tr-[12px] xl:rounded-br-[12px] overflow-hidden">
          <video
            src="https://res.cloudinary.com/ac0d3mm1/video/upload/v1784192487/CTA_h2cmhy.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: purple CTA card */}
        <div className="flex-1 flex flex-col justify-between text-left xl:items-start xl:text-left bg-aioncy rounded-[12px] px-4 xl:px-12 py-10 xl:py-16 gap-8 xl:gap-5 min-h-[468px] sm:min-h-[400px] xl:min-h-0">
          <div className="flex flex-col items-center xl:items-start">
            <h2 className="text-white css-heading--h1 mb-4">
              Need Early<span className="hidden xl:inline">{"\n"}</span>
              <span className="xl:hidden"> </span>Access?
            </h2>

            <p className="text-white css-body--lg-400 max-w-[440px]">
              Be among the first to experience Aioncy. Start automating
              conversations, capturing leads, and testing the AI before the full
              launch.
            </p>
          </div>

          <div>
            <Button size="default">Request Early Access</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
