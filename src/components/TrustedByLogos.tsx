import React from "react";

export default function TrustedByLogos() {
  const logos = [
    "Netflix",
    "Airbnb",
    "Google",
    "Stripe",
  ];

  return (
    <section className="w-full bg-[#F6F6F6] pb-12 pt-6 px-6 relative z-10 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-8 lg:gap-16 opacity-40 grayscale flex-wrap">
        {logos.map((logo, idx) => (
          <div key={idx} className="text-xl lg:text-2xl font-bold tracking-tighter text-neutral-darkgrey font-sans">
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
