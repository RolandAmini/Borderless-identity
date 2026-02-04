'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Données des produits "Coming Soon" avec couleurs
const comingSoonProducts = [
  {
    id: 1,
    name: 't-shirt',
    status: 'COMING SOON',
    capColor: '#1e4d8b', // Bleu royal
    bgColor: '#e8e8e8',
  },
  {
    id: 2,
    name: 't-shirt',
    status: 'COMING SOON',
    capColor: '#6b7a8f', // Gris bleuté
    bgColor: '#ebebeb',
  },
  {
    id: 3,
    name: 'CAP',
    status: 'COMING SOON',
    capColor: '#1a1a1a', // Noir
    bgColor: '#e5e5e5',
  },
  {
    id: 4,
    name: ' SNAPBACK',
    status: 'COMING SOON',
    capColor: '#2a4a6f', // Bleu marine
    bgColor: '#f0f0f0',
  },
  {
    id: 5,
    name: ' CAP',
    status: 'COMING SOON',
    capColor: '#f8f8f8', // Blanc cassé
    bgColor: '#efefef',
  },
  {
    id: 6,
    name: 'CLASSIC STRUCTURED CAP',
    status: 'COMING SOON',
    capColor: '#8b7355', // Marron/Tan
    bgColor: '#e9e9e9',
  },
];

export default function ComingSoonPageWithCaps() {
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

            {sizeDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setSizeDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md z-50">
                  {['OS', 'S/M', 'L/XL'].map((size) => (
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

      {/* Products Grid - 3 colonnes */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {comingSoonProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group cursor-pointer"
            >
              {/* White Card Container */}
              <div className="bg-white">
                {/* Product Image - Square */}
                <div 
                  className="relative w-full aspect-square flex items-center justify-center p-8"
                  style={{ backgroundColor: product.bgColor }}
                >
                  {/* Simple Cap Illustration */}
                  <div 
                    className="relative w-full h-3/4 rounded-t-full shadow-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      backgroundColor: product.capColor,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    }}
                  >
                    {/* Visière de casquette */}
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-4/5 h-4 rounded-b-full"
                      style={{ 
                        backgroundColor: product.capColor,
                        filter: 'brightness(0.8)',
                        boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                      }}
                    />
                    
                    {/* Petit logo LA au centre */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-white text-xs font-bold opacity-60">
                      CAP
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-4 py-5">
                  <h3 className="text-[11px] font-normal tracking-tight leading-[1.4] mb-1 text-black uppercase">
                    {product.name}
                  </h3>
                  <p className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.05em]">
                    {product.status}
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