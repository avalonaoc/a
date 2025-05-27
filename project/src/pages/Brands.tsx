import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import BrandCard from '../components/BrandCard';
import { brands, categories } from '../data';
import { Brand, FilterOption } from '../types';

const Brands: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    // Initialize from URL params
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    
    if (searchParam) setSearchTerm(searchParam);
    if (categoryParam) setSelectedCategory(categoryParam);
    
    filterBrands(searchParam || searchTerm, categoryParam || selectedCategory);
  }, [searchParams]);
  
  const filterBrands = (search: string, category: string) => {
    let filtered = [...brands];
    
    // Filter by search term
    if (search) {
      filtered = filtered.filter(brand => 
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by category
    if (category && category !== 'All') {
      filtered = filtered.filter(brand => brand.category === category);
    }
    
    setFilteredBrands(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams(searchTerm, selectedCategory);
    filterBrands(searchTerm, selectedCategory);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateUrlParams(searchTerm, category);
    filterBrands(searchTerm, category);
    setIsFilterOpen(false);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    updateUrlParams('', 'All');
    setFilteredBrands(brands);
  };
  
  const updateUrlParams = (search: string, category: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category && category !== 'All') params.set('category', category);
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Brands</h1>
        <p className="text-gray-600">Discover exclusive coupons and discounts from your favorite brands.</p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 right-0 px-4 text-blue-600">
                  Search
                </button>
              </div>
            </form>
          </div>
          
          {/* Filter button (mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
          
          {/* Category filter (desktop) */}
          <div className="hidden lg:block">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="input"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Mobile filter dropdown */}
        {isFilterOpen && (
          <div className="mt-4 lg:hidden">
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Categories</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`p-2 text-sm rounded-md ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Active filters */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Search: {searchTerm}
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      updateUrlParams('', selectedCategory);
                      filterBrands('', selectedCategory);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Category: {selectedCategory}
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      updateUrlParams(searchTerm, 'All');
                      filterBrands(searchTerm, 'All');
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Results */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredBrands.length} {filteredBrands.length === 1 ? 'Brand' : 'Brands'} Found
          </h2>
        </div>
        
        {filteredBrands.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No brands found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;