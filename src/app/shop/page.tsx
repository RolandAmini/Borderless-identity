'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


// Données des produits - Remplacez par vos vraies données
const products = [
  {
    id: 1,
    name: 't-shirt',
    price: 'KSh13,100',
    image: '/products/tee-white.jpg', // Remplacez par vos images
    bgColor: '#f5f5f5',
  },
  {
    id: 2,
    name: 't-shirt',
    price: 'KSh13,100',
    image: '/products/tee-black-la.jpg',
    bgColor: '#e8e8e8',
  },
  {
    id: 3,
    name: 't-shirt',
    price: 'KSh14,700',
    image: '/products/tee-black.jpg',
    bgColor: '#e5e5e5',
  },
  {
    id: 4,
    name: 'BAG',
    price: 'KSh13,100',
    image: '/products/tee-white-mfg.jpg',
    bgColor: '#f8f8f8',
  },
  {
    id: 5,
    name: 'BAG',
    price: 'KSh15,200',
    image: '/products/tee-grey.jpg',
    bgColor: '#ebebeb',
  },
  {
    id: 6,
    name: 't-shirt',
    price: 'KSh12,500',
    image: '/products/tee-black-2.jpg',
    bgColor: '#e0e0e0',
  },
  {
    id: 7,
    name: 'BAG',
    price: 'KSh14,000',
    image: '/products/tee-beige.jpg',
    bgColor: '#f2f2f2',
  },
  {
    id: 8,
    name: 't-shirt',
    price: 'KSh13,800',
    image: '/products/tee-white-3.jpg',
    bgColor: '#fafafa',
  },
];

export default function StampdPage2() {
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  return (
    <>
    <Navbar />
    <div className="min-h-screen" style={{ backgroundColor: '#efefef' }}>
      {/* Filter Bar */}
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5">
          <div className="relative inline-block">
            <button
              onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] font-normal hover:opacity-60 transition-opacity"
            >
              SIZE
              <ChevronDown size={12} strokeWidth={1.5} />
            </button>

            {/* Size Dropdown */}
            {sizeDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setSizeDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md z-50">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className="block w-full text-left px-4 py-2.5 text-[11px] hover:bg-gray-50 transition-colors"
                      onClick={() => setSizeDropdownOpen(false)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              {/* White Card Container */}
              <div className="bg-white">
                {/* Product Image - Square */}
                <div 
                  className="relative w-full aspect-square flex items-center justify-center"
                  style={{ backgroundColor: product.bgColor }}
                >
                  {/* Placeholder pour image - Remplacez par Image component */}
                  <div className="w-3/4 h-3/4 flex items-center justify-center">
                    {/* Vos images de produits ici */}
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-4 py-5">
                  <h3 className="text-[11px] font-normal tracking-tight leading-[1.4] mb-2 text-black uppercase">
                    {product.name}
                  </h3>
                  <p className="text-[11px] font-normal text-black">
                    {product.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      
    </div>
    <Footer />
    </>
  );
}