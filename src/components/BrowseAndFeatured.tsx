import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MagnifyingGlass,
  MapPin,
  ArrowRight,
  ShirtFolded,
  Recycle,
  HandHeart,
  Tote,
  Footprints,
  Baby,
  Car,
} from "@phosphor-icons/react";
import type { DonationItem, FilterCategory } from "../types";

const CATEGORIES: FilterCategory[] = [
  "All",
  "Women",
  "Men",
  "Kids",
  "Shoes",
  "Accessories",
];

const CATEGORY_ICONS: Record<string, typeof ShirtFolded> = {
  Women: ShirtFolded,
  Men: ShirtFolded,
  Kids: Baby,
  Shoes: Footprints,
  Accessories: Tote,
};

const CONDITION_COLORS: Record<string, string> = {
  New: "bg-[#2D4A3E] text-[#FAF8F5]",
  "Like New": "bg-[#2D4A3E]/12 text-[#2D4A3E]",
  "Gently Worn": "bg-[#C87D55]/15 text-[#A85A33]",
};

interface Props {
  items: DonationItem[];
  onOpenItem: (item: DonationItem) => void;
}

export default function BrowseAndFeatured({ items, onOpenItem }: Props) {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<FilterCategory>("All");
  const [query, setQuery] = useState("");

  const available = useMemo(() => items.filter((i) => i.available), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((i) => {
      const inCat = category === "All" || i.category === category;
      const inQuery =
        !q ||
        `${i.title} ${i.color} ${i.donor} ${i.location}`.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [available, category, query]);

  const featured = useMemo(() => available.filter((i) => i.featured).slice(0, 3), [available]);

  const steps = [
    {
      icon: ShirtFolded,
      title: "1. Bag it",
      desc: "Gather clean, good-quality clothing you no longer wear.",
    },
    {
      icon: Car,
      title: "2. Match it",
      desc: "Book a pickup or visit a drop-off point. We match to real needs.",
    },
    {
      icon: HandHeart,
      title: "3. Pass it on",
      desc: "A person or family receives it. You see the impact instantly.",
    },
  ];

  return (
    <>
      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#1C1D1A] md:text-4xl">
            Three simple steps, one warm circle
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
              className="group rounded-3xl border border-[#1C1D1A]/8 bg-[#FAF8F5] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(28,29,26,0.25)] md:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2D4A3E]/10 text-[#2D4A3E] transition-colors group-hover:bg-[#2D4A3E] group-hover:text-[#FAF8F5]">
                <s.icon size={22} weight="fill" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-[#1C1D1A]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#595B53]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured donations */}
      <section className="bg-[#F5F1EA]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-semibold tracking-tight text-[#1C1D1A] md:text-4xl">
                Featured donations
              </h2>
            </motion.div>
            <button
              onClick={() =>
                document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-1.5 text-sm font-semibold text-[#2D4A3E] transition-colors hover:text-[#1C1D1A]"
            >
              Browse everything <ArrowRight size={15} weight="bold" />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: "easeOut" }}
                onClick={() => onOpenItem(item)}
                className="group overflow-hidden rounded-3xl bg-[#FAF8F5] text-left shadow-[0_2px_12px_-4px_rgba(28,29,26,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(28,29,26,0.3)] active:scale-[0.99]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${CONDITION_COLORS[item.condition]}`}
                  >
                    {item.condition}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-[#1C1D1A]">{item.title}</h3>
                    <span className="shrink-0 rounded-full bg-[#2D4A3E]/10 px-2.5 py-1 text-xs font-medium text-[#2D4A3E]">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#7A7C72]">
                    <MapPin size={13} weight="fill" /> {item.location}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Browse catalog */}
      <section id="browse" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1C1D1A] md:text-4xl">
              Browse what's available
            </h2>
          </div>
          <div className="relative w-full max-w-sm">
            <MagnifyingGlass
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7C72]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by item, color, or neighborhood"
              className="w-full rounded-full border border-[#1C1D1A]/12 bg-[#FAF8F5] py-3 pl-11 pr-4 text-sm text-[#1C1D1A] outline-none transition-colors placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c] ?? ShirtFolded;
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex items-center gap-2 rounded-full px-4.5 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                  active
                    ? "bg-[#1C1D1A] px-5 py-2.5 text-[#FAF8F5]"
                    : "border border-[#1C1D1A]/12 bg-[#FAF8F5] text-[#595B53] hover:border-[#2D4A3E]/40 hover:text-[#2D4A3E]"
                }`}
              >
                {c !== "All" && <Icon size={15} />} {c}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-[#1C1D1A]/15 bg-[#FAF8F5] py-16 text-center">
            <Recycle size={32} className="text-[#2D4A3E]" />
            <p className="mt-4 text-lg font-semibold text-[#1C1D1A]">No items match yet</p>
            <p className="mt-1 max-w-sm text-sm text-[#7A7C72]">
              Try a different search or category. New donations land every week.
            </p>
            <button
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="mt-6 rounded-full bg-[#2D4A3E] px-6 py-2.5 text-sm font-semibold text-[#FAF8F5] transition-all hover:bg-[#1C1D1A] active:scale-[0.98]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: Math.min(idx % 4, 3) * 0.06, ease: "easeOut" }}
                onClick={() => onOpenItem(item)}
                className="group overflow-hidden rounded-3xl border border-[#1C1D1A]/8 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-20px_rgba(28,29,26,0.28)] active:scale-[0.99]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${CONDITION_COLORS[item.condition]}`}
                  >
                    {item.condition}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#1C1D1A]">{item.title}</h3>
                    <span className="shrink-0 rounded-full bg-[#C87D55]/12 px-2.5 py-0.5 text-xs font-medium text-[#A85A33]">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#7A7C72]">
                    <MapPin size={12} weight="fill" /> {item.location}
                  </p>
                  <p className="mt-1 text-xs text-[#9A9C92]">
                    Size {item.size} · {item.color}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}