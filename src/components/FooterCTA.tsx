"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const sites = [
  { name: "Cluck Royale", href: "https://cluck-royale-vert.vercel.app/" },
  { name: "Pizza Palace", href: "https://pizza-palace-liart.vercel.app/" },
  { name: "Swastik Jewels", href: "https://swastik-jewels.vercel.app/" },
  { name: "Chinese Heaven", href: "https://chinese-heaven.vercel.app/" },
];

function CalMark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#2F4A3C] text-[#FAF6EF]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9.5 15.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-sm font-bold tracking-tight text-[#1C1A17]">Cal.com</span>
    </span>
  );
}

export default function FooterCTA() {
  const root = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [imgOk, setImgOk] = useState(true);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".foot-line",
          { y: 64, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: ".foot-head", start: "top 82%" },
          }
        );
        gsap.fromTo(
          ".foot-card",
          { y: 64, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: ".foot-grid", start: "top 85%" },
          }
        );
      }, root);
      return () => ctx.revert();
    },
    { scope: root }
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Studio24 project - ${name || "new inquiry"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject:\n${brief}`);
    window.location.href = `mailto:ansh@ship24.tech?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={root}>
      <section id="contact" className="relative w-full bg-[#FAF6EF] px-4 pt-24 md:pt-32 pb-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="foot-head">
            <h2 className="font-clash font-semibold tracking-[-0.035em] leading-[0.95] text-[#1C1A17]" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
              <span className="foot-line block">Have something</span>
              <span className="foot-line block">to sell? <span className="text-[#1C1A17]/35">Let&apos;s ship it.</span></span>
            </h2>
          </div>

          <div className="foot-grid mt-12 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col">
              <a href="mailto:ansh@ship24.tech" className="foot-card group block">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1A17]/40">Email</p>
                <p className="font-clash mt-2 text-3xl font-semibold tracking-tight text-[#1C1A17] transition-colors duration-500 group-hover:text-[#2F4A3C] [overflow-wrap:anywhere] md:text-4xl">
                  ansh@ship24.tech
                </p>
                <p className="mt-2 text-sm text-[#1C1A17]/55">Direct line. Replies within hours.</p>
              </a>

              <div className="my-8 h-px bg-black/10" />

              <a
                href="https://cal.com/ansh-lachhwani"
                target="_blank"
                rel="noreferrer"
                className="foot-card group block"
              >
                <CalMark />
                <p className="font-clash mt-3 text-3xl font-semibold tracking-tight text-[#1C1A17] transition-colors duration-500 group-hover:text-[#2F4A3C] md:text-4xl">
                  Book a 15-min call
                </p>
                <p className="mt-2 text-sm text-[#1C1A17]/55">Scope, price, ship date. No back-and-forth.</p>
              </a>

              <figure className="foot-card mt-10 flex flex-1 flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 shadow-[0_24px_60px_-40px_rgba(28,26,23,0.3)]">
                <div className="relative min-h-[260px] w-full flex-1 overflow-hidden bg-gradient-to-br from-[#DDE7D8] via-[#FFFDF8] to-[#DDE6F0]">
                  {imgOk && (
                    <img
                      src="/contact-studio.jpg"
                      alt="Bright studio desk where Studio24 pages get built"
                      onError={() => setImgOk(false)}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <figcaption className="px-6 py-4 text-sm text-[#1C1A17]/55">
                  Built in a day, from this desk.
                </figcaption>
              </figure>
            </div>

            <form
              onSubmit={submit}
              className="foot-card flex h-full flex-col rounded-2xl bg-white p-8 ring-1 ring-black/10 shadow-[0_24px_60px_-40px_rgba(28,26,23,0.3)] md:p-10 lg:sticky lg:top-24"
            >
              <p className="font-clash text-2xl font-semibold tracking-tight text-[#1C1A17]">Start your project</p>
              <p className="mt-1 text-sm text-[#1C1A17]/55">Opens your email app, addressed to me.</p>

              <div className="mt-7 space-y-5 pb-7">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-semibold text-[#1C1A17]">Name</label>
                  <input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl bg-[#FAF6EF] px-4 py-3.5 text-base min-[420px]:text-sm text-[#1C1A17] placeholder:text-[#1C1A17]/35 outline-none ring-1 ring-transparent transition-all duration-500 focus:bg-white focus:ring-[#2F4A3C]/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-semibold text-[#1C1A17]">Email</label>
                  <input
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl bg-[#FAF6EF] px-4 py-3.5 text-base min-[420px]:text-sm text-[#1C1A17] placeholder:text-[#1C1A17]/35 outline-none ring-1 ring-transparent transition-all duration-500 focus:bg-white focus:ring-[#2F4A3C]/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-brief" className="text-sm font-semibold text-[#1C1A17]">Project</label>
                  <textarea
                    id="contact-brief"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="What are we selling?"
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl bg-[#FAF6EF] px-4 py-3.5 text-base min-[420px]:text-sm text-[#1C1A17] placeholder:text-[#1C1A17]/35 outline-none ring-1 ring-transparent transition-all duration-500 focus:bg-white focus:ring-[#2F4A3C]/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-auto inline-flex cursor-pointer items-center gap-3 self-start rounded-full bg-[#1C1A17] py-2 pl-6 pr-2 text-sm font-bold text-[#FAF6EF] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#2F4A3C] hover:shadow-[0_16px_40px_-16px_rgba(47,74,60,0.7)] active:scale-[0.98]"
              >
                Send inquiry
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[#FAF6EF] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1.5 group-hover:bg-[#FAF6EF] group-hover:text-[#1C1A17]">
                  →
                </span>
              </button>
            </form>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {sites.map((s, i) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="foot-card group flex items-center justify-between rounded-2xl bg-white px-6 py-5 ring-1 ring-black/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-[#2F4A3C]/30 hover:shadow-[0_20px_50px_-30px_rgba(47,74,60,0.35)]"
              >
                <span className="text-sm font-semibold text-[#1C1A17]/70 group-hover:text-[#1C1A17]">
                  <span className="mr-3 font-mono text-xs text-[#1C1A17]/30">0{i + 1}</span>
                  {s.name}
                </span>
                <span className="text-[#1C1A17]/30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-[#2F4A3C] group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full bg-[#FAF6EF] px-4 min-[380px]:px-6 md:px-10 pb-8 pt-2">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 md:flex-row md:items-center">
          <div className="font-clash flex items-baseline gap-1 font-semibold">
            <span className="text-lg text-[#1C1A17]">studio</span>
            <span className="text-lg text-[#2F4A3C]">24</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-[#1C1A17]/50">
            <a href="#work" className="transition-colors hover:text-[#1C1A17]">Work</a>
            <a href="#pricing" className="transition-colors hover:text-[#1C1A17]">Pricing</a>
            <a href="mailto:ansh@ship24.tech" className="transition-colors hover:text-[#1C1A17]">ansh@ship24.tech</a>
          </div>
          <p className="font-mono text-xs text-[#1C1A17]/35">© 2026 Studio24. $1000 flat, delivered in 24 hours.</p>
        </div>
      </footer>
    </div>
  );
}
