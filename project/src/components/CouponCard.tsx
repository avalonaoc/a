import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format, isAfter } from 'date-fns';
import { Coupon, Brand, CouponCardProps } from '../types';
import { Copy, CheckCircle, Calendar, Percent, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBrandById } from '../data';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const CouponCard: React.FC<CouponCardProps> = ({ 
  coupon, 
  brand: propBrand, 
  showBrand = true,
  isSaved = false,
  onSave,
  onRemove
}) => {
  const [copied, setCopied] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // If brand is not provided as prop, get it from the data
  const brand = propBrand || getBrandById(coupon.brandId);
  
  // Check if coupon is expired
  const isExpired = !isAfter(new Date(coupon.validUntil), new Date());
  
  // Handle copy
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Handle save/remove
  const handleSaveToggle = () => {
    if (isSaved && onRemove) {
      onRemove(coupon.id);
    } else if (!isSaved && onSave) {
      onSave(coupon.id);
    }
  };

  return (
    <motion.div 
      className="coupon-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        {/* Brand info */}
        {showBrand && brand && (
          <div className="flex items-center mb-3">
            <Link to={`/brand/${brand.id}`}>
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-10 h-10 object-contain rounded-full"
              />
            </Link>
            <div className="ml-2">
              <Link to={`/brand/${brand.id}`} className="text-gray-900 font-medium hover:text-blue-600">
                {brand.name}
              </Link>
            </div>
          </div>
        )}
        
        {/* Coupon content */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold">{coupon.description}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Valid until {format(new Date(coupon.validUntil), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm text-green-600 mt-1">
            <Percent className="h-4 w-4 mr-1" />
            <span>{coupon.discountPercentage}% off</span>
          </div>
        </div>
        
        {/* Coupon code */}
        <div className={`border ${isExpired ? 'bg-gray-100 border-gray-300' : 'bg-blue-50 border-blue-200'} rounded-lg p-3 flex justify-between items-center mb-3`}>
          <span className={`coupon-code font-bold text-lg ${isExpired ? 'text-gray-500' : 'text-blue-700'}`}>
            {coupon.code}
          </span>
          <CopyToClipboard text={coupon.code} onCopy={handleCopy}>
            <button 
              className={`p-1.5 rounded-full ${isExpired ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
              disabled={isExpired}
            >
              {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </CopyToClipboard>
        </div>
        
        {/* Terms */}
        <div className="text-xs text-gray-500 mb-3">
          <p>{coupon.terms}</p>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center">
          {isExpired ? (
            <span className="text-xs text-red-500 font-medium">Expired</span>
          ) : (
            <span className="text-xs text-green-600 font-medium">Active</span>
          )}
          
          {isAuthenticated && !isExpired && (
            <button 
              onClick={handleSaveToggle}
              className={`flex items-center space-x-1 text-sm ${isSaved ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CouponCard;