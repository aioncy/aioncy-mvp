import Link from "next/link";
import FooterBrandBar, { FooterBrandAnchor } from "@/components/FooterBrandBar";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
] as const;

export default function Footer() {
  return (
    <>
      <FooterBrandBar />

      <footer className="w-full bg-[#F6F6F6] border-t border-border-light/50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24">
            <div className="flex-1 max-w-[680px]">
              <FooterBrandAnchor />
            </div>

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
    </>
  );
}
