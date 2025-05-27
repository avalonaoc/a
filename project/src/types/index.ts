// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would never be stored in plaintext
  savedCoupons: string[];
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  featured: boolean;
  discountPercentage: number;
}

export interface Coupon {
  id: string;
  brandId: string;
  code: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  terms: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  saveCoupon: (couponId: string) => void;
  removeSavedCoupon: (couponId: string) => void;
  updateUserInfo: (name: string, email: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
}

export type CouponCardProps = {
  coupon: Coupon;
  brand?: Brand;
  showBrand?: boolean;
  isSaved?: boolean;
  onSave?: (couponId: string) => void;
  onRemove?: (couponId: string) => void;
}

export type BrandCardProps = {
  brand: Brand;
}

export type FilterOption = {
  label: string;
  value: string;
};