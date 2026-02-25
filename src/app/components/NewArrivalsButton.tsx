import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export default function NewArrivalsButton() {
  return (
    <div className="inline-block">
      {/* "Available now" text above */}
      <p className="text-xs tracking-[0.2em] font-light text-red-600 mb-2 uppercase">
       Available now
      </p>
      
      {/* Button with split design */}
      <Link href="/shop" className="group block">
        <div className="flex border border-white/40 hover:border-white/60 transition-colors duration-300">
          {/* Left section - Text */}
          <div className="bg-transparent px-12 py-4 flex items-center justify-center">
            <span className="text-[20px] tracking-[0.35em] font-medium text-[#D2D2C2] uppercase whitespace-nowrap">
              Shop Now 
            </span>
          </div>
          
          {/* Right section - Black block */}
            <div className="bg-[#947D1E] w-16 h-16 flex items-center justify-center group-hover:bg-[#0025a8] transition-all duration-300">
      <ShoppingCart 
        className="text-white w-7 h-7 transform group-hover:scale-110 transition-transform duration-300" 
      />
    </div>
        </div>
      </Link>
    </div>
  );
}