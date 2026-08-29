import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Check,
  ArrowRight,
  Heart,
  UploadSimple,
  SealCheck,
  Package,
  UsersThree,
  HandHeart,
  CheckCircle,
  Truck,
  ClipboardText,
} from "@phosphor-icons/react";
import type {
  DonationItem,
  ClothingRequest,
  FilterCategory,
  ItemCondition,
  DonationFormPayload,
  RequestFormPayload,
} from "../types";

/* ---------------- Donate Form ---------------- */

interface DonateFormProps {
  onSubmit: (payload: DonationFormPayload) => void;
}

const DONATE_CATEGORIES: FilterCategory[] = [
  "Women",
  "Men",
  "Kids",
  "Shoes",
  "Accessories",
];
const CONDITIONS: ItemCondition[] = ["New", "Like New", "Gently Worn"];

function DonateForm({ onSubmit }: DonateFormProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<FilterCategory>("Women");
  const [condition, setCondition] = useState<ItemCondition>("Like New");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [logistics, setLogistics] = useState<"Pickup" | "Drop-off">("Pickup");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const canNext =
    step === 1
      ? size.trim().length > 0
      : step === 2
        ? area.trim().length > 0
        : name.trim().length > 0 && email.includes("@");

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = () => {
    onSubmit({ category, quantity, condition, size, logistics, area, name, email, notes, image });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= s ? "bg-[#2D4A3E]" : "bg-[#1C1D1A]/10"
            }`}
          />
        ))}
        <span className="ml-2 text-xs font-semibold text-[#7A7C72]">Step {step} of 3</span>
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1C1D1A]">
            What are you donating?
          </h3>
          <p className="mt-1.5 text-sm text-[#595B53]">
            Clean, good-quality items in wearable condition.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
            {DONATE_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-2xl border px-3 py-3.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                  category === c
                    ? "border-[#2D4A3E] bg-[#2D4A3E] text-[#FAF8F5]"
                    : "border-[#1C1D1A]/12 bg-[#FAF8F5] text-[#595B53] hover:border-[#2D4A3E]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
                Condition
              </span>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="mt-1.5 w-full appearance-none rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none focus:border-[#2D4A3E] [&>option]:text-[#1C1D1A]"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
                Size (e.g. M, US 9, C26)
              </span>
              <input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="M"
                className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
              Quantity
            </span>
            <div className="mt-1.5 flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuantity(n)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition-all active:scale-[0.95] ${
                    quantity === n
                      ? "bg-[#1C1D1A] text-[#FAF8F5]"
                      : "border border-[#1C1D1A]/12 text-[#595B53] hover:border-[#2D4A3E]/40"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </label>

          <button
            onClick={() => canNext && setStep(2)}
            disabled={!canNext}
            className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-semibold transition-all ${
              canNext
                ? "bg-[#1C1D1A] text-[#FAF8F5] hover:bg-[#2D4A3E] active:scale-[0.99]"
                : "cursor-not-allowed bg-[#1C1D1A]/10 text-[#1C1D1A]/40"
            }`}
          >
            Continue <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1C1D1A]">
            How should we collect it?
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {(["Pickup", "Drop-off"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setLogistics(opt)}
                className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all active:scale-[0.98] ${
                  logistics === opt
                    ? "border-[#2D4A3E] bg-[#2D4A3E]/6"
                    : "border-[#1C1D1A]/12 bg-[#FAF8F5]"
                }`}
              >
                {opt === "Pickup" ? (
                  <Truck size={20} className="text-[#2D4A3E]" />
                ) : (
                  <Package size={20} className="text-[#2D4A3E]" />
                )}
                <span className="text-sm font-semibold text-[#1C1D1A]">{opt}</span>
                <span className="text-xs leading-relaxed text-[#7A7C72]">
                  {opt === "Pickup"
                    ? "We arrange a courier at a time that suits you."
                    : "Visit one of our partner drop-off points."}
                </span>
              </button>
            ))}
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
              Neighborhood / area
            </span>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Kilimani, Nairobi"
              className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
              Add a photo (optional)
            </span>
            <div className="mt-1.5 flex items-center gap-3">
              <label className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#1C1D1A]/20 bg-[#FAF8F5] transition-colors hover:border-[#2D4A3E]/50">
                {image ? (
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <UploadSimple size={22} className="text-[#7A7C72]" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
                />
              </label>
              <p className="max-w-[26ch] text-xs leading-relaxed text-[#7A7C72]">
                A clear photo helps us list your item faster.
              </p>
            </div>
          </label>

          <div className="mt-7 flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="rounded-full border border-[#1C1D1A]/15 px-6 py-3.5 text-base font-semibold text-[#1C1D1A] transition-all hover:bg-[#1C1D1A]/5 active:scale-[0.98]"
            >
              Back
            </button>
            <button
              onClick={() => canNext && setStep(3)}
              disabled={!canNext}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-base font-semibold transition-all ${
                canNext
                  ? "bg-[#1C1D1A] text-[#FAF8F5] hover:bg-[#2D4A3E] active:scale-[0.99]"
                  : "cursor-not-allowed bg-[#1C1D1A]/10 text-[#1C1D1A]/40"
              }`}
            >
              Continue <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1C1D1A]">
            Almost done
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
                Your name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@email.com"
                className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
              Donor note (optional)
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="A short note for the person who receives this..."
              className="mt-1.5 w-full resize-none rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
            />
          </label>

          <div className="mt-5 rounded-2xl bg-[#F5F1EA] p-4 text-sm text-[#595B53]">
            <p>
              <span className="font-semibold text-[#1C1D1A]">{quantity}×</span>{" "}
              {category} · {condition} · size {size} · {logistics} in {area || "your area"}
            </p>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="rounded-full border border-[#1C1D1A]/15 px-6 py-3.5 text-base font-semibold text-[#1C1D1A] transition-all hover:bg-[#1C1D1A]/5 active:scale-[0.98]"
            >
              Back
            </button>
            <button
              onClick={submit}
              disabled={!canNext}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-base font-semibold transition-all ${
                canNext
                  ? "bg-[#2D4A3E] text-[#FAF8F5] hover:bg-[#1C1D1A] active:scale-[0.99]"
                  : "cursor-not-allowed bg-[#1C1D1A]/10 text-[#1C1D1A]/40"
              }`}
            >
              <Heart size={17} weight="fill" /> Submit donation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Request Form ---------------- */

interface RequestFormProps {
  onSubmit: (payload: RequestFormPayload) => void;
}

const REQUEST_TYPES: ClothingRequest["type"][] = [
  "Individual",
  "Community Org",
  "School",
  "Church",
];

function RequestForm({ onSubmit }: RequestFormProps) {
  const [type, setType] = useState<ClothingRequest["type"]>("Individual");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [needs, setNeeds] = useState("");
  const [sizes, setSizes] = useState("");
  const [priority, setPriority] = useState("");

  const canSubmit = name.trim().length > 0 && email.includes("@") && needs.trim().length > 0;

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C87D55]/15 text-[#A85A33]">
          <HandHeart size={22} weight="fill" />
        </span>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1C1D1A]">
            Request clothing
          </h3>
          <p className="text-sm text-[#595B53]">
            Everyone deserves clothes that fit and feel good. No judgement, ever.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {REQUEST_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition-all active:scale-[0.97] ${
              type === t
                ? "border-[#2D4A3E] bg-[#2D4A3E] text-[#FAF8F5]"
                : "border-[#1C1D1A]/12 bg-[#FAF8F5] text-[#595B53] hover:border-[#2D4A3E]/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
            {type === "Individual" ? "Your name" : "Organization name"}
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === "Individual" ? "Full name" : "Organization"}
            className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
            Email / phone
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
          What do you need? (be specific)
        </span>
        <textarea
          value={needs}
          onChange={(e) => setNeeds(e.target.value)}
          rows={3}
          placeholder="e.g. Two warm sweaters (S/M) and one pair of closed shoes for my daughter..."
          className="mt-1.5 w-full resize-none rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
        />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
            Sizes needed
          </span>
          <input
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="e.g. S, M · C26 · US 9"
            className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
            Priority (optional)
          </span>
          <input
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="e.g. Before December 20"
            className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
          />
        </label>
      </div>

      {type !== "Individual" && (
        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#595B53]">
            Your role
          </span>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Coordinator, Head Teacher"
            className="mt-1.5 w-full rounded-2xl border border-[#1C1D1A]/12 bg-white px-4 py-3 text-sm text-[#1C1D1A] outline-none placeholder:text-[#9A9C92] focus:border-[#2D4A3E]"
          />
        </label>
      )}

      <button
        onClick={() => canSubmit && onSubmit({ type, name, email, role, needs, sizes, priority })}
        disabled={!canSubmit}
        className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-semibold transition-all ${
          canSubmit
            ? "bg-[#1C1D1A] text-[#FAF8F5] hover:bg-[#2D4A3E] active:scale-[0.99]"
            : "cursor-not-allowed bg-[#1C1D1A]/10 text-[#1C1D1A]/40"
        }`}
      >
        <HandHeart size={18} weight="fill" /> Submit request
      </button>
      <p className="mt-4 rounded-2xl bg-[#F5F1EA] p-4 text-xs leading-relaxed text-[#7A7C72]">
        Requests are reviewed by our community team and matched against available
        donations. Nothing about you is shared publicly without your consent.
      </p>
    </div>
  );
}

/* ---------------- Item Detail Modal ---------------- */

interface ItemDetailProps {
  item: DonationItem;
  onClaim: (item: DonationItem) => void;
}

function ItemDetail({ item, onClaim }: ItemDetailProps) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-64 w-full object-cover md:h-full"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#FAF8F5]/90 px-3 py-1 text-xs font-semibold text-[#1C1D1A] backdrop-blur">
          {item.condition}
        </span>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#2D4A3E]/10 px-3 py-1 text-xs font-semibold text-[#2D4A3E]">
            {item.category}
          </span>
          <span className="rounded-full bg-[#C87D55]/12 px-3 py-1 text-xs font-semibold text-[#A85A33]">
            Size {item.size}
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1C1D1A] md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm text-[#7A7C72]">
          {item.color} · {item.location}
        </p>
        <p className="mt-4 rounded-2xl bg-[#F5F1EA] p-4 text-sm italic leading-relaxed text-[#595B53]">
          "{item.story}"
        </p>
        <p className="mt-3 text-xs text-[#9A9C92]">
          Donated by {item.donor}
        </p>
        <button
          onClick={() => onClaim(item)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#2D4A3E] py-3.5 text-base font-semibold text-[#FAF8F5] transition-all hover:bg-[#1C1D1A] active:scale-[0.99]"
        >
          <Heart size={17} weight="fill" /> Request this item
        </button>
      </div>
    </div>
  );
}

/* ---------------- Success State ---------------- */

function SuccessState({
  title,
  desc,
  onClose,
  onAnother,
  ctaLabel,
}: {
  title: string;
  desc: string;
  onClose: () => void;
  onAnother: () => void;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center md:px-10">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2D4A3E] text-[#FAF8F5]"
      >
        <Check size={30} weight="bold" />
      </motion.span>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#1C1D1A] md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#595B53]">{desc}</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onAnother}
          className="rounded-full border border-[#2D4A3E]/30 px-6 py-3 text-sm font-semibold text-[#2D4A3E] transition-all hover:bg-[#2D4A3E]/8 active:scale-[0.98]"
        >
          {ctaLabel}
        </button>
        <button
          onClick={onClose}
          className="rounded-full bg-[#1C1D1A] px-6 py-3 text-sm font-semibold text-[#FAF8F5] transition-all hover:bg-[#2D4A3E] active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* ---------------- Admin Panel ---------------- */

interface AdminProps {
  items: DonationItem[];
  requests: ClothingRequest[];
  stats: { label: string; value: number }[];
  onToggleItem: (id: string) => void;
  onUpdateRequest: (id: string, status: ClothingRequest["status"]) => void;
  onReset: () => void;
}

function Admin({
  items,
  requests,
  stats,
  onToggleItem,
  onUpdateRequest,
  onReset,
}: AdminProps) {
  const [tab, setTab] = useState<"items" | "requests" | "stats">("requests");
  const pending = requests.filter((r) => r.status === "Pending").length;

  return (
    <div className="flex min-h-[480px] flex-col p-6 md:p-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1C1D1A]">Admin</h3>
          <p className="text-sm text-[#7A7C72]">Community control center</p>
        </div>
        <span className="rounded-full bg-[#C87D55]/12 px-3 py-1 text-xs font-semibold text-[#A85A33]">
          {pending} pending request{pending === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        {(
          [
            ["requests", "Requests", UsersThree],
            ["items", "Listings", Package],
            ["stats", "Stats", ClipboardText],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-[0.97] ${
              tab === key
                ? "bg-[#1C1D1A] text-[#FAF8F5]"
                : "bg-[#F5F1EA] text-[#595B53] hover:text-[#2D4A3E]"
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex-1 overflow-y-auto">
        {tab === "requests" && (
          <div className="flex flex-col gap-3">
            {requests.length === 0 && (
              <p className="rounded-2xl bg-[#F5F1EA] p-6 text-sm text-[#7A7C72]">
                No requests yet.
              </p>
            )}
            {requests.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-[#1C1D1A]/8 bg-[#F5F1EA]/60 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#2D4A3E]/10 px-2.5 py-0.5 text-xs font-semibold text-[#2D4A3E]">
                    {r.type}
                  </span>
                  <h4 className="text-sm font-semibold text-[#1C1D1A]">{r.name}</h4>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      r.status === "Pending"
                        ? "bg-[#C87D55]/15 text-[#A85A33]"
                        : r.status === "Approved"
                          ? "bg-[#2D4A3E]/12 text-[#2D4A3E]"
                          : "bg-[#1C1D1A]/8 text-[#7A7C72]"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#595B53]">{r.needs}</p>
                <p className="mt-1.5 text-xs text-[#9A9C92]">
                  Sizes: {r.sizes || "Any"} {r.priority && `· Priority: ${r.priority}`}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onUpdateRequest(r.id, "Approved")}
                    className="flex items-center gap-1 rounded-full bg-[#2D4A3E] px-3.5 py-1.5 text-xs font-semibold text-[#FAF8F5] transition-all hover:bg-[#1C1D1A] active:scale-[0.96]"
                  >
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button
                    onClick={() => onUpdateRequest(r.id, "Fulfilled")}
                    className="flex items-center gap-1 rounded-full border border-[#2D4A3E]/30 px-3.5 py-1.5 text-xs font-semibold text-[#2D4A3E] transition-all hover:bg-[#2D4A3E]/8 active:scale-[0.96]"
                  >
                    <Check size={13} /> Mark fulfilled
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "items" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-[#7A7C72]">
              {items.length} listing{items.length === 1 ? "" : "s"} · tap to toggle
              availability
            </p>
            {items.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-3 rounded-2xl border border-[#1C1D1A]/8 bg-[#F5F1EA]/60 p-3"
              >
                <img src={i.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1C1D1A]">{i.title}</p>
                  <p className="text-xs text-[#7A7C72]">
                    {i.category} · {i.condition} · {i.location}
                  </p>
                </div>
                <button
                  onClick={() => onToggleItem(i.id)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    i.available ? "bg-[#2D4A3E]" : "bg-[#1C1D1A]/20"
                  }`}
                  role="switch"
                  aria-checked={i.available}
                  aria-label={`Toggle ${i.title}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      i.available ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "stats" && (
          <div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#1C1D1A]/8 bg-[#F5F1EA]/60 p-4"
                >
                  <p className="text-xl font-semibold tracking-tight text-[#1C1D1A]">
                    {s.value.toLocaleString()}
                  </p>
                  <p className="mt-0.5 text-xs text-[#7A7C72]">{s.label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={onReset}
              className="mt-5 w-full rounded-full border border-[#C87D55]/40 py-3 text-sm font-semibold text-[#A85A33] transition-all hover:bg-[#C87D55]/10 active:scale-[0.98]"
            >
              Reset demo data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Modal Shell ---------------- */

export type ModalKind = "none" | "donate" | "request" | "admin";

interface ModalProps {
  kind: ModalKind;
  item: DonationItem | null;
  onClose: () => void;
  onDonateSubmit: (payload: DonationFormPayload) => void;
  onRequestSubmit: (payload: RequestFormPayload) => void;
  onClaim: (item: DonationItem) => void;
  onDonateOpen: () => void;
  onAdminOpen: () => void;
  items: DonationItem[];
  requests: ClothingRequest[];
  stats: { label: string; value: number }[];
  onToggleItem: (id: string) => void;
  onUpdateRequest: (id: string, status: ClothingRequest["status"]) => void;
  onReset: () => void;
}

export default function ModalsAndForms(props: ModalProps) {
  const {
    kind,
    item,
    onClose,
    onDonateSubmit,
    onRequestSubmit,
    onClaim,
    onDonateOpen,
    onAdminOpen,
    items,
    requests,
    stats,
    onToggleItem,
    onUpdateRequest,
    onReset,
  } = props;
  const reduce = useReducedMotion();

  const [donateDone, setDonateDone] = useState(false);
  const [requestDone, setRequestDone] = useState(false);

  useEffect(() => {
    if (kind === "donate") setDonateDone(false);
    if (kind === "request") setRequestDone(false);
  }, [kind]);

  useEffect(() => {
    document.body.style.overflow = kind !== "none" || item ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [kind, item]);

  const open = kind !== "none" || item !== null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#1C1D1A]/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? false : { y: 48, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] w-full overflow-y-auto rounded-t-[2rem] bg-[#FAF8F5] shadow-2xl sm:max-w-2xl sm:rounded-[2rem]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[#FAF8F5]/90 px-6 py-4 backdrop-blur-md md:px-8">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A7C72]">
                {kind === "donate" && (
                  <>
                    <Heart size={14} weight="fill" className="text-[#C87D55]" /> Give
                  </>
                )}
                {kind === "request" && (
                  <>
                    <HandHeart size={14} weight="fill" className="text-[#2D4A3E]" /> Receive
                  </>
                )}
                {kind === "admin" && (
                  <>
                    <SealCheck size={14} weight="fill" className="text-[#2D4A3E]" /> Manage
                  </>
                )}
                {kind === "none" && item && "Listing"}
              </span>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1D1A]/12 text-[#1C1D1A] transition-colors hover:bg-[#1C1D1A]/5"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            {kind === "donate" &&
              (donateDone ? (
                <SuccessState
                  title="Thank you for giving."
                  desc="Your donation is now in our community queue. We'll confirm pickup or drop-off by email within 24 hours."
                  onClose={onClose}
                  onAnother={() => setDonateDone(false)}
                  ctaLabel="Add another item"
                />
              ) : (
                <DonateForm
                  onSubmit={(payload) => {
                    onDonateSubmit(payload);
                    setDonateDone(true);
                  }}
                />
              ))}

            {kind === "request" &&
              (requestDone ? (
                <SuccessState
                  title="Your request is in."
                  desc="Our community team reviews every request personally. We'll be in touch as soon as a match is found."
                  onClose={onClose}
                  onAnother={() => setRequestDone(false)}
                  ctaLabel="Submit another request"
                />
              ) : (
                <RequestForm
                  onSubmit={(payload) => {
                    onRequestSubmit(payload);
                    setRequestDone(true);
                  }}
                />
              ))}

            {kind === "admin" && (
              <Admin
                items={items}
                requests={requests}
                stats={stats}
                onToggleItem={onToggleItem}
                onUpdateRequest={onUpdateRequest}
                onReset={onReset}
              />
            )}

            {kind === "none" && item && (
              <ItemDetail
                item={item}
                onClaim={(claimed) => {
                  onClaim(claimed);
                }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}