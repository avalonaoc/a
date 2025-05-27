import React from 'react';
import { Link } from 'react-router-dom';
import { Brand, BrandCardProps } from '../types';
import { ShoppingBag, Percent } from 'lucide-react';

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <Link 
      to={`/brand/${brand.id}`}
      className="brand-card"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="w-24 h-24 object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-center mb-2">{brand.name}</h3>
        <div className="text-sm text-gray-600 mb-2">
          <div className="flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 mr-1" />
            <span>{brand.category}</span>
          </div>
        </div>
        <div className="flex items-center justify-center text-green-600 text-sm font-medium">
          <Percent className="h-4 w-4 mr-1" />
          <span>Up to {brand.discountPercentage}% off</span>
        </div>
        <div className="mt-3 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            View Coupons
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;