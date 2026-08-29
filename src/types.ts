export type FilterCategory =
  | "All"
  | "Women"
  | "Men"
  | "Kids"
  | "Shoes"
  | "Accessories";

export type ItemCondition = "New" | "Like New" | "Gently Worn";

export interface DonationItem {
  id: string;
  title: string;
  category: Exclude<FilterCategory, "All">;
  condition: ItemCondition;
  size?: string;
  color: string;
  image: string;
  location: string;
  donor: string;
  story: string;
  available: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface ClothingRequest {
  id: string;
  type: "Individual" | "Community Org" | "School" | "Church";
  name: string;
  email: string;
  role?: string;
  needs: string;
  sizes: string;
  priority?: string;
  status: "Pending" | "Approved" | "Fulfilled";
  createdAt: string;
}

export interface PartnerOrg {
  id: string;
  name: string;
  tagline: string;
  location: string;
  verified: boolean;
}

export interface ImpactStats {
  itemsDonated: number;
  peopleSupported: number;
  kgDiverted: number;
  pickupCities: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StoryItem {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface DonationFormPayload {
  category: FilterCategory;
  quantity: number;
  condition: ItemCondition;
  size: string;
  logistics: "Pickup" | "Drop-off";
  area: string;
  name: string;
  email: string;
  notes: string;
  image: string | null;
}

export interface RequestFormPayload {
  type: ClothingRequest["type"];
  name: string;
  email: string;
  role: string;
  needs: string;
  sizes: string;
  priority: string;
}