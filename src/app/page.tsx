'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Navbar from './components/Navbar';
import NewArrivalsButton from './components/NewArrivalsButton';
import Newarrivals from './components/Newarrivals';
import ShopByCategory from './components/ShopByCategory';
import OfferSale from './components/OfferSale';
import CoreCollection from './components/Corecollection';
import Footer from './components/Footer';

export default function LosAngelesStore() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 300], [0, -50]);
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Navigation */}
      <Navbar />
   

      {/* Hero Section */}
      <section className="relative  h-screen flex items-center mb-0 justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/lo1.jpeg"
          alt="Borderless Identity Global Collection"
          fill
          priority
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ objectFit: 'cover' }}
          quality={90}
        />

        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-[2]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient Overlay (optional, pour plus de profondeur) */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-900/80 z-[3]" />

        {/* Main Logo */}
        <motion.div 
          style={{ y: logoY, opacity: logoOpacity }}
          className="relative z-[10]"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            {/* Text with Distressed Texture Effect - Arched */}
           
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-sm tracking-[0.4em] font-light text-blue-700">
             
            </p>
            <p className="text-xs tracking-[0.3em] font-light text-gray-100 mt-2">
             
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[10]"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent"
          />
        </motion.div>
        <div className="absolute bottom-20 left-8 z-[10]">
  <NewArrivalsButton />
</div>
      </section>

      {/* New Arrivals Section */}
      
      < Newarrivals/>
      <ShopByCategory />
      <CoreCollection />
      <OfferSale />
      <Footer />
    </div>
  );
}