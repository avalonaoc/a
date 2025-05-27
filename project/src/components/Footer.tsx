import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Ticket } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Ticket className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Discount PRO</span>
            </div>
            <p className="text-gray-300 mb-4">
              Save money on your favorite brands with our exclusive coupon codes and discounts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400">Home</Link>
              </li>
              <li>
                <Link to="/brands" className="text-gray-300 hover:text-blue-400">All Brands</Link>
              </li>
              <li>
                <Link to="/my-profile" className="text-gray-300 hover:text-blue-400">My Coupons</Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-gray-300 hover:text-blue-400">Login</Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-gray-300 hover:text-blue-400">Sign Up</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/brands?category=Fashion" className="text-gray-300 hover:text-blue-400">Fashion</Link>
              </li>
              <li>
                <Link to="/brands?category=Technology" className="text-gray-300 hover:text-blue-400">Technology</Link>
              </li>
              <li>
                <Link to="/brands?category=Food & Beverage" className="text-gray-300 hover:text-blue-400">Food & Beverage</Link>
              </li>
              <li>
                <Link to="/brands?category=Retail" className="text-gray-300 hover:text-blue-400">Retail</Link>
              </li>
              <li>
                <Link to="/brands?category=Travel" className="text-gray-300 hover:text-blue-400">Travel</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-300">123 Savings Street, Coupon City, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <a href="mailto:info@discountpro.com" className="text-gray-300 hover:text-blue-400">
                  info@discountpro.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Discount PRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;