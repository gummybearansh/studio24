"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-line",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.14, ease: "power3.out", delay: 0.15 }
        );
        gsap.fromTo(
          ".hero-fade",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out", delay: 0.65 }
        );
        gsap.to(".hero-bg", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-content", {
          y: -90,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 45%", scrub: true },
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#FAF6EF]">
      <div className="hero-bg absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-video-light.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,246,239,0.55)_0%,rgba(250,246,239,0.85)_62%,rgba(250,246,239,0.97)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EF]/75 via-transparent to-[#FAF6EF]" />
      </div>

      <div className="grain absolute inset-0" />

      <div className="hero-content relative z-10 mx-auto w-full max-w-6xl px-4 min-[380px]:px-6 pt-24 pb-20 text-center">
        <p className="hero-fade mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F4A3C] animate-pulse" />
          Now booking 24-hour delivery
        </p>

        <h1
          className="font-clash hero-title mx-auto w-full max-w-6xl font-semibold tracking-[-0.05em] leading-[0.96] text-[#1C1A17]"
          style={{ fontSize: "clamp(3.6rem, 9vw, 8.5rem)" }}
        >
          <span className="hero-line block">Landing pages</span>
          <span className="hero-line block pb-3">
            that{" "}
            <span className="relative inline-block italic text-[#2F4A3C]">
              convert.
              <span aria-hidden className="absolute -bottom-1 left-0 h-[0.09em] w-full rounded-full bg-[#2F4A3C]" />
            </span>
          </span>
        </h1>

        <p className="hero-fade mx-auto mt-7 max-w-xl text-base leading-relaxed text-[#1C1A17]/70 md:text-xl">
          $1000 flat. Delivered in 24 hours. Built to turn visitors into revenue.
        </p>

        <div className="hero-fade mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#work"
            className="group flex items-center gap-4 rounded-full bg-[#1C1A17] py-2 pl-8 pr-2 text-sm font-bold text-[#FAF6EF] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#2F4A3C] active:scale-[0.98]"
          >
            See live demos
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
              →
            </span>
          </a>
          <a
            href="https://cal.com/ansh-lachhwani"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-full border border-black/15 bg-white/70 py-2 pl-8 pr-2 text-sm font-bold text-[#1C1A17] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#2F4A3C]/60 hover:text-[#2F4A3C] active:scale-[0.98]"
          >
            Book a call
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
              ↗
            </span>
          </a>
        </div>

        <div className="hero-fade mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/50">
          <span>Conversion-first</span>
          <span className="h-px w-10 bg-black/15" />
          <span>Live client work</span>
          <span className="h-px w-10 bg-black/15" />
          <span>Ships in 24h</span>
        </div>
      </div>
    </section>
  );
}
