"use client";

import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
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
      className={`hidden xl:flex fixed rounded-[12px] z-50 items-center bg-neutral-black transition-[border-radius,padding] duration-300 ease-out ${
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
      <Logo />

      <div
        className="flex items-center gap-2.5 ml-auto overflow-hidden justify-end transition-all duration-300"
        style={{
          opacity: progress,
          maxWidth: progress * 280,
        }}
      >
        <Button size="default">Test the AI</Button>
                         <Button variant="dark" size="default">
                           Join Early
                         </Button>
      </div>
    </div>
  );
}
