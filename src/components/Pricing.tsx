"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { track } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const options = [
  {
    name: "The Landing Page",
    price: "$1000 flat",
    detail: "Custom design and build, live in 24 hours with one revision.",
    cta: "Book your build",
  },
  {
    name: "Something Bigger",
    price: "Custom quote",
    detail: "Multi-page sites and full builds, scoped on a 15-minute call.",
    cta: "Scope it on a call",
  },
];

export default function Pricing() {
  const root = useRef<HTMLElement>(null);
  const [imgOk, setImgOk] = useState(true);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".price-reveal",
          { y: 64, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: ".price-shell", start: "top 78%" },
          }
        );
      }, root);
      return () => ctx.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="pricing" className="relative w-full bg-[#FAF6EF] px-4 py-24 md:py-40">
      <div className="price-shell mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <figure className="price-reveal overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 shadow-[0_40px_100px_-60px_rgba(28,26,23,0.3)]">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#DDE7D8] via-[#FFFDF8] to-[#DDE6F0] lg:aspect-auto lg:min-h-full">
            {imgOk && (
                      <img
                        src="/pricing-main.png"
                alt="A Studio24 landing page on a bright desk"
                onError={() => setImgOk(false)}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </div>
          <figcaption className="px-6 py-4 text-sm text-[#1C1A17]/55">
            A $1000 launch, live the next day.
          </figcaption>
        </figure>

        <div className="flex flex-col justify-center rounded-2xl bg-[#FFFDF8] p-8 ring-1 ring-black/10 md:p-12">
          <h2 className="font-clash price-reveal font-semibold tracking-[-0.03em] leading-[0.98] text-[#1C1A17]" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
            One page. One price.
          </h2>

          <div className="mt-8 space-y-4">
            {options.map((o) => (
              <div
                key={o.name}
                className="price-reveal flex flex-col gap-5 rounded-2xl bg-white p-6 ring-1 ring-black/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-[#2F4A3C]/40 hover:shadow-[0_24px_60px_-30px_rgba(47,74,60,0.35)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-clash text-2xl font-semibold tracking-tight text-[#1C1A17]">{o.name}</p>
                  <p className="mt-1 text-sm font-bold text-[#2F4A3C]">{o.price}</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#1C1A17]/60">{o.detail}</p>
                </div>
                <a
                  href="https://cal.com/ansh-lachhwani"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("cal_book_click", { location: "pricing", cta: o.cta })}
                  className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#1C1A17] py-2 pl-6 pr-2 text-sm font-bold text-[#FAF6EF] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#2F4A3C] active:scale-[0.98]"
                >
                  {o.cta}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                    ↗
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
