"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import FooterBrandBar, { FooterBrandAnchor } from "@/components/FooterBrandBar";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Try Demo", href: "#demo" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  return (
    <>
      <FooterBrandBar />

      <div className="w-full bg-[#F6F6F6] border-t border-border-light">
        <footer className="css-container w-full">
          <div className="mx-auto lg:px-6 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-16 xl:gap-24">
            {/* Mobile-only static brand card */}
            <div className="lg:hidden w-full flex lg:justify-center px-4 sm:px-0 mb-8">
              <div className="flex w-full max-w-[559px] flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-4 bg-neutral-black rounded-[12px] px-6 py-6 sm:py-5">
                <Logo />
                <div className="flex items-center gap-2.5">
                  <Button size="default">Test the AI</Button>
                  <Button variant="dark" size="default">
                    Join Early
                  </Button>
                </div>
              </div>
            </div>

            {/* Brand anchor (desktop only) */}
            <div className="hidden lg:block flex-1 max-w-[680px]">
              <FooterBrandAnchor />
            </div>

            {/* Link columns */}
            <div className="w-full mx-auto lg:mx-0 lg:max-w-none lg:w-auto flex flex-row justify-between sm:justify-start gap-12 sm:gap-24 lg:gap-16 px-6 sm:px-6 lg:px-0 lg:pr-20">
              {/* Socials column */}
              <nav className="flex flex-col gap-5" aria-label="Socials">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="css-body--lg-500 text-neutral-black hover:text-aioncy transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Product column */}
              <nav className="flex flex-col gap-5" aria-label="Product">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="css-body--lg-500 text-neutral-black hover:text-aioncy transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
