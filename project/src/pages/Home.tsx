import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Tag, TrendingUp, Percent, ShoppingBag } from 'lucide-react';
import BrandCard from '../components/BrandCard';
import CouponCard from '../components/CouponCard';
import { useAuth } from '../contexts/AuthContext';
import { brands, coupons, getFeaturedBrands, categories } from '../data';

const Home: React.FC = () => {
  const { isAuthenticated, saveCoupon, user } = useAuth();
  const [featuredBrands, setFeaturedBrands] = useState(getFeaturedBrands());
  const [featuredCoupons, setFeaturedCoupons] = useState(coupons.slice(0, 4));
  const [searchTerm, setSearchTerm] = useState('');

  // Check if a coupon is saved by the user
  const isCouponSaved = (couponId: string) => {
    return user?.savedCoupons.includes(couponId) || false;
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="banner-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Save Big on Your Favorite Brands
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Discover exclusive coupon codes and discounts from top retailers all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/brands" className="btn bg-white text-blue-600 hover:bg-gray-100">
                  Browse Brands
                </Link>
                {!isAuthenticated && (
                  <Link to="/auth/register" className="btn bg-blue-500 text-white hover:bg-blue-600">
                    Sign Up Free
                  </Link>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img 
                src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Discount shopping" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-md py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search for brands or coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && setSearchTerm(e.target.value)}
            />
            <Link to={`/brands?search=${searchTerm}`} className="absolute inset-y-0 right-0 flex items-center pr-3">
              <ArrowRight className="h-5 w-5 text-blue-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Brands</h2>
            <Link to="/brands" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse By Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category}
                to={`/brands?category=${category}`}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                data-aos="fade-up"
                data-aos-delay={(categories.indexOf(category) - 1) * 100}
              >
                <div className="text-blue-600 mb-2">
                  {category === 'Fashion' && <Tag className="h-8 w-8 mx-auto" />}
                  {category === 'Technology' && <TrendingUp className="h-8 w-8 mx-auto" />}
                  {category === 'Food & Beverage' && <Tag className="h-8 w-8 mx-auto" />}
                  {category === 'Retail' && <ShoppingBag className="h-8 w-8 mx-auto" />}
                  {category === 'Travel' && <Tag className="h-8 w-8 mx-auto" />}
                  {category === 'Entertainment' && <Tag className="h-8 w-8 mx-auto" />}
                </div>
                <span className="font-medium">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Coupons */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Coupons</h2>
            <Link to="/brands" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCoupons.map((coupon) => (
              <CouponCard 
                key={coupon.id} 
                coupon={coupon} 
                isSaved={isCouponSaved(coupon.id)}
                onSave={isAuthenticated ? saveCoupon : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="0">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Coupons</h3>
              <p className="text-gray-600">Browse through our extensive collection of coupons from your favorite brands.</p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Percent className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Copy Code</h3>
              <p className="text-gray-600">Simply click the copy button to save the coupon code to your clipboard.</p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600">Use the code during checkout at the retailer's website and enjoy your savings!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of savvy shoppers who are already saving big with Discount PRO.
          </p>
          {isAuthenticated ? (
            <Link to="/brands" className="btn bg-white text-blue-600 hover:bg-gray-100">
              Browse All Coupons
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/auth/register" className="btn bg-white text-blue-600 hover:bg-gray-100">
                Sign Up Free
              </Link>
              <Link to="/auth/login" className="btn bg-blue-500 text-white border border-white hover:bg-blue-700">
                Login
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;