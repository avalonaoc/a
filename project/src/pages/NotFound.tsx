import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-blue-100 text-blue-600 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl font-medium text-gray-700 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/" className="btn btn-primary flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <Link to="/brands" className="btn btn-secondary">
            Browse Brands
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;