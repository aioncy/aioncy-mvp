import Badge from "@/components/Badge";
import WingmanBar from "@/components/WingmanBar";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 px-6 max-w-7xl mx-auto text-center flex flex-col items-center gap-12">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto items-center">
        {/* Reusable Badge */}
        <Badge text="Launching Soon" variant="yellow" />
        <h1 className="css-heading--h1 leading-[1.08] tracking-tight text-neutral-black max-w-3xl">
          Your <span className="text-aioncy">AI Employee</span> for Conversations, Leads &amp; Support
        </h1>
        <p className="text-body-xl-400 text-neutral-lightgrey leading-relaxed max-w-2xl">
          Send links, answer questions, collect leads, and close sales — automatically — and stop treating engagement like a full-time job.
        </p>
      </div>
      {/* Floating Wingman Booking Bar */}
      <div className="w-full mt-12 flex justify-center z-20 relative">
        <WingmanBar title="Wingman" description="Ask anything about aioncy" buttonText="Book a demo" onButtonClick={() => alert('Booking a premium demo console with Aioncy Founder Agent...')} />
      </div>
    </section>
  );
}
