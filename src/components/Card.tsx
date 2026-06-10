import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  /** Background of the top preview area */
  preview?: "light" | "dark";
  rotation?: number;
  yOffset?: number;
  scale?: number;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  title,
  preview = "light",
  rotation = 0,
  yOffset = 0,
  scale = 1,
  children,
  className = "",
  onClick,
}: CardProps) {
  const isLightPreview = preview === "light";

  return (
    <div
      onClick={onClick}
      className={`arc-card group p-2 w-[300px] h-[250px] rounded-[6px] bg-neutral-black flex flex-col overflow-hidden select-none ${className}`}
      // style={
      //   {
      //     "--card-rotate": `${rotation}deg`,
      //     "--card-y-offset": `${yOffset}px`,
      //     "--card-scale": String(scale),
      //   } as React.CSSProperties
      // }
    >
      {/* Top ~2/3: product preview */}
      <div
        className={`flex-[2] w-full flex items-center justify-center p-3 relative overflow-hidden ${
          isLightPreview ? "bg-[#F4F4F4]" : "bg-[#141414]"
        }`}
      >
        {children}
      </div>

      {/* Bottom ~1/3: title bar */}
      <div className="flex-1 p-3 w-full bg-neutral-black flex items-center justify-center border-t border-white/10 max-h-12">
        <span className="text-[13px] font-semibold text-white tracking-tight text-center leading-snug">
          {title}
        </span>
      </div>
    </div>
  );
}
