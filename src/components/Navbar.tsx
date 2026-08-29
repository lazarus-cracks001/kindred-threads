import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, List, X, ArrowRight } from "@phosphor-icons/react";

interface NavbarProps {
  onDonate: () => void;
  onRequest: () => void;
  onAdmin: () => void;
}

const LINKS = [
  { label: "Browse", target: "browse" },
  { label: "How it works", target: "how" },
  { label: "Impact", target: "impact" },
  { label: "Stories", target: "stories" },
  { label: "FAQ", target: "faq" },
];

export default function Navbar({ onDonate, onRequest, onAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(28,29,26,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
          aria-label="ReThread home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D4A3E] text-[#FAF8F5]">
            <Heart size={17} weight="fill" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#1C1D1A]">
            ReThread
          </span>
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.target}
              onClick={() => go(l.target)}
              className="text-sm font-medium text-[#595B53] transition-colors hover:text-[#1C1D1A]"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            onClick={onAdmin}
            className="rounded-full px-4 py-2 text-sm font-medium text-[#2D4A3E] transition-colors hover:bg-[#2D4A3E]/10"
          >
            Admin
          </button>
          <button
            onClick={onDonate}
            className="flex items-center gap-1.5 rounded-full bg-[#1C1D1A] px-5 py-2.5 text-sm font-semibold text-[#FAF8F5] transition-all hover:-translate-y-0.5 hover:bg-[#2D4A3E] active:scale-[0.98]"
          >
            Donate now <ArrowRight size={15} weight="bold" />
          </button>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1C1D1A]/15 text-[#1C1D1A] lg:hidden"
          aria-label="Open menu"
        >
          <List size={20} />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#1C1D1A]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-[#FAF8F5] px-7 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D4A3E] text-[#FAF8F5]">
                  <Heart size={17} weight="fill" />
                </span>
                <span className="text-lg font-semibold tracking-tight text-[#1C1D1A]">
                  ReThread
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1C1D1A]/15"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.target}
                  onClick={() => go(l.target)}
                  className="rounded-xl px-4 py-3.5 text-left text-lg font-medium text-[#1C1D1A] transition-colors hover:bg-[#2D4A3E]/8"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onAdmin();
                }}
                className="rounded-xl px-4 py-3.5 text-left text-lg font-medium text-[#2D4A3E]"
              >
                Admin
              </button>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  onRequest();
                }}
                className="rounded-full border border-[#2D4A3E] px-5 py-3.5 text-base font-semibold text-[#2D4A3E] transition-all hover:bg-[#2D4A3E]/8 active:scale-[0.98]"
              >
                I need clothing
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onDonate();
                }}
                className="rounded-full bg-[#1C1D1A] px-5 py-3.5 text-base font-semibold text-[#FAF8F5] transition-all hover:bg-[#2D4A3E] active:scale-[0.98]"
              >
                Donate now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  );
}