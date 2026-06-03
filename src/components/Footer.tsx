import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Try Demo", href: "#demo" },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
] as const;

export default function Footer() {
  return (
    <footer className="w-full bg-[#F6F6F6] border-t border-border-light/50">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24">
          {/* Left: CTA bars */}
          <div className="flex flex-col gap-3 flex-1 max-w-[520px]">
            <div className="bg-neutral-black rounded-[22px] px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Image alt="" src={"/logo.svg"} width={100} height={100} />
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <a
                  href="#demo"
                  className="bg-utility-yellow text-neutral-black font-bold text-[13px] px-5 py-2.5 rounded-xl hover:bg-[#F2F250] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  Test the AI
                </a>
                <a
                  href="#early-access"
                  className="bg-[#3a3a3a] text-white font-bold text-[13px] px-5 py-2.5 rounded-xl hover:bg-[#4a4a4a] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  Join Early
                </a>
              </div>
            </div>

            <div className="bg-neutral-black rounded-[22px] px-5 sm:px-6 py-3.5 w-full sm:w-fit">
              <Image alt="" src={"/logo.svg"} width={100} height={100} />
            </div>
          </div>

          {/* Middle: page links */}
          <nav
            className="flex flex-col gap-4 pt-1 lg:pt-2"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-semibold text-neutral-black hover:text-aioncy transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: social links */}
          <nav
            className="flex flex-col gap-4 pt-1 lg:pt-2"
            aria-label="Social media"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-neutral-black hover:text-aioncy transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
