"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const COLLAPSED_WIDTH = 148;
const EXPANDED_MAX_WIDTH = 520;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function FooterBrandAnchor() {
  return (
    <div
      className="footer-brand-anchor w-full max-w-[520px] h-[72px] shrink-0"
      aria-hidden="true"
    />
  );
}

export default function FooterBrandBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [style, setStyle] = useState<{
    top: number;
    left: number;
    width: number;
    progress: number;
  }>({ top: 0, left: 24, width: COLLAPSED_WIDTH, progress: 0 });

  const updatePosition = useCallback(() => {
    const anchor = document.querySelector<HTMLElement>(".footer-brand-anchor");
    const bar = barRef.current;
    if (!anchor || !bar) return;

    const anchorRect = anchor.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const container = anchor.closest(".max-w-7xl");
    const containerRect = container?.getBoundingClientRect();
    const containerLeft = containerRect?.left ?? 24;

    const collapsedLeft = containerLeft + 24;
    const collapsedTop = viewportHeight - bar.offsetHeight - 20;
    const expandedWidth = Math.min(EXPANDED_MAX_WIDTH, anchorRect.width);
    const expandStart = viewportHeight - 96;
    const expandEnd = viewportHeight - 200;
    const progress = clamp(
      (expandStart - anchorRect.top) / (expandStart - expandEnd),
      0,
      1,
    );

    const top = collapsedTop + (anchorRect.top - collapsedTop) * progress;
    const left = collapsedLeft + (anchorRect.left - collapsedLeft) * progress;
    const width =
      COLLAPSED_WIDTH + (expandedWidth - COLLAPSED_WIDTH) * progress;

    setStyle({ top, left, width, progress });
  }, []);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    setReady(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updatePosition]);

  const { progress, top, left, width } = style;
  const expanded = progress > 0.85;

  return (
    <div
      ref={barRef}
      className={`fixed rounded-[12px] z-50 flex items-center bg-neutral-black shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-[border-radius,padding] duration-300 ease-out ${
        expanded ? "justify-between" : "justify-start"
      }`}
      style={{
        top,
        left,
        width,
        opacity: ready ? 1 : 0,
        padding: `${10 + 6 * progress}px ${16 + 4 * progress}px`,
      }}
    >
      <Image
        alt="Aioncy"
        src="/logo.svg"
        width={160}
        height={54}
        className="h-10 w-auto shrink-0"
        priority
      />

      <div
        className="flex items-center gap-2.5 ml-auto overflow-hidden justify-end"
        style={{
          // maxWidth: expanded ? 280 : 0,
          opacity: progress ? 1 : 0,
        }}
      >
        <Link
          href="#demo"
          className="bg-utility-yellow text-neutral-black font-bold text-[13px] px-5 py-2.5 rounded-xl hover:bg-[#F2F250] active:scale-[0.98] transition-all whitespace-nowrap"
        >
          Test the AI
        </Link>
        <Link
          href="#early-access"
          className="bg-[#3a3a3a] text-white font-bold text-[13px] px-5 py-2.5 rounded-xl hover:bg-[#4a4a4a] active:scale-[0.98] transition-all whitespace-nowrap"
        >
          Join Early
        </Link>
      </div>
    </div>
  );
}
