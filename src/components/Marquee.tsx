export default function Marquee() {
  const items = ["24H DELIVERY", "$1000 FLAT", "BUILT TO CONVERT", "NEXT.JS + TAILWIND", "LIVE IN A DAY"];
  const row = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-black/10 bg-[#FFFDF8] py-5">
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="text-sm font-bold tracking-[0.22em] text-[#1C1A17]/70">{t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F4A3C]" />
          </span>
        ))}
      </div>
    </div>
  );
}
