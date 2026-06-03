import React, { ReactNode } from "react";

interface HeroCardProps {
  title: string;
  rotation?: number; // Tilt angle in degrees (e.g. -15, 0, 15)
  children: ReactNode; // Graphic or interactive content
  className?: string;
  yOffset?: number; // Optional vertical adjustment in pixels
}

export default function HeroCard({
  title,
  rotation = 0,
  children,
  className = "",
  yOffset = 0,
}: HeroCardProps) {
  return (
    <div
      className={`w-[240px] h-[220px] rounded-2xl border border-border-light/70 bg-white shadow-md flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:scale-108 hover:shadow-xl hover:border-aioncy/30 hover:z-30 cursor-pointer ${className}`}
      style={{
        transform: `translateY(${yOffset}px) rotate(${rotation}deg)`,
        // We define custom hover behavior directly in style using inline helper or state if needed, 
        // but standard Tailwind custom arbitrary values or SCSS hover overrides are extremely clean!
      }}
      // To handle smooth animation return, we declare a custom inline style variable that SCSS can easily override on hover
    >
      {/* Top Graphic Section */}
      <div className="flex-1 w-full bg-white flex items-center justify-center p-4 relative overflow-hidden select-none">
        {children}
      </div>

      {/* Dark Footer Section */}
      <div className="h-12 w-full bg-neutral-black flex items-center justify-center border-t border-neutral-darkgrey/20">
        <span className="text-body-re-400 font-medium text-white px-4 text-center truncate">
          {title}
        </span>
      </div>
    </div>
  );
}
