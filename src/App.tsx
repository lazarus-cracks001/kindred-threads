import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  Heart,
  ArrowRight,
  Recycle,
  HandHeart,
  Globe,
  TreeEvergreen,
  MapPin,
  Sparkle,
  Check,
  X,
  ArrowUp,
  Plus,
} from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import HeroAndIntro from "./components/HeroAndIntro";
import BrowseAndFeatured from "./components/BrowseAndFeatured";
import ModalsAndForms, { type ModalKind } from "./components/ModalsAndForms";
import {
  DEFAULT_ITEMS,
  DEFAULT_REQUESTS,
  DEFAULT_STATS,
  PARTNERS,
  FAQs,
  STORIES,
} from "./data";
import type {
  DonationItem,
  ClothingRequest,
  ImpactStats,
  DonationFormPayload,
  RequestFormPayload,
} from "./types";

const LS = {
  items: "rethread.items",
  requests: "rethread.requests",
  stats: "rethread.stats",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable, keep in memory */
  }
}

export default function App() {
  const reduce = useReducedMotion();
  const [items, setItems] = useState<DonationItem[]>(() =>
    load(LS.items, DEFAULT_ITEMS),
  );
  const [requests, setRequests] = useState<ClothingRequest[]>(() =>
    load(LS.requests, DEFAULT_REQUESTS),
  );
  const [stats, setStats] = useState<ImpactStats>(() =>
    load(LS.stats, DEFAULT_STATS),
  );
  const [modal, setModal] = useState<ModalKind>("none");
  const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => save(LS.items, items), [items]);
  useEffect(() => save(LS.requests, requests), [requests]);
  useEffect(() => save(LS.stats, stats), [stats]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDonate = useCallback(() => {
    setSelectedItem(null);
    setModal("donate");
  }, []);
  const openRequest = useCallback(() => {
    setSelectedItem(null);
    setModal("request");
  }, []);
  const openAdmin = useCallback(() => {
    setSelectedItem(null);
    setModal("admin");
  }, []);
  const closeModal = useCallback(() => {
    setModal("none");
    setSelectedItem(null);
  }, []);

  const handleDonateSubmit = useCallback(
    (payload: DonationFormPayload) => {
      const newItem: DonationItem = {
        id: `it-${Date.now()}`,
        title: payload.notes
          ? `${payload.category} donation (${payload.quantity}×)`
          : `${payload.category} clothing (${payload.quantity}×)`,
        category: payload.category === "All" ? "Women" : payload.category,
        condition: payload.condition,
        size: payload.size,
        color: "Various",
        image: payload.image ?? IMG_FALLBACK(payload.category),
        location: payload.area || "Your area",
        donor: payload.name,
        story: payload.notes || "Gifted with care.",
        available: true,
        createdAt: new Date().toISOString(),
      };
      setItems((prev) => [newItem, ...prev]);
      setStats((prev) => ({
        ...prev,
        itemsDonated: prev.itemsDonated + payload.quantity,
        peopleSupported: prev.peopleSupported + 1,
        kgDiverted: prev.kgDiverted + payload.quantity * 2.5,
      }));
      toast.success("Donation received. Thank you for giving.", {
        description: "We will confirm pickup or drop-off within 24 hours.",
      });
    },
    [],
  );

  const handleRequestSubmit = useCallback((payload: RequestFormPayload) => {
    const newRequest: ClothingRequest = {
      id: `req-${Date.now()}`,
      type: payload.type,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      needs: payload.needs,
      sizes: payload.sizes,
      priority: payload.priority,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [newRequest, ...prev]);
    toast.success("Request submitted with dignity.", {
      description: "Our team will be in touch once a match is found.",
    });
  }, []);

  const handleClaim = useCallback(
    (item: DonationItem) => {
      setSelectedItem(null);
      setModal("request");
      toast.info(`Claiming: ${item.title}`, {
        description: "Tell us what you need and we will hold it for you.",
      });
    },
    [],
  );

  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)),
    );
  }, []);

  const updateRequest = useCallback(
    (id: string, status: ClothingRequest["status"]) => {
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      if (status === "Approved") {
        setStats((prev) => ({ ...prev, peopleSupported: prev.peopleSupported + 1 }));
      }
    },
    [],
  );

  const resetDemo = useCallback(() => {
    setItems(DEFAULT_ITEMS);
    setRequests(DEFAULT_REQUESTS);
    setStats(DEFAULT_STATS);
    toast("Demo data restored.");
  }, []);

  const pillars = useMemo(
    () => [
      {
        icon: Recycle,
        title: "Reuse",
        desc: "Every item worn again saves the water, energy, and emissions of making a new one.",
      },
      {
        icon: HandHeart,
        title: "Share",
        desc: "Clothing moves between neighbors through trust, not transactions.",
      },
      {
        icon: TreeEvergreen,
        title: "Reduce",
        desc: "Less textile waste, less landfill, fewer new clothes manufactured.",
      },
    ],
    [],
  );

  const adminStats = useMemo(
    () => [
      { label: "Items donated", value: stats.itemsDonated },
      { label: "People supported", value: stats.peopleSupported },
      { label: "Kg diverted", value: stats.kgDiverted },
      { label: "Pickup cities", value: stats.pickupCities },
    ],
    [stats],
  );

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          hidden: { opacity: 0, y: 28 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" as const } },
        };

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#1C1D1A] antialiased">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1C1D1A",
            color: "#FAF8F5",
            borderRadius: "1rem",
            fontSize: "0.875rem",
          },
        }}
      />
      <Navbar onDonate={openDonate} onRequest={openRequest} onAdmin={openAdmin} />

      <main>
        <HeroAndIntro onDonate={openDonate} onRequest={openRequest} />
        <BrowseAndFeatured items={items} onOpenItem={setSelectedItem} />

        {/* Impact metrics */}
        <section id="impact" className="bg-[#2D4A3E] text-[#FAF8F5]">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="inline-flex items-center gap-2 rounded-full border border-[#FAF8F5]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8D8C4]">
                  <Sparkle size={13} /> Real impact, always visible
                </p>
                <h2 className="mt-5 max-w-md text-3xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
                  Small wardrobes, growing communities
                </h2>
                <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[#C9D6CE]">
                  Every number below updates live from real donations flowing
                  through our network of neighbors, schools, churches, and
                  verified community organizations.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                {adminStats.slice(0, 4).map((s, idx) => (
                  <motion.div
                    key={s.label}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                    className="rounded-3xl border border-[#FAF8F5]/12 bg-[#FAF8F5]/6 p-6 md:p-7"
                  >
                    <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {s.value.toLocaleString()}
                    </p>
                    <p className="mt-1.5 text-xs text-[#C9D6CE] md:text-sm">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sustainability pillars */}
            <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-5">
              {pillars.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  className="group rounded-3xl border border-[#FAF8F5]/12 bg-[#FAF8F5]/6 p-7 transition-all duration-300 hover:bg-[#FAF8F5]/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF8F5]/12 text-[#E8D8C4] transition-colors group-hover:bg-[#C87D55] group-hover:text-[#FAF8F5]">
                    <p.icon size={22} weight="fill" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#C9D6CE]">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community stories */}
        <section id="stories" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 max-w-2xl"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-[#1C1D1A] md:text-4xl">
              Worn by someone, treasured by someone else
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {STORIES.map((story, idx) => (
              <motion.figure
                key={story.name}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                className="overflow-hidden rounded-[2rem] bg-[#F5F1EA] md:flex"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  loading="lazy"
                  className="h-56 w-full object-cover md:h-auto md:w-2/5"
                />
                <figcaption className="flex flex-1 flex-col justify-center p-7 md:p-9">
                  <Heart size={20} weight="fill" className="text-[#C87D55]" />
                  <blockquote className="mt-4 text-lg font-medium leading-relaxed text-[#1C1D1A]">
                    "{story.quote}"
                  </blockquote>
                  <figcaption className="mt-4">
                    <p className="text-sm font-semibold text-[#2D4A3E]">{story.name}</p>
                    <p className="text-xs text-[#7A7C72]">{story.role}</p>
                  </figcaption>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* Verified partners */}
        <section className="border-y border-[#1C1D1A]/8 bg-[#F5F1EA]">
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <p className="text-sm text-[#7A7C72]">
                Every organization is vetted before it receives donations.
              </p>
            </motion.div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARTNERS.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.07, ease: "easeOut" }}
                  className="rounded-3xl border border-[#1C1D1A]/8 bg-[#FAF8F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-18px_rgba(28,29,26,0.22)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D4A3E]/10 text-[#2D4A3E]">
                      <Globe size={19} />
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-[#2D4A3E]/10 px-2.5 py-1 text-[10px] font-semibold text-[#2D4A3E]">
                      <Check size={10} weight="bold" /> Verified
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[#1C1D1A]">{p.name}</h3>
                  <p className="mt-1 text-sm text-[#7A7C72]">{p.tagline}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-[#9A9C92]">
                    <MapPin size={12} weight="fill" /> {p.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-[#1C1D1A] md:text-4xl">
              Everything you might wonder
            </h2>
          </motion.div>

          <div className="mt-10 flex flex-col gap-3">
            {FAQs.map((f, idx) => (
              <FaqRow key={f.question} faq={f} index={idx} />
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-[#2D4A3E] text-[#FAF8F5]">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#C87D55]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#FAF8F5]/8 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FAF8F5]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8D8C4]">
                <Heart size={13} weight="fill" className="text-[#C87D55]" /> Join the circle
              </span>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                Someone's favorite shirt is waiting
                <br className="hidden md:block" /> for its next chapter.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-[#C9D6CE]">
                Whether you are passing something on or picking something up,
                you are part of a kinder, more circular wardrobe.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3.5">
                <button
                  onClick={openDonate}
                  className="flex items-center gap-2 rounded-full bg-[#FAF8F5] px-7 py-3.5 text-base font-semibold text-[#1C1D1A] transition-all hover:-translate-y-0.5 hover:bg-[#E8D8C4] active:scale-[0.98]"
                >
                  Donate clothes <ArrowRight size={17} weight="bold" />
                </button>
                <button
                  onClick={openRequest}
                  className="flex items-center gap-2 rounded-full border border-[#FAF8F5]/30 px-7 py-3.5 text-base font-semibold text-[#FAF8F5] transition-all hover:-translate-y-0.5 hover:border-[#FAF8F5] active:scale-[0.98]"
                >
                  <HandHeart size={17} weight="fill" /> I need clothing
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1C1D1A] text-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D4A3E] text-[#FAF8F5]">
                  <Heart size={17} weight="fill" />
                </span>
                <span className="text-lg font-semibold tracking-tight">ReThread</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#9A9C92]">
                A community wardrobe where good clothing finds its next
                chapter with dignity, trust, and care.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A7C72]">
                  Give
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-[#C9D6CE]">
                  <li><button onClick={openDonate} className="transition-colors hover:text-[#FAF8F5]">Donate clothes</button></li>
                  <li><button onClick={openAdmin} className="transition-colors hover:text-[#FAF8F5]">Admin</button></li>
                  <li><button onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-[#FAF8F5]">How it works</button></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A7C72]">
                  Receive
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-[#C9D6CE]">
                  <li><button onClick={openRequest} className="transition-colors hover:text-[#FAF8F5]">Request clothing</button></li>
                  <li><button onClick={() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-[#FAF8F5]">Browse wardrobe</button></li>
                  <li><button onClick={() => document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-[#FAF8F5]">Our impact</button></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A7C72]">
                  Community
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-[#C9D6CE]">
                  <li><button onClick={() => document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-[#FAF8F5]">Stories</button></li>
                  <li><button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-[#FAF8F5]">FAQ</button></li>
                  <li><a href="mailto:hello@rethread.org" className="transition-colors hover:text-[#FAF8F5]">hello@rethread.org</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#FAF8F5]/10 pt-6 text-xs text-[#7A7C72] sm:flex-row">
            <p>© {new Date().getFullYear()} ReThread. Made with care, worn with dignity.</p>
            <p>Nairobi · Kampala · Dar es Salaam · Kigali</p>
          </div>
        </div>
      </footer>

      {/* Floating donate button */}
      <motion.button
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
        onClick={openDonate}
        className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#C87D55] px-6 py-3.5 text-sm font-semibold text-[#FAF8F5] shadow-[0_16px_40px_-12px_rgba(200,125,85,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#2D4A3E] active:scale-[0.97] lg:hidden"
      >
        <Heart size={16} weight="fill" /> Donate now
      </motion.button>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#1C1D1A]/10 bg-[#FAF8F5]/90 text-[#1C1D1A] shadow-lg backdrop-blur transition-all hover:bg-[#2D4A3E] hover:text-[#FAF8F5] active:scale-[0.95]"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <ModalsAndForms
        kind={modal}
        item={selectedItem}
        onClose={closeModal}
        onDonateSubmit={handleDonateSubmit}
        onRequestSubmit={handleRequestSubmit}
        onClaim={handleClaim}
        onDonateOpen={openDonate}
        onAdminOpen={openAdmin}
        items={items}
        requests={requests}
        stats={adminStats}
        onToggleItem={toggleItem}
        onUpdateRequest={updateRequest}
        onReset={resetDemo}
      />
    </div>
  );
}

/* ---------------- FAQ row ---------------- */

function FaqRow({ faq, index }: { faq: (typeof FAQs)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="overflow-hidden rounded-3xl border border-[#1C1D1A]/8 bg-[#FAF8F5]"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-7"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-[#1C1D1A]">{faq.question}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2D4A3E]/20 text-[#2D4A3E] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <PlusIcon />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-[#595B53] md:px-7">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PlusIcon() {
  return <Plus size={15} weight="bold" />;
}

/* ---------------- fallback image ---------------- */

function IMG_FALLBACK(category: string): string {
  const map: Record<string, string> = {
    Women: SWEATER_IMG,
    Men: SWEATER_IMG,
    Kids: SMALL_IMG,
    Shoes: SMALL_IMG,
    Accessories: SMALL_IMG,
  };
  return map[category] ?? SWEATER_IMG;
}

const SWEATER_IMG =
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/318afe8c-da1c-4739-88f0-40a50d6be90d/item-knit-sweater-259ffc3c-1788004051271.webp";
const SMALL_IMG =
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/318afe8c-da1c-4739-88f0-40a50d6be90d/item-linen-dress-ae47fc57-1788004051122.webp";