export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 border-t border-border-light bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-heading-h2 text-neutral-black">Engineered for Autonomous Success</h2>
          <p className="text-body-re-400 text-neutral-lightgrey">
            Aioncy eliminates human bandwidth bottlenecks by introducing zero-latency collaboration layers for multi-agent tasks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl border border-border-light bg-white hover:border-aioncy/30 hover:shadow-xl transition-all group duration-300">
            <div className="w-12 h-12 rounded-xl bg-aioncy/10 border border-aioncy/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-aioncy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-heading-h3 text-neutral-black mb-3">Cognitive Collaboration</h3>
            <p className="text-body-re-400 text-neutral-lightgrey leading-relaxed">
              Agents pass structured memory contexts dynamically, optimizing project plans without manual human intervention.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-8 rounded-2xl border border-border-light bg-white hover:border-utility-bluishpurple/30 hover:shadow-xl transition-all group duration-300">
            <div className="w-12 h-12 rounded-xl bg-utility-bluishpurple/10 border border-utility-bluishpurple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-utility-bluishpurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h3 className="text-heading-h3 text-neutral-black mb-3">Shared Long-Term Memory</h3>
            <p className="text-body-re-400 text-neutral-lightgrey leading-relaxed">
              Vectorized memory engines allow agents to remember past optimizations, user feedback, and workflow results permanently.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-8 rounded-2xl border border-border-light bg-white hover:border-utility-green/30 hover:shadow-xl transition-all group duration-300">
            <div className="w-12 h-12 rounded-xl bg-utility-green/10 border border-utility-green/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-utility-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-heading-h3 text-neutral-black mb-3">Zero Leak Guardrails</h3>
            <p className="text-body-re-400 text-neutral-lightgrey leading-relaxed">
              Sandboxed execution logs and continuous static analyzers ensure AI output is always fully safe, predictable, and correct.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
