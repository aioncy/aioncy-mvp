"use client";

import React from "react";
import Button from "./Button";

export default function EarlyAccessSection() {
  return (
    <section id="early-access" className="w-full px-6 py-16 bg-[#F6F6F6]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch min-h-[280px]">
        {/* Left: dark panel with semicircle left edge + flow diagram */}
        <div
          className="flex items-center justify-center bg-[#1a1a1a] flex-1 min-h-[240px] sm:min-h-0 px-6 py-10 sm:py-8"
          style={{ borderRadius: "999px 28px 28px 999px" }}
        >
          <AioncyFlowDiagram />
        </div>

        {/* Right: purple CTA card */}
        <div className="flex-1 flex flex-col justify-center bg-aioncy rounded-[28px] px-10 py-10 sm:py-12 gap-5">
          <h2 className="text-white font-extrabold text-[36px] sm:text-[40px] leading-[1.08] tracking-[-0.02em]">
            Need Early
            <br />
            Access?
          </h2>

          <p className="text-white/90 text-[14px] leading-[1.65] max-w-[300px]">
            Be among the first to experience Aioncy. Start automating
            conversations, capturing leads, and testing the AI before the full
            launch.
          </p>

          <div className="pt-1">
            <Button size="small">
              Request Early Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowNode({
  x,
  y,
  width,
  label,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
}) {
  const height = 28;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={14}
        fill="#1a1a1a"
        stroke="#4a4a4a"
        strokeWidth="1"
      />
      <text
        x={x + width / 2}
        y={y + height / 2 + 4}
        textAnchor="middle"
        fill="white"
        fontSize="11.5"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

function AioncyFlowDiagram() {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[280px]"
      aria-hidden
    >
      <defs>
        <marker
          id="flowArrow"
          markerWidth="5"
          markerHeight="5"
          refX="2.5"
          refY="2.5"
          orient="auto"
        >
          <path d="M0,0 L0,5 L5,2.5 z" fill="#FFFF62" />
        </marker>
      </defs>

      {/* Stadium-shaped flow track */}
      <rect
        x="28"
        y="58"
        width="264"
        height="100"
        rx="50"
        stroke="#4a4a4a"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Handwritten-style label + arrow toward Train */}
      <path
        d="M 198 48 C 188 38 172 36 158 42"
        stroke="#FFFF62"
        strokeWidth="1.2"
        fill="none"
        markerEnd="url(#flowArrow)"
      />
      <text
        x="200"
        y="50"
        fill="#FFFF62"
        fontSize="12"
        fontStyle="italic"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="0.2"
      >
        The Aioncy Flow
      </text>

      <FlowNode x={118} y={44} width={84} label="Train" />
      <FlowNode x={248} y={94} width={58} label="Test" />
      <FlowNode x={114} y={144} width={92} label="Deploy" />
      <FlowNode x={14} y={94} width={84} label="Improve" />
    </svg>
  );
}
