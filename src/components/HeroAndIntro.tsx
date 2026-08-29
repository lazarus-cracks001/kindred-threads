import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart, Sparkle } from "@phosphor-icons/react";
import { IMG, DEFAULT_STATS } from "../data";

interface HeroProps {
  onDonate: () => void;
  onRequest: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

export default function HeroAndIntro({ onDonate, onRequest }: HeroProps) {
  const reduce = useReducedMotion();
  const stats = [
    { label: "Items donated", value: DEFAULT_STATS.itemsDonated.toLocaleString() },
    { label: "People supported", value: DEFAULT_STATS.peopleSupported.toLocaleString() },
    { label: "Kg diverted from landfill", value: DEFAULT_STATS.kgDiverted.toLocaleString() },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F5F1EA] pt-24 md:pt-28">
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#C87D55]/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#2D4A3E]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-24">
        <div className="max-w-xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2D4A3E]/20 bg-[#FAF8F5]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#2D4A3E]"
          >
            <Sparkle size={14} /> Circular wardrobes, real communities
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[2.6rem] font-semibold leading-[1.04] tracking-tighter text-[#1C1D1A] md:text-6xl lg:text-[4.4rem]"
          >
            Give clothes a
            <span className="text-[#2D4A3E]"> second life</span>.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-[46ch] text-base leading-relaxed text-[#595B53] md:text-lg"
          >
            What you no longer need can still mean something to someone else.
            Donate with one tap, or request what you need with dignity.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <button
              onClick={onDonate}
              className="group flex items-center gap-2 rounded-full bg-[#1C1D1A] px-7 py-3.5 text-base font-semibold text-[#FAF8F5] transition-all hover:-translate-y-0.5 hover:bg-[#2D4A3E] active:scale-[0.98]"
            >
              Donate clothes
              <ArrowRight
                size={17}
                weight="bold"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={onRequest}
              className="flex items-center gap-2 rounded-full border border-[#2D4A3E]/30 bg-[#FAF8F5]/60 px-7 py-3.5 text-base font-semibold text-[#2D4A3E] transition-all hover:-translate-y-0.5 hover:border-[#2D4A3E] hover:bg-white active:scale-[0.98]"
            >
              <Heart size={17} weight="fill" /> I need clothing
            </button>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold tracking-tight text-[#1C1D1A] md:text-3xl">
                  {s.value}+
                </p>
                <p className="mt-0.5 text-xs text-[#7A7C72] md:text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(28,29,26,0.35)]">
            <img
              src={IMG.hero}
              alt="Neatly folded knitwear awaiting its next home"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1D1A]/15 to-transparent" />
          </div>
          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-[#1C1D1A]/8 bg-[#FAF8F5] px-5 py-3.5 shadow-[0_12px_32px_-12px_rgba(28,29,26,0.28)] md:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D4A3E] text-[#FAF8F5]">
              <Heart size={18} weight="fill" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1C1D1A]">1,284 items</p>
              <p className="text-xs text-[#7A7C72]">matched this month</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Editorial statement */}
      <div className="relative border-t border-[#1C1D1A]/8 bg-[#FAF8F5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="overflow-hidden rounded-[2rem]"
          >
            <img
              src={IMG.sharing}
              alt="A donor handing a folded shirt to a neighbor"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="max-w-lg text-3xl font-semibold leading-[1.12] tracking-tight text-[#1C1D1A] md:text-5xl">
              What you no longer need can still mean something to{" "}
              <span className="text-[#2D4A3E]">someone else</span>.
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-[#595B53] md:text-lg">
              ReThread is a community wardrobe. Good-quality clothing moves
              from closets that have outgrown it to people, families, schools,
              and verified organizations that will wear it with pride. Simple,
              dignified, and circular.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Heart, label: "Donate", desc: "In minutes" },
                { icon: Sparkle, label: "Match", desc: "To real needs" },
                { icon: ArrowRight, label: "Impact", desc: "Visible always" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl border border-[#1C1D1A]/8 bg-[#F5F1EA] p-4 md:p-5"
                >
                  <f.icon size={20} className="text-[#2D4A3E]" weight="fill" />
                  <p className="mt-3 text-sm font-semibold text-[#1C1D1A]">{f.label}</p>
                  <p className="text-xs text-[#7A7C72]">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}