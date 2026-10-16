export type CategoryId = 'all' | 'espresso' | 'iced' | 'filter' | 'bakery' | 'beans';

export type MilkOption = 'Whole Farmhouse' | 'Oat Milk (Minor Figures)' | 'Sprouted Almond Milk' | 'Pistachio Silk' | 'None (Black)';
export type SyrupOption = 'None' | 'Madagascar Bourbon Vanilla' | 'Spiced Cardamom Sugar' | 'Salted Caramel' | 'Cascara Reduction';
export type SizeOption = 'Small (8oz)' | 'Regular (12oz)' | 'Large (16oz)';
export type GrindOption = 'Whole Bean' | 'Espresso (Fine)' | 'Pour Over / V60 (Medium)' | 'French Press / Cold Brew (Coarse)';

export interface CustomizationState {
  size: SizeOption;
  milk: MilkOption;
  syrup: SyrupOption;
  extraShot: boolean;
  iceLevel: 'Regular Ice' | 'Light Ice' | 'Extra Ice' | 'Hot';
  grind?: GrindOption;
  specialInstructions?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  origin?: string;
  tastingNotes: string[];
  image: string;
  imageAlt: string;
  isPopular?: boolean;
  isSeasonal?: boolean;
  isBakery?: boolean;
  isBean?: boolean;
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark';
  allergens?: string[];
  bakeSchedule?: string;
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  customization: CustomizationState;
  itemTotal: number;
}

export type OrderType = 'dine_in' | 'pickup' | 'shipping';

export interface OrderDetails {
  orderId: string;
  orderType: OrderType;
  tableNumber?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tip: number;
  total: number;
  createdAt: string;
  estimatedMinutes: number;
}

export interface ReservationData {
  reservationId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingZone: string;
  specialNotes?: string;
}
