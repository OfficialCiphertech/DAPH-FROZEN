
import React from 'react';
import { ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="gradient-orange p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Daph Frozen & More</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted provision shop for quality frozen foods and more. 
              Fresh products delivered with care.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Contact Info</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">0209971141</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">0544085033</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Quick Links</span>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-orange-500 cursor-pointer">Home</p>
              <p className="text-gray-400 hover:text-orange-500 cursor-pointer">Products</p>
              <p className="text-gray-400 hover:text-orange-500 cursor-pointer">Contact</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Daph Frozen & More. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made by <span className="text-orange-500 font-semibold">HACKERPRO</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
