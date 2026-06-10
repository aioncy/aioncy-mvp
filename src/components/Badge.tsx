import React from "react";

interface BadgeProps {
  text: string;
  variant?: "yellow" | "purple" | "green" | "pink";
  className?: string;
}

export default function Badge({
  text,
  variant = "yellow",
  className = "",
}: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "yellow":
        return "bg-utility-yellow text-neutral-black font-bold shadow-[0_2px_8px_rgba(255,255,98,0.15)]";
      case "purple":
        return "bg-aioncy/10 text-aioncy border border-aioncy/20 font-bold";
      case "green":
        return "bg-utility-green/10 text-utility-green border border-utility-green/20 font-bold";
      case "pink":
        return "bg-[#FF6B9D]/10 text-[#FF6B9D] border border-[#FF6B9D]/20 font-bold";
      default:
        return "bg-utility-yellow text-neutral-black font-bold";
    }
  };

  return (
    <span
      className={`border border-[#00000033] inline-flex items-center justify-center px-4 py-2 rounded-full css-misc--label text-[#000000] ${getVariantStyles()} ${className}`}
    >
      {text}
    </span>
  );
}
