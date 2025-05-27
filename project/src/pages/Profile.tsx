import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Edit, User, Save, X, Tag } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import { useAuth } from '../contexts/AuthContext';
import { getUserSavedCoupons } from '../data';
import { Coupon } from '../types';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateUserInfo, removeSavedCoupon } = useAuth();
  
  const [savedCoupons, setSavedCoupons] = useState<Coupon[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('coupons'); // 'coupons' or 'settings'
  
  useEffect(() => {
    if (user) {
      // Get user's saved coupons
      const coupons = getUserSavedCoupons(user.id);
      setSavedCoupons(coupons);
      
      // Set form values
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await updateUserInfo(name, email);
      
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveCoupon = (couponId: string) => {
    removeSavedCoupon(couponId);
    // Update local state
    setSavedCoupons(savedCoupons.filter(coupon => coupon.id !== couponId));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center">
            <div className="bg-white text-blue-600 rounded-full p-3 mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">Member since {format(new Date(user.createdAt), 'MMMM yyyy')}</p>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'coupons'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Tag className="h-5 w-5 inline mr-2" />
              My Coupons
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="h-5 w-5 inline mr-2" />
              Account Settings
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'coupons' ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Coupons</h2>
              
              {savedCoupons.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {savedCoupons.map((coupon) => (
                    <CouponCard 
                      key={coupon.id} 
                      coupon={coupon} 
                      isSaved={true}
                      onRemove={handleRemoveCoupon}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No saved coupons</h3>
                  <p className="text-gray-500 mb-4">You haven't saved any coupons yet.</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-2\" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <Save className="h-4 w-4 mr-1" />
                      )}
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary flex items-center"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                        setEmail(user.email);
                      }}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="mt-1">{user.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                    <p className="mt-1">{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p className="mt-1">{format(new Date(user.createdAt), 'MMMM d, yyyy')}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Saved Coupons</h3>
                    <p className="mt-1">{user.savedCoupons.length}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;