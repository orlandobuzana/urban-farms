export type GrowthMethod = 'Aeroponic' | 'Hydroponic' | 'Vertical Tower' | 'Rooftop Soil';

export type ProductCategory = 'microgreens' | 'greens' | 'herbs' | 'specialty' | 'pantry';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  unit: string;
  growthMethod: GrowthMethod;
  harvestWindow: string;
  inStock: boolean;
  stockCount: number;
  image: string;
  badge?: string;
  description: string;
  nutritionHighlights: string[];
  daysToHarvest: number;
}

export interface BoxItem {
  name: string;
  quantity: string;
  category: string;
  iconName: string;
}

export interface CSABox {
  id: string;
  name: string;
  subtitle: string;
  serves: string;
  basePrice: number;
  weightLbs: string;
  popular?: boolean;
  badge?: string;
  description: string;
  harvestCycle: string;
  image: string;
  defaultItems: BoxItem[];
  swappableOptions: {
    category: string;
    options: string[];
  }[];
}

export interface BoxAddOn {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

export type SubscriptionCadence = 'weekly' | 'bi-weekly' | 'one-time';

export interface CartItem {
  cartId: string;
  type: 'csa' | 'product';
  productId: string;
  title: string;
  price: number;
  quantity: number;
  unit?: string;
  frequency?: SubscriptionCadence;
  boxServes?: string;
  customizedItems?: string[];
  addOns?: {
    id: string;
    name: string;
    price: number;
    unit: string;
  }[];
  image: string;
}

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  hours: string;
  availableDays: string[];
}

export interface FulfillmentPreference {
  type: 'delivery' | 'pickup';
  zipCode: string;
  isEligible: boolean;
  pickupLocationId?: string;
  scheduledDay: 'Tuesday' | 'Friday';
  timeSlot: string;
}

export interface Subscription {
  id: string;
  boxId: string;
  boxTitle: string;
  frequency: 'weekly' | 'bi-weekly';
  status: 'active' | 'paused' | 'skipped_next';
  nextHarvestDate: string;
  pricePerCycle: number;
  items: string[];
  addOns: string[];
  deliveryMethod: 'delivery' | 'pickup';
  addressOrHub: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  fulfillment: FulfillmentPreference;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    instructions?: string;
  };
  hasSubscription: boolean;
}

