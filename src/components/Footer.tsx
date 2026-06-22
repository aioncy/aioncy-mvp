"use client";

import React, { useState } from "react";
import Link from "next/link";
import FooterBrandBar, { FooterBrandAnchor } from "@/components/FooterBrandBar";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

function FooterAccordion({
  title,
  links,
  isExternal = false,
}: {
  title: string;
  links: any[];
  isExternal?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-light/50 py-4 lg:border-none lg:py-0 w-full lg:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full lg:hidden text-[16px] font-bold text-neutral-black"
      >
        <span>{title}</span>
        <span className="text-xl font-light">{isOpen ? "-" : "+"}</span>
      </button>

      {/* Desktop always shows, Mobile toggles */}
      <nav
        className={`flex-col gap-4 pt-4 lg:pt-2 lg:flex ${isOpen ? "flex" : "hidden"}`}
        aria-label={title}
      >
        {links.map((link) =>
          isExternal ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="css-body--lg-500 text-neutral-black hover:text-aioncy transition-colors w-fit"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="css-body--lg-500 text-neutral-black hover:text-aioncy transition-colors w-fit"
            >
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <FooterBrandBar />

      <footer className="css-container w-full bg-[#F6F6F6] border-t border-border-light/50">
        <div className="mx-auto px-6 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16 xl:gap-24">
            <div className="flex-1 max-w-[680px]">
              <FooterBrandAnchor />
            </div>

            <div className="w-full lg:w-auto flex flex-col lg:flex-row gap-0 lg:gap-16 pr-20">
              <FooterAccordion title="Product" links={NAV_LINKS} />
              <FooterAccordion
                title="Socials"
                links={SOCIAL_LINKS}
                isExternal
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
