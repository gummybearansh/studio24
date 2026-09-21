import { NextResponse } from "next/server";
import {
  CONVERSION_EVENTS,
  emptyFleetStats,
  FLEET_SITES,
  type FleetStats,
  type SiteSlug,
} from "@/lib/fleet";

export const revalidate = 120;

type HogQLResponse = {
  results?: unknown[][];
};

async function hogql(query: string): Promise<unknown[][] | null> {
  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  if (!key || !projectId) return null;

  const host = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com")
    .replace("https://us.i.posthog.com", "https://us.posthog.com")
    .replace("https://eu.i.posthog.com", "https://eu.posthog.com");

  const res = await fetch(`${host}/api/projects/${projectId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query },
    }),
    next: { revalidate: 120 },
  });

  if (!res.ok) return null;
  const json = (await res.json()) as HogQLResponse;
  return json.results ?? [];
}

function rate(conversions: number, sessions: number) {
  if (!sessions) return null;
  return Math.round((conversions / sessions) * 1000) / 10;
}

export async function GET() {
  const fallback = emptyFleetStats();

  try {
    const [sessionRows, scrollRows, conversionRows] = await Promise.all([
      hogql(`
        SELECT properties.site AS site, uniqExact(distinct_id) AS visitors
        FROM events
        WHERE timestamp > now() - INTERVAL 7 DAY
          AND event IN ('$pageview', 'scroll_depth', 'cta_click')
        GROUP BY site
      `),
      hogql(`
        SELECT properties.site AS site, avg(toFloat(properties.percent)) AS avg_scroll
        FROM events
        WHERE timestamp > now() - INTERVAL 7 DAY
          AND event = 'scroll_depth'
        GROUP BY site
      `),
      hogql(`
        SELECT properties.site AS site, event, count() AS n
        FROM events
        WHERE timestamp > now() - INTERVAL 7 DAY
          AND event IN (
            'cal_book_click', 'lead_form_submit', 'order_intent', 'phone_click',
            'add_to_bag', 'newsletter_submit', 'reservation_request', 'resy_click'
          )
        GROUP BY site, event
      `),
    ]);

    if (!sessionRows && !scrollRows && !conversionRows) {
      return NextResponse.json(fallback);
    }

    const sessions = new Map<string, number>();
    for (const row of sessionRows ?? []) {
      sessions.set(String(row[0]), Number(row[1]) || 0);
    }

    const scrolls = new Map<string, number>();
    for (const row of scrollRows ?? []) {
      scrolls.set(String(row[0]), Math.round(Number(row[1]) || 0));
    }

    const conversions = new Map<string, number>();
    for (const row of conversionRows ?? []) {
      const site = String(row[0]) as SiteSlug;
      const event = String(row[1]);
      const n = Number(row[2]) || 0;
      const allowed = CONVERSION_EVENTS[site];
      if (!allowed?.includes(event)) continue;
      conversions.set(site, (conversions.get(site) ?? 0) + n);
    }

    const sites = FLEET_SITES.map((site) => {
      const sessions7d = sessions.get(site.slug) ?? 0;
      const conversionCount = conversions.get(site.slug) ?? 0;
      return {
        ...site,
        sessions7d: sessions.has(site.slug) ? sessions7d : null,
        avgScroll: scrolls.get(site.slug) ?? null,
        conversionRate: sessions.has(site.slug) ? rate(conversionCount, sessions7d) : null,
      };
    });

    const fleetSessions = sites.reduce((sum, s) => sum + (s.sessions7d ?? 0), 0);
    const fleetConversions = FLEET_SITES.reduce(
      (sum, s) => sum + (conversions.get(s.slug) ?? 0),
      0
    );
    const hydrated = sites.some(
      (s) => s.sessions7d != null || s.avgScroll != null || s.conversionRate != null
    );

    const stats: FleetStats = {
      live: true,
      hydrated,
      generatedAt: new Date().toISOString(),
      fleet: {
        sites: FLEET_SITES.length + 1,
        sessions7d: hydrated ? fleetSessions : null,
        conversionRate: hydrated ? rate(fleetConversions, fleetSessions) : null,
      },
      sites,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(fallback);
  }
}
