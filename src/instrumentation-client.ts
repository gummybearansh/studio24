import posthog from "posthog-js";

const SITE = "studio24";
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

function setupScrollDepth() {
  const marks = [25, 50, 75, 90, 100] as const;
  const fired = new Set<number>();
  let ticking = false;

  const measure = () => {
    ticking = false;
    const el = document.documentElement;
    const scrollable = el.scrollHeight - window.innerHeight;
    const pct =
      scrollable <= 0
        ? 100
        : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    for (const mark of marks) {
      if (pct >= mark && !fired.has(mark)) {
        fired.add(mark);
        posthog.capture("scroll_depth", { percent: mark, site: SITE });
      }
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(measure);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  measure();
}

if (token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    loaded(ph) {
      ph.register({ site: SITE });
      setupScrollDepth();
    },
  });
}
