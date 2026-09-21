"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { track } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  index: string;
  name: string;
  slug: string;
  category: string;
  detail: string;
  tracks: string;
  src: string;
  href: string;
};

const projects: Project[] = [
  {
    index: "01",
    name: "Cluck Royale",
    slug: "cluck-royale",
    category: "Fried chicken / Commerce",
    detail: "Playful ordering flow, sauce system, built for cravings.",
    tracks: "Order intent, phone, sauce picks, scroll depth",
    src: "/work-cluck-royale.jpg",
    href: "https://cluck-royale-vert.vercel.app/",
  },
  {
    index: "02",
    name: "Pizza Palace",
    slug: "pizza-palace",
    category: "Restaurant / Cinematic",
    detail: "Wood-fired story, menu engineering, order-first layout.",
    tracks: "Pickup calls, visit intent, scroll depth",
    src: "/work-pizza-palace.png",
    href: "https://pizza-palace-liart.vercel.app/",
  },
  {
    index: "03",
    name: "Swastik Jewels",
    slug: "swastik-jewels",
    category: "Jewellery / Luxury",
    detail: "Editorial product system, high-trust luxury pacing.",
    tracks: "Add to bag, newsletter, appointment, scroll depth",
    src: "/work-swastik.jpg",
    href: "https://swastik-jewels.vercel.app/",
  },
  {
    index: "04",
    name: "Chinese Heaven",
    slug: "chinese-heaven",
    category: "Restaurant / Heritage",
    detail: "Heritage craft, dish-led storytelling, reservations.",
    tracks: "Reservation request, Resy, phone, scroll depth",
    src: "/work-chinese-heaven.jpg",
    href: "https://chinese-heaven.vercel.app/",
  },
];

function Panel({ p, active }: { p: Project; active: string | null }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <a
      ref={ref}
      href={p.href}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("portfolio_outbound_click", { site: p.slug, location: "work_index" })}
      onMouseMove={onMove}
      onMouseEnter={(e) => {
        ref.current?.classList.add("is-active");
        onMove(e as unknown as React.MouseEvent);
      }}
      onMouseLeave={() => ref.current?.classList.remove("is-active")}
      className="dual-tone h-panel group relative block w-[82vw] shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_30px_80px_-40px_rgba(28,26,23,0.35)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-[#2F4A3C]/30 hover:shadow-[0_40px_100px_-40px_rgba(47,74,60,0.4)] sm:w-[62vw] lg:w-[44vw] xl:w-[38vw]"
    >
      <div className="relative h-[46vh] w-full overflow-hidden md:h-[52vh]">
        <Image
          src={p.src}
          alt={p.name}
          fill
          sizes="(max-width: 768px) 82vw, 44vw"
          className="dual-tone-base h-img object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <Image
          src={p.src}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 768px) 82vw, 44vw"
          className="dual-tone-top h-img object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1A17]/25 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-3">
          <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 font-mono text-[11px] tracking-widest text-[#1C1A17]/70 backdrop-blur">
            {p.index} / 04
          </span>
          <span className="rounded-full bg-[#2F4A3C] px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-[#FAF6EF]">
            LIVE
          </span>
        </div>
        <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1A17] text-[#FAF6EF] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#2F4A3C] group-hover:rotate-45">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 p-6 md:p-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2F4A3C]">{p.category}</p>
          <h3 className="font-clash mt-2 text-3xl font-semibold tracking-tight text-[#1C1A17] md:text-4xl">{p.name}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#1C1A17]/60">{p.detail}</p>
          <p className="mt-3 max-w-sm font-mono text-[11px] leading-relaxed tracking-wide text-[#2F4A3C]/80">
            Tracking: {p.tracks}
          </p>
        </div>
      </div>

      {active === p.index && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#2F4A3C]/40" />
      )}
    </a>
  );
}

export default function WorkIndex() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Intro reveals
      gsap.fromTo(
        ".work-head-line",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".work-intro", start: "top 78%" },
        }
      );

      // Desktop: pinned horizontal scroll
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const getScroll = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getScroll() * 1.35}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(
                projects.length,
                Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1)
              );
              setCount(i);
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Light parallax inside each image — x drift only, no scale thrash
        gsap.utils.toArray<HTMLElement>(".h-panel").forEach((panel) => {
          gsap.fromTo(
            panel.querySelectorAll(".h-img"),
            { xPercent: -4 },
            {
              xPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);

        return () => {
          window.removeEventListener("load", onLoad);
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === pin) st.kill();
          });
          tween.kill();
        };
      });

      // Mobile: simple batch reveal, native vertical stack
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".h-panel").forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 50, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 88%" },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const [active, setActive] = useState<string | null>(null);

  return (
    <section ref={root} id="work" className="relative w-full bg-[#FAF6EF]">
      <div className="work-intro mx-auto w-full max-w-7xl px-4 min-[380px]:px-6 pt-24 md:pt-40 pb-10">
        <p className="work-head-line w-fit rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#2F4A3C] ring-1 ring-[#2F4A3C]/25 bg-[#2F4A3C]/5">
          Selected work
        </p>
        <h2 className="font-clash mt-4 max-w-5xl font-semibold tracking-[-0.03em] leading-[1.0] text-[#1C1A17]" style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}>
          <span className="work-head-line block">Shipped work.</span>
          <span className="work-head-line block text-[#1C1A17]/40">Live right now.</span>
        </h2>
        <div className="work-head-line mt-6 flex items-center gap-4 text-sm text-[#1C1A17]/50">
          <span className="hidden font-mono text-xs md:block">Scroll to travel horizontally</span>
          <span className="hidden h-px w-16 bg-black/15 md:block" />
          <span className="font-mono text-xs md:hidden">Swipe through the work</span>
        </div>
      </div>

      <div ref={pinRef} className="relative flex h-auto flex-col justify-center overflow-hidden md:h-screen">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-5 px-4 min-[380px]:px-6 will-change-transform md:w-max md:flex-row md:items-stretch md:gap-7 md:px-[8vw]"
        >
          {projects.map((p) => (
            <div key={p.index} onMouseEnter={() => setActive(p.index)} onMouseLeave={() => setActive(null)}>
              <Panel p={p} active={active} />
            </div>
          ))}

          {/* End card */}
          <a
            href="#pricing"
            className="group flex w-[82vw] shrink-0 flex-col justify-between rounded-2xl bg-[#2F4A3C] p-8 text-[#FAF6EF] shadow-[0_30px_80px_-40px_rgba(47,74,60,0.6)] sm:w-[62vw] lg:w-[30vw]"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-60">Your turn</p>
            <p className="font-clash mt-6 text-4xl font-semibold tracking-tight leading-[1.02] md:text-5xl">
              Yours ships next.
            </p>
            <span className="mt-10 inline-flex w-fit items-center gap-4 rounded-full bg-[#FAF6EF] py-2 pl-6 pr-2 text-sm font-bold text-[#1C1A17] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
              Start your project
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </div>

        <div className="mx-auto mt-10 hidden w-full max-w-7xl items-center gap-6 px-6 md:flex md:px-[8vw]">
          <span className="font-mono text-xs text-[#1C1A17]/50">0{count} / 04</span>
          <div className="h-px flex-1 bg-black/10">
            <div ref={barRef} className="h-px origin-left bg-[#2F4A3C]" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="font-mono text-xs text-[#1C1A17]/50">Drag through scroll</span>
        </div>
      </div>
    </section>
  );
}
