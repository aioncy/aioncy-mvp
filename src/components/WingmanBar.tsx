import React from "react";

interface WingmanBarProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function WingmanBar({
  title = "Wingman",
  description = "Ask anything about aioncy",
  buttonText = "Book a demo",
  onButtonClick,
  className = "",
}: WingmanBarProps) {
  return (
    <div
      className={`w-full max-w-2xl px-8 py-4 rounded-2xl bg-neutral-black border border-neutral-darkgrey/40 shadow-xl flex items-center justify-between text-left transition-all duration-300 hover:border-aioncy/20 hover:shadow-2xl hover:shadow-aioncy/5 ${className}`}
    >
      <div className="flex flex-col gap-1">
        <h4 className="text-body-lg-500 font-bold text-white tracking-tight">
          {title}
        </h4>
        <p className="text-label text-placeholder">
          {description}
        </p>
      </div>

      <button
        onClick={onButtonClick}
        className="text-button px-6 py-3 bg-utility-yellow text-neutral-black hover:bg-[#F2F250] active:scale-[0.97] rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        {buttonText}
      </button>
    </div>
  );
}
