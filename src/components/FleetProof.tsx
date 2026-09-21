"use client";

import { useEffect, useState } from "react";
import { emptyFleetStats, type FleetStats } from "@/lib/fleet";
import { track } from "@/lib/analytics";

function fmt(n: number | null, suffix = "") {
  if (n == null) return "Armed";
  return `${n}${suffix}`;
}

export default function FleetProof() {
  const [stats, setStats] = useState<FleetStats>(emptyFleetStats);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public-stats")
      .then((res) => (res.ok ? res.json() : emptyFleetStats()))
      .then((data: FleetStats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStats(emptyFleetStats());
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="tracking" className="relative w-full bg-[#FAF6EF] px-4 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <h2
          className="font-clash font-semibold tracking-[-0.03em] leading-[1.0] text-[#1C1A17]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}
        >
          Live demos. Live tracking.
        </h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[#1C1A17]/65 md:text-lg">
          Every site I ship is on PostHog. Pageviews, clicks, scroll depth, and the conversion
          that matters for that business, so you can see how a page actually performs.
        </p>

        <div className="mt-12 rounded-2xl bg-white px-6 py-8 ring-1 ring-black/10 md:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr_1fr] md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#1C1A17]/40">
                Sites on PostHog
              </p>
              <p className="font-clash mt-2 text-5xl font-semibold tracking-tight text-[#1C1A17]">
                {stats.fleet.sites}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#1C1A17]/40">
                Sessions, 7 days
              </p>
              <p className="font-clash mt-2 text-4xl font-semibold tracking-tight text-[#1C1A17] md:text-5xl">
                {fmt(stats.fleet.sessions7d)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#1C1A17]/40">
                Fleet conversion
              </p>
              <p className="font-clash mt-2 text-4xl font-semibold tracking-tight text-[#1C1A17] md:text-5xl">
                {fmt(stats.fleet.conversionRate, "%")}
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-black/10">
          {stats.sites.map((site, i) => (
            <li
              key={site.slug}
              className={i === 0 ? "" : "border-t border-black/10"}
            >
              <a
                href={site.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("portfolio_outbound_click", { site: site.slug, location: "fleet_proof" })
                }
                className="group flex flex-col gap-4 px-6 py-6 transition-colors hover:bg-[#FAF6EF]/70 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-clash text-2xl font-semibold tracking-tight text-[#1C1A17]">
                    {site.name}
                  </p>
                  <p className="mt-1 text-sm text-[#1C1A17]/55">{site.conversion}</p>
                </div>
                <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#2F4A3C]">
                  <span>Sessions {fmt(site.sessions7d)}</span>
                  <span>Scroll {fmt(site.avgScroll, "%")}</span>
                  <span>Conversion {fmt(site.conversionRate, "%")}</span>
                  <span className="text-[#1C1A17]/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[#2F4A3C]">
                    ↗
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {!stats.hydrated && (
          <p className="mt-5 font-mono text-xs text-[#1C1A17]/40">
            Tracking is live on every demo. Session and conversion numbers fill in as traffic lands.
          </p>
        )}
      </div>
    </section>
  );
}
