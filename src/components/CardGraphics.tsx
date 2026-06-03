import React from "react";

// 1. Capture Automation Graphic
export function CaptureAutomationGraphic() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-4 gap-2.5 relative select-none">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-border-light/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-border-light/25 pointer-events-none" />

      {/* Mock Lead Form */}
      <div className="bg-white border border-border-light/60 rounded-xl p-3.5 shadow-md flex flex-col gap-2 z-10 w-[90%] mx-auto transition-transform duration-300 group-hover:translate-y-[-4px]">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-utility-green animate-pulse" />
          <span className="text-[10px] font-bold text-neutral-lightgrey tracking-wider uppercase">Lead Collector</span>
        </div>
        
        {/* Form Fields */}
        <div className="h-6 rounded-lg bg-neutral-offwhite border border-border-light/40 flex items-center px-2 text-[10px] text-neutral-lightgrey">
          Name: Alex Carter
        </div>
        <div className="h-6 rounded-lg bg-neutral-offwhite border border-border-light/40 flex items-center px-2 text-[10px] text-neutral-lightgrey">
          Email: alex@design.co
        </div>

        {/* Button */}
        <div className="h-7 rounded-lg bg-aioncy text-white font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm shadow-aioncy/20">
          <span>Submit Lead</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// 2. AI Conversations in Action Graphic
export function ConversationsGraphic() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-3 gap-3 relative select-none">
      {/* Message Area mockup */}
      <div className="bg-[#1C1C1C] border border-white/10 rounded-xl p-3 shadow-inner flex flex-col gap-2.5 w-[94%] mx-auto transition-transform duration-300 group-hover:scale-[1.02]">
        
        {/* Mini Header */}
        <div className="flex items-center justify-between border-b border-neutral-darkgrey/60 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[#128C7E] flex items-center justify-center text-[8px] font-bold text-white">WA</div>
            <span className="text-[9px] font-bold text-neutral-offwhite">WhatsApp Chat</span>
          </div>
          <span className="text-[8px] text-utility-green font-medium">Active</span>
        </div>

        {/* Incoming Bubble */}
        <div className="bg-[#202020] border border-neutral-darkgrey/50 rounded-lg p-2 rounded-tl-none max-w-[85%] self-start flex flex-col gap-0.5">
          <span className="text-[8px] font-bold text-utility-green">User</span>
          <p className="text-[9px] leading-[1.3] text-neutral-offwhite font-mono">
            Hi, we're planning a base camp trip in October. Or private group?
          </p>
        </div>

        {/* Outgoing Bot Bubble */}
        <div className="bg-[#056162] rounded-lg p-2 rounded-tr-none max-w-[85%] self-end flex flex-col gap-0.5 shadow-sm shadow-black/10">
          <span className="text-[8px] font-bold text-utility-yellow">AI Employee</span>
          <p className="text-[9px] leading-[1.3] text-white">
            Awesome! October is the absolute best month for Everest Base Camp. Let me check availability...
          </p>
        </div>
      </div>
    </div>
  );
}

// 3. Unified Inbox Graphic
export function UnifiedInboxGraphic() {
  return (
    <div className="w-full h-full flex flex-col justify-between pt-4 pb-2 relative select-none">
      {/* Background connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {/* Instagram line */}
        <path d="M 40 40 Q 130 90 130 110" stroke="rgba(195, 195, 195, 0.4)" strokeWidth="1.5" fill="none" />
        {/* Facebook line */}
        <path d="M 85 40 Q 130 90 130 110" stroke="rgba(195, 195, 195, 0.4)" strokeWidth="1.5" fill="none" />
        {/* Slack line */}
        <path d="M 130 40 Q 130 90 130 110" stroke="rgba(195, 195, 195, 0.4)" strokeWidth="1.5" fill="none" />
        {/* TikTok line */}
        <path d="M 175 40 Q 130 90 130 110" stroke="rgba(195, 195, 195, 0.4)" strokeWidth="1.5" fill="none" />
        {/* Messenger line */}
        <path d="M 220 40 Q 130 90 130 110" stroke="rgba(195, 195, 195, 0.4)" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Top App Icons Row */}
      <div className="flex justify-around px-4 relative z-10">
        {/* Instagram */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-y-[-2px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>

        {/* Facebook */}
        <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-y-[-2px] delay-75">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>

        {/* Slack */}
        <div className="w-8 h-8 rounded-lg bg-[#4A154B] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-y-[-2px] delay-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.78a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-2.52 10.123a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.261a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.522 2.522v5.043a2.528 2.528 0 0 1-2.522 2.52h-5.043z" />
          </svg>
        </div>

        {/* TikTok */}
        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-y-[-2px] delay-150">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12.525.01c1.306-.022 2.616-.012 3.921-.012.353 1.63 1.157 3.047 2.447 4.029 1.428.962 3.09 1.396 4.773 1.492v4.062c-1.895-.015-3.7-.635-5.222-1.782-.186-.14-.354-.298-.564-.482v6.62c0 2.215-.694 4.334-2.025 5.92-1.737 2.115-4.484 3.195-7.147 2.857-3.11-.383-5.748-2.825-6.425-5.918-.767-3.415.766-7.1 3.793-8.817 1.488-.85 3.197-1.164 4.887-.936V11.1c-1.423-.393-2.996-.062-4.135.885-1.41 1.144-1.89 3.076-1.196 4.79.743 1.83 2.766 2.912 4.73 2.545 1.547-.282 2.8-1.528 3.155-3.073.08-.344.113-.7.113-1.054V0z" />
          </svg>
        </div>

        {/* Messenger */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066ff] to-[#ff5c5c] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-y-[-2px] delay-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            <path d="M8 13.5l3-3.5 3 3.5 2.5-3" />
          </svg>
        </div>
      </div>

      {/* Central Hub & Pill */}
      <div className="flex flex-col items-center gap-2 relative z-10">
        {/* Glowing Central Node */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-utility-bluishpurple to-aioncy flex items-center justify-center shadow-[0_0_16px_rgba(161,83,255,0.4)] animate-pulse transition-transform duration-300 group-hover:scale-110">
          <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center font-bold text-[8px] text-aioncy">A</div>
        </div>

        {/* Console Action Pill */}
        <div className="bg-aioncy/10 border border-aioncy/20 text-aioncy text-[9px] font-bold py-1 px-3.5 rounded-full shadow-sm">
          Dashboard Conversation
        </div>
      </div>
    </div>
  );
}

// 4. Continuous AI Improvement Graphic
export function ContinuousImprovementGraphic() {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      {/* Glow Center */}
      <div className="absolute w-24 h-24 rounded-full bg-utility-bluishpurple/10 blur-xl pointer-events-none" />

      {/* Circle Track SVG */}
      <svg className="absolute w-36 h-36 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="32" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
      </svg>

      {/* Loop Nodes */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Node: Train */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-[#201D1D] border border-neutral-darkgrey rounded-md px-2 py-0.5 text-[8px] text-neutral-lightgrey font-mono group-hover:border-aioncy transition-colors">
          Train
        </div>

        {/* Node: Test */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#201D1D] border border-neutral-darkgrey rounded-md px-2 py-0.5 text-[8px] text-neutral-lightgrey font-mono group-hover:border-aioncy transition-colors">
          Test
        </div>

        {/* Node: Deploy */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#201D1D] border border-neutral-darkgrey rounded-md px-2 py-0.5 text-[8px] text-neutral-lightgrey font-mono group-hover:border-aioncy transition-colors">
          Deploy
        </div>

        {/* Node: Improve */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 bg-[#201D1D] border border-neutral-darkgrey rounded-md px-2 py-0.5 text-[8px] text-neutral-lightgrey font-mono group-hover:border-aioncy transition-colors">
          Improve
        </div>

        {/* Central Core */}
        <div className="w-14 h-14 rounded-full bg-[#1C1C1C] border border-neutral-darkgrey/80 flex flex-col items-center justify-center gap-0.5 text-white shadow-inner">
          <svg className="w-4 h-4 text-aioncy animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ animationDuration: "6s" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
          </svg>
          <span className="text-[7px] font-bold tracking-wider text-placeholder uppercase">Goal</span>
        </div>
      </div>
    </div>
  );
}

// 5. Personalized AI Agents Graphic
export function PersonalizedAgentsGraphic() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-4 gap-2 relative select-none">
      {/* Mini Controls Dashboard */}
      <div className="bg-white border border-border-light/60 rounded-xl p-3 shadow-md flex flex-col gap-2.5 w-[92%] mx-auto transition-transform duration-300 group-hover:translate-y-[-4px]">
        {/* Header */}
        <div className="flex items-center gap-1.5 border-b border-neutral-offwhite pb-1.5">
          <div className="w-4 h-4 rounded-full bg-aioncy flex items-center justify-center text-[7px] text-white font-bold">P</div>
          <span className="text-[9px] font-bold text-neutral-black">Custom Personality</span>
        </div>

        {/* Slider 1 */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[8px] text-neutral-lightgrey font-medium">
            <span>Tone: Professional</span>
            <span className="text-aioncy">85%</span>
          </div>
          <div className="w-full h-1 bg-neutral-offwhite rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-aioncy rounded-full w-[85%]" />
            <div className="absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-aioncy rounded-full shadow-sm" />
          </div>
        </div>

        {/* Slider 2 */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[8px] text-neutral-lightgrey font-medium">
            <span>Creativity: Balanced</span>
            <span className="text-[#6840FF]">50%</span>
          </div>
          <div className="w-full h-1 bg-neutral-offwhite rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-[#6840FF] rounded-full w-[50%]" />
            <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-[#6840FF] rounded-full shadow-sm" />
          </div>
        </div>

        {/* Toggle options */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-[#98E891]/10 border border-[#98E891]/30 rounded-md px-1.5 py-0.5 text-[7px] text-[#2E7D32] font-bold">
            <span className="w-1 h-1 rounded-full bg-[#2E7D32]" />
            Leads Mode
          </div>
          <div className="flex items-center gap-1 bg-neutral-offwhite border border-border-light/40 rounded-md px-1.5 py-0.5 text-[7px] text-neutral-lightgrey">
            <span className="w-1 h-1 rounded-full bg-neutral-lightgrey" />
            Support Mode
          </div>
        </div>
      </div>
    </div>
  );
}
