export interface Category {
  id: string;
  name: string;
  iconName: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  persianName: string;
  categoryId: string;
  price: number; // In Tomans (تومان)
  originalPrice?: number; // In Tomans for discounts
  discountPercent?: number;
  description: string;
  ingredients?: string[];
  image: string;
  fallbackImage: string;
  isPopular?: boolean;
  isAvailable: boolean;
  isVegetarian?: boolean;
  preparationTime?: number; // in minutes
  calories?: number;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customerNote?: string;
}

export type OrderType = 'dine-in' | 'takeaway';

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  orderType: OrderType;
  tableNumber?: string;
  customerNotes?: string;
}

export interface CafeSettings {
  name: string;
  persianName: string;
  slogan: string;
  subtitle: string;
  whatsAppNumber: string;
  phoneNumber: string;
  address: string;
  instagram: string;
  workingHours: string;
}
