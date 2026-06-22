"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
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

      <footer className="css-container w-full bg-[#F6F6F6]">
        <div className="mx-auto lg:px-6 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-16 xl:gap-24">
            {/* Mobile-only static brand card */}
            <div className="lg:hidden">
              <div className="inline-flex w-full flex-col gap-4 bg-neutral-black rounded-[12px] p-4 align-left">
                <Image
                  alt="Aioncy"
                  src="/logo.svg"
                  width={160}
                  height={54}
                  className="h-10 w-fit shrink-0 mb-8"
                />
                <div className="flex items-center gap-2.5">
                  <Button size="small">Test the AI</Button>
                  <Button variant="dark" size="small">
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
            <div className="w-full lg:w-auto flex flex-row lg:flex-row justify-between sm:justify-start gap-16 lg:gap-16 pr-4 lg:pr-20 pl-4 lg:pl-0">
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
    </>
  );
}
