import type {
  DonationItem,
  ClothingRequest,
  PartnerOrg,
  ImpactStats,
  FAQItem,
  StoryItem,
} from "./types";

export const IMG = {
  hero: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/318afe8c-da1c-4739-88f0-40a50d6be90d/hero-folded-knitwear-ff718979-1788004051482.webp",
  sharing:
    "https://storage.googleapis.com/dala-prod-public-storage/generated-images/318afe8c-da1c-4739-88f0-40a50d6be90d/community-sharing-0fbadf4a-1788004050666.webp",
  sweater:
    "https://storage.googleapis.com/dala-prod-public-storage/generated-images/318afe8c-da1c-4739-88f0-40a50d6be90d/item-knit-sweater-259ffc3c-1788004051271.webp",
  dress:
    "https://storage.googleapis.com/dala-prod-public-storage/generated-images/318afe8c-da1c-4739-88f0-40a50d6be90d/item-linen-dress-ae47fc57-1788004051122.webp",
  mother:
    "https://storage.googleapis.com/dala-prod-public-storage/generated-images/318afe8c-da1c-4739-88f0-40a50d6be90d/story-single-mother-017afe9d-1788004051540.webp",
};

export const DEFAULT_ITEMS: DonationItem[] = [
  {
    id: "it-1",
    title: "Oatmeal Chunky Knit Sweater",
    category: "Women",
    condition: "Like New",
    size: "M",
    color: "Oatmeal",
    image: IMG.sweater,
    location: "Nairobi, Kilimani",
    donor: "Amara K.",
    story:
      "Worn twice on chilly evenings. Wool blend, hand-washed and ready for its next chapter.",
    available: true,
    featured: true,
    createdAt: "2025-11-02",
  },
  {
    id: "it-2",
    title: "Sage Linen Midi Dress",
    category: "Women",
    condition: "New",
    size: "S",
    color: "Sage",
    image: IMG.dress,
    location: "Nairobi, Westlands",
    donor: "Grace W.",
    story:
      "Bought with big plans, tags still on. Lightweight linen for warm days and office hours.",
    available: true,
    featured: true,
    createdAt: "2025-11-08",
  },
  {
    id: "it-3",
    title: "Forest Green Zip Hoodie",
    category: "Men",
    condition: "Like New",
    size: "L",
    color: "Forest",
    image: IMG.hero,
    location: "Kampala, Kololo",
    donor: "David O.",
    story:
      "A favorite that no longer fits. Warm fleece lining, no stains, still has years of life.",
    available: true,
    createdAt: "2025-11-12",
  },
  {
    id: "it-4",
    title: "Kids Rain Boots (Grey/Teal)",
    category: "Kids",
    condition: "Gently Worn",
    size: "C26",
    color: "Teal",
    image: IMG.sweater,
    location: "Nairobi, Langata",
    donor: "Wanjiku M.",
    story:
      "Outgrown after one rainy season. Waterproof, non-slip soles, tiny scuff on the left toe.",
    available: true,
    createdAt: "2025-11-15",
  },
  {
    id: "it-5",
    title: "Tan Leather Crossbody Bag",
    category: "Accessories",
    condition: "Gently Worn",
    size: "One size",
    color: "Tan",
    image: IMG.dress,
    location: "Nairobi, South B",
    donor: "Lilian N.",
    story:
      "Genuine leather, beautiful patina. Adjustable strap, fits a tablet and daily essentials.",
    available: true,
    createdAt: "2025-11-18",
  },
  {
    id: "it-6",
    title: "White Canvas Sneakers",
    category: "Shoes",
    condition: "Like New",
    size: "US 9",
    color: "White",
    image: IMG.hero,
    location: "Kampala, Naguru",
    donor: "Samuel T.",
    story:
      "Only worn indoors. Clean white canvas, cushioned insole, box included.",
    available: false,
    createdAt: "2025-11-20",
  },
];

export const DEFAULT_REQUESTS: ClothingRequest[] = [
  {
    id: "req-1",
    type: "Community Org",
    name: "Pamoja Women's Cooperative",
    email: "hello@pamoja.example",
    role: "Coordinator",
    needs:
      "Professional blouses and skirts (S-L) for 12 women starting a tailoring apprenticeship next month.",
    sizes: "S-L",
    priority: "High",
    status: "Pending",
    createdAt: "2025-11-21",
  },
  {
    id: "req-2",
    type: "School",
    name: "Riverside Primary School",
    email: "office@riverside.example",
    role: "Head Teacher",
    needs:
      "Warm sweaters and closed shoes for 30 students ahead of the cold season.",
    sizes: "C22-C30",
    priority: "High",
    status: "Pending",
    createdAt: "2025-11-22",
  },
];

export const DEFAULT_STATS: ImpactStats = {
  itemsDonated: 12840,
  peopleSupported: 5210,
  kgDiverted: 9460,
  pickupCities: 6,
};

export const PARTNERS: PartnerOrg[] = [
  { id: "p1", name: "Pamoja Trust", tagline: "Community land & housing", location: "Nairobi", verified: true },
  { id: "p2", name: "Wakadinali Outreach", tagline: "Youth skills programs", location: "Kampala", verified: true },
  { id: "p3", name: "Sauti ya Watoto", tagline: "Children's education support", location: "Dar es Salaam", verified: true },
  { id: "p4", name: "GreenLoop Textiles", tagline: "Circular textile recycling", location: "Kigali", verified: true },
];

export const FAQs: FAQItem[] = [
  {
    question: "What condition should donated clothing be in?",
    answer:
      "We accept items in New, Like New, and Gently Worn condition. Clean, free of stains and tears, with working zippers and buttons. If you would gift it to a friend, it is ready for our community.",
  },
  {
    question: "How does pickup or drop-off work?",
    answer:
      "Choose either in the form. Drop-off points open daily across our pickup cities, and scheduled pickups are confirmed within 24 hours of your donation booking.",
  },
  {
    question: "Who can request clothing?",
    answer:
      "Individuals, families, schools, community organizations, and churches. Tell us what you need and our partner network works to match requests with available items.",
  },
  {
    question: "Is requesting clothing free?",
    answer:
      "Always. Clothing is given with dignity and without cost. Our work is funded by donors and partner organizations who believe in a more circular wardrobe.",
  },
  {
    question: "Can I track the impact of my donation?",
    answer:
      "Yes. Every item is logged, and our impact counters update in real time so you can see exactly how many items, people, and kilograms of textiles your contribution supports.",
  },
];

export const STORIES: StoryItem[] = [
  {
    quote:
      "The interview blouse I found here changed how I walked into that room. I got the job, and I wore it on my first day.",
    name: "Achieng",
    role: "Nairobi",
    image: IMG.sharing,
  },
  {
    quote:
      "Twelve of our women started the tailoring course with donated fabric and blazers. Dignity changes everything.",
    name: "Grace",
    role: "Pamoja Women's Cooperative",
    image: IMG.mother,
  },
];