// Mock data for the application
import { Brand, Coupon, User } from '../types';

// Brands data
export const brands: Brand[] = [
  {
    id: "1",
    name: "Nike",
    logo: "https://images.pexels.com/photos/19677271/pexels-photo-19677271/free-photo-of-a-nike-logo-on-a-white-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Nike, Inc. is an American multinational corporation that designs, develops, manufactures, and markets footwear, apparel, equipment, accessories, and services.",
    category: "Fashion",
    featured: true,
    discountPercentage: 25,
  },
  {
    id: "2",
    name: "Apple",
    logo: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
    category: "Technology",
    featured: true,
    discountPercentage: 15,
  },
  {
    id: "3",
    name: "Starbucks",
    logo: "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Starbucks Corporation is an American multinational chain of coffeehouses and roastery reserves.",
    category: "Food & Beverage",
    featured: true,
    discountPercentage: 20,
  },
  {
    id: "4",
    name: "Amazon",
    logo: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    category: "Retail",
    featured: false,
    discountPercentage: 10,
  },
  {
    id: "5",
    name: "Adidas",
    logo: "https://images.pexels.com/photos/7166802/pexels-photo-7166802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Adidas AG is a German multinational corporation that designs and manufactures shoes, clothing and accessories.",
    category: "Fashion",
    featured: false,
    discountPercentage: 30,
  },
  {
    id: "6",
    name: "McDonald's",
    logo: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "McDonald's Corporation is an American fast food company, founded in 1940.",
    category: "Food & Beverage",
    featured: false,
    discountPercentage: 15,
  },
  {
    id: "7",
    name: "Samsung",
    logo: "https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Samsung Electronics Co., Ltd. is a South Korean multinational electronics company.",
    category: "Technology",
    featured: true,
    discountPercentage: 20,
  },
  {
    id: "8",
    name: "Target",
    logo: "https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Target Corporation is an American retail corporation.",
    category: "Retail",
    featured: false,
    discountPercentage: 25,
  },
];

// Coupons data
export const coupons: Coupon[] = [
  {
    id: "1",
    brandId: "1",
    code: "NIKE25OFF",
    description: "25% off on all Nike products",
    discountPercentage: 25,
    validUntil: "2025-12-31",
    terms: "Cannot be combined with other offers. Valid on regular-priced items only.",
    createdAt: "2024-06-01",
  },
  {
    id: "2",
    brandId: "1",
    code: "NIKESHOES15",
    description: "15% off on Nike shoes",
    discountPercentage: 15,
    validUntil: "2025-08-31",
    terms: "Valid only on footwear. Cannot be combined with other offers.",
    createdAt: "2024-06-01",
  },
  {
    id: "3",
    brandId: "2",
    code: "APPLE15",
    description: "15% off on Apple accessories",
    discountPercentage: 15,
    validUntil: "2025-10-31",
    terms: "Valid on accessories only. Not valid on hardware products.",
    createdAt: "2024-06-01",
  },
  {
    id: "4",
    brandId: "3",
    code: "SBUX20",
    description: "20% off on all Starbucks drinks",
    discountPercentage: 20,
    validUntil: "2025-07-31",
    terms: "Valid on all beverages. Not valid on food items.",
    createdAt: "2024-06-01",
  },
  {
    id: "5",
    brandId: "4",
    code: "AMZN10",
    description: "10% off on Amazon electronics",
    discountPercentage: 10,
    validUntil: "2025-09-30",
    terms: "Valid on electronics category only. Maximum discount $50.",
    createdAt: "2024-06-01",
  },
  {
    id: "6",
    brandId: "5",
    code: "ADIDAS30",
    description: "30% off on all Adidas products",
    discountPercentage: 30,
    validUntil: "2025-08-15",
    terms: "Cannot be combined with other offers. Valid on regular-priced items only.",
    createdAt: "2024-06-01",
  },
  {
    id: "7",
    brandId: "6",
    code: "MCD15",
    description: "15% off on McDonald's meals",
    discountPercentage: 15,
    validUntil: "2025-07-15",
    terms: "Valid on combo meals only. Not valid on promotional items.",
    createdAt: "2024-06-01",
  },
  {
    id: "8",
    brandId: "7",
    code: "SAMSUNG20",
    description: "20% off on Samsung phones",
    discountPercentage: 20,
    validUntil: "2025-11-30",
    terms: "Valid on select smartphone models. Cannot be combined with other offers.",
    createdAt: "2024-06-01",
  },
  {
    id: "9",
    brandId: "8",
    code: "TARGET25",
    description: "25% off on Target home goods",
    discountPercentage: 25,
    validUntil: "2025-09-15",
    terms: "Valid on home department items only. Maximum discount $100.",
    createdAt: "2024-06-01",
  },
  {
    id: "10",
    brandId: "2",
    code: "APPLECARE10",
    description: "10% off on AppleCare+",
    discountPercentage: 10,
    validUntil: "2025-12-15",
    terms: "Valid on new AppleCare+ purchases only.",
    createdAt: "2024-06-01",
  },
];

// Get coupons by brand ID
export const getCouponsByBrandId = (brandId: string): Coupon[] => {
  return coupons.filter(coupon => coupon.brandId === brandId);
};

// Get brand by ID
export const getBrandById = (brandId: string): Brand | undefined => {
  return brands.find(brand => brand.id === brandId);
};

// Get featured brands
export const getFeaturedBrands = (): Brand[] => {
  return brands.filter(brand => brand.featured);
};

// Mock user data
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    savedCoupons: ["1", "3", "5"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456", // In a real app, this would be hashed
    savedCoupons: ["2", "4", "6"],
    createdAt: "2024-02-20",
  },
];

// Categories
export const categories = [
  "All",
  "Fashion",
  "Technology", 
  "Food & Beverage",
  "Retail",
  "Travel",
  "Entertainment"
];

// Get user's saved coupons
export const getUserSavedCoupons = (userId: string): Coupon[] => {
  const user = users.find(user => user.id === userId);
  if (!user) return [];
  
  return coupons.filter(coupon => user.savedCoupons.includes(coupon.id));
};