export type SiteSlug =
  | "studio24"
  | "cluck-royale"
  | "pizza-palace"
  | "swastik-jewels"
  | "chinese-heaven";

export type SiteStat = {
  slug: SiteSlug;
  name: string;
  href: string;
  conversion: string;
  sessions7d: number | null;
  avgScroll: number | null;
  conversionRate: number | null;
};

export type FleetStats = {
  live: boolean;
  hydrated: boolean;
  generatedAt: string;
  fleet: {
    sites: number;
    sessions7d: number | null;
    conversionRate: number | null;
  };
  sites: SiteStat[];
};

export const FLEET_SITES: Omit<
  SiteStat,
  "sessions7d" | "avgScroll" | "conversionRate"
>[] = [
  {
    slug: "cluck-royale",
    name: "Cluck Royale",
    href: "https://cluck-royale-vert.vercel.app/",
    conversion: "Order intent and phone",
  },
  {
    slug: "pizza-palace",
    name: "Pizza Palace",
    href: "https://pizza-palace-liart.vercel.app/",
    conversion: "Pickup calls",
  },
  {
    slug: "swastik-jewels",
    name: "Swastik Jewels",
    href: "https://swastik-jewels.vercel.app/",
    conversion: "Add to bag and newsletter",
  },
  {
    slug: "chinese-heaven",
    name: "Chinese Heaven",
    href: "https://chinese-heaven.vercel.app/",
    conversion: "Reservation request and Resy",
  },
];

export const CONVERSION_EVENTS: Record<SiteSlug, string[]> = {
  studio24: ["cal_book_click", "lead_form_submit"],
  "cluck-royale": ["order_intent", "phone_click"],
  "pizza-palace": ["phone_click", "order_intent"],
  "swastik-jewels": ["add_to_bag", "newsletter_submit"],
  "chinese-heaven": ["reservation_request", "resy_click"],
};

export function emptyFleetStats(): FleetStats {
  return {
    live: true,
    hydrated: false,
    generatedAt: new Date().toISOString(),
    fleet: {
      sites: FLEET_SITES.length + 1,
      sessions7d: null,
      conversionRate: null,
    },
    sites: FLEET_SITES.map((site) => ({
      ...site,
      sessions7d: null,
      avgScroll: null,
      conversionRate: null,
    })),
  };
}
