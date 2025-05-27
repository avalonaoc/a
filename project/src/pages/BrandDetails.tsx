import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import CouponCard from '../components/CouponCard';
import { useAuth } from '../contexts/AuthContext';
import { getBrandById, getCouponsByBrandId, brands } from '../data';
import { Brand, Coupon } from '../types';

const BrandDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, saveCoupon, removeSavedCoupon } = useAuth();
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedBrands, setRelatedBrands] = useState<Brand[]>([]);
  
  useEffect(() => {
    if (!id) return;
    
    // Get brand details
    const foundBrand = getBrandById(id);
    if (!foundBrand) {
      navigate('/not-found');
      return;
    }
    
    setBrand(foundBrand);
    
    // Get coupons for this brand
    const brandCoupons = getCouponsByBrandId(id);
    setCoupons(brandCoupons);
    
    // Get related brands from the same category
    const related = brands
      .filter(b => b.category === foundBrand.category && b.id !== foundBrand.id)
      .slice(0, 3);
    setRelatedBrands(related);
    
    setLoading(false);
  }, [id]);
  
  // Check if a coupon is saved by the user
  const isCouponSaved = (couponId: string) => {
    return user?.savedCoupons.includes(couponId) || false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!brand) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link to="/brands" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Brands
        </Link>
      </div>
      
      {/* Brand header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="w-24 h-24 object-contain rounded-lg"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {brand.category}
              </span>
              <span className="inline-flex items-center text-green-600 text-sm font-medium">
                <Percent className="h-4 w-4 mr-1" />
                Up to {brand.discountPercentage}% off
              </span>
            </div>
            <p className="text-gray-600">{brand.description}</p>
          </div>
        </div>
      </div>
      
      {/* Coupons section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Coupons</h2>
        
        {coupons.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {coupons.map((coupon) => (
              <CouponCard 
                key={coupon.id} 
                coupon={coupon} 
                brand={brand}
                showBrand={false}
                isSaved={isCouponSaved(coupon.id)}
                onSave={saveCoupon}
                onRemove={removeSavedCoupon}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No coupons available for this brand at the moment.</p>
          </div>
        )}
      </div>
      
      {/* Related brands */}
      {relatedBrands.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Brands</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedBrands.map((relatedBrand) => (
              <Link 
                key={relatedBrand.id}
                to={`/brand/${relatedBrand.id}`}
                className="bg-white shadow-md rounded-lg p-4 flex items-center hover:shadow-lg transition-shadow"
              >
                <img 
                  src={relatedBrand.logo} 
                  alt={relatedBrand.name} 
                  className="w-12 h-12 object-contain mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{relatedBrand.name}</h3>
                  <p className="text-sm text-gray-500">{relatedBrand.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandDetails;