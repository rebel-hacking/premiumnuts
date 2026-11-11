export type ProductCategory =
  | "all"
  | "walnuts"
  | "almonds"
  | "cashews"
  | "pistachios"
  | "hazelnuts"
  | "mixed"
  | "dry-fruits";

export interface ProductWeightOption {
  weight: string;
  price: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  origin: string;
  description: string;
  tastingNotes: string[];
  pairingSuggestions: string[];
  features: string[];
  options: ProductWeightOption[];
  imageUrl: string;
  badge?: string;
  isBestseller?: boolean;
  isReserve?: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedOption: ProductWeightOption;
  quantity: number;
}

export interface HamperSize {
  id: "small" | "medium" | "large";
  name: string;
  subtitle: string;
  approxWeight: string;
  price: number;
  originalPrice: number;
  isPopular?: boolean;
  description: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: "Nuts" | "Dry Fruits";
  tagline: string;
  description: string;
  image: string;
  active: boolean;
}

export interface HamperCartItem {
  id: string;
  size: HamperSize;
  selectedIngredients: Ingredient[];
  quantity: number;
  unitPrice: number;
  unitOriginalPrice: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  deliveryInstructions?: string;
  giftMessage?: string;
}

export interface CorporateEnquiry {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  estimatedHampers: string | number;
  preferredSize?: string;
  budgetPerHamper?: string;
  occasion: string;
  deliveryDate?: string;
  customRibbon?: boolean;
  engravedWoodBox?: boolean;
  customBranding?: boolean;
  notes: string;
}

export interface SeasonalOffer {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  active: boolean;
  startDate: string;
  endDate: string;
  discountHighlight?: string;
  ctaText: string;
  ctaLink: string;
}

export interface OccasionItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}
