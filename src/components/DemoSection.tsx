import React from "react";

interface Agent {
  id: string;
  name: string;
  active: boolean;
  logs: string[];
}

interface DemoSectionProps {
  agents: Agent[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function DemoSection({ agents, activeTab, setActiveTab }: DemoSectionProps) {
  return (
    <section id="demo" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <h2 className="text-heading-h2 text-neutral-black">
            Interactive Agent Lab
          </h2>
          <p className="text-body-lg-400 text-neutral-lightgrey leading-relaxed">
            Experience the agency live. Switch tabs to preview individual autonomous workers generating
            outputs and optimizing tasks in real-time.
          </p>
          <div className="flex flex-col gap-3">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  activeTab === agent.id
                    ? "border-aioncy bg-aioncy/5 text-neutral-black"
                    : "border-border-light bg-zinc-50/50 text-placeholder hover:bg-zinc-50 hover:text-neutral-black"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-body-re-400">
                    {agent.name}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      agent.active ? "bg-utility-green animate-pulse" : "bg-neutral-lightgrey"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="border border-border-light rounded-2xl bg-zinc-50/30 overflow-hidden shadow-xl min-h-[380px] flex flex-col">
            <div className="px-6 py-4 bg-zinc-100 border-b border-border-light flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-utility-green animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase text-neutral-black">
                  {agents.find((a) => a.id === activeTab)?.name} Console
                </span>
              </div>
              <span className="text-xs text-placeholder">Agent Shared memory: OK</span>
            </div>
            <div className="p-6 font-mono text-sm text-neutral-black/80 flex-1 space-y-4">
              <p className="text-placeholder">[Initialising Cognitive State...]</p>
              {agents
                .find((a) => a.id === activeTab)
                ?.logs.map((log, index) => (
                  <div key={index} className="flex gap-2 items-start animate-fade-in">
                    <span className="text-aioncy">&gt;</span>
                    <p>{log}</p>
                  </div>
                ))}
              <div className="animate-pulse text-utility-bluishpurple font-bold">
                ● Agent is listening to cognitive broadcast...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
