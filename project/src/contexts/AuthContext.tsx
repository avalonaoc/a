import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { users } from '../data';
import toast from 'react-hot-toast';

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    const userExists = users.some(u => u.email === email);
    
    if (userExists) {
      return false;
    }
    
    // Create new user (this is a mock - in a real app, this would be handled by a backend)
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      password,
      savedCoupons: [],
      createdAt: new Date().toISOString(),
    };
    
    // For the purpose of this demo, we're just setting the user without actually adding to the array
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const saveCoupon = (couponId: string) => {
    if (!user) return;
    
    // Check if already saved
    if (user.savedCoupons.includes(couponId)) {
      toast.error('Coupon already saved');
      return;
    }
    
    // Add coupon to saved coupons
    const updatedUser = {
      ...user,
      savedCoupons: [...user.savedCoupons, couponId]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Coupon saved successfully');
  };

  const removeSavedCoupon = (couponId: string) => {
    if (!user) return;
    
    // Remove coupon from saved coupons
    const updatedUser = {
      ...user,
      savedCoupons: user.savedCoupons.filter(id => id !== couponId)
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Coupon removed from saved list');
  };

  const updateUserInfo = async (name: string, email: string): Promise<boolean> => {
    if (!user) return false;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update user info
    const updatedUser = {
      ...user,
      name,
      email
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
    
    return true;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email exists
    const userExists = users.some(u => u.email === email);
    
    if (!userExists) {
      return false;
    }
    
    // In a real app, this would send a password reset email
    toast.success('Password reset instructions sent to your email');
    
    return true;
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    saveCoupon,
    removeSavedCoupon,
    updateUserInfo,
    forgotPassword,
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};