"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const links = [
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled
          ? "bg-[#FAF6EF]/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-black/10 shadow-[0_16px_50px_-24px_rgba(28,26,23,0.25)]"
          : "bg-gradient-to-b from-[#FAF6EF]/90 via-[#FAF6EF]/40 to-transparent border-b border-transparent"
      }`}
    >
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-4 min-[380px]:px-6 py-4 md:px-10">
        <a href="#top" className="font-clash flex items-baseline gap-1 font-semibold tracking-tight justify-self-start">
          <span className="text-[22px] text-[#1C1A17]">studio</span>
          <span className="text-[22px] text-[#2F4A3C]">24</span>
        </a>

        <nav className="hidden items-center gap-10 sm:flex justify-self-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#1C1A17]/55 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1C1A17]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://cal.com/ansh-lachhwani"
          target="_blank"
          rel="noreferrer"
          onClick={() => track("cal_book_click", { location: "nav" })}
          className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1C1A17] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#2F4A3C] justify-self-end sm:text-[13px] sm:tracking-[0.22em]"
        >
          <span className="border-b border-[#1C1A17]/30 pb-0.5 group-hover:border-[#2F4A3C]">
            Book a call
          </span>
          <span className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}
