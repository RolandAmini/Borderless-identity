'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopByCategory() {
  // 1. Ajout du type pour éviter les erreurs de lecture
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const categories = [
    { id: 1, title: 'Cups', image: '/c1.jpg', link: '/collections/shirting' },
    { id: 2, title: 'Bags', image: '/c2.jpg', link: '/collections/accessories' },
    { id: 3, title: 'T-Shirts', image: '/p3.jpeg', link: '/collections/outerwear' },
    { id: 4, title: 'Footwear', image: '/p5.jpeg', link: '/collections/footwear' },
    
  ];

  useEffect(() => {
    // Check de sécurité pour Turbopack/Next.js
    if (typeof window === 'undefined') return;

    const container = scrollContainerRef.current;
    if (!container || !autoScrollEnabled) return;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.5;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;

      // Vérification cruciale : container doit exister à chaque frame
      if (!isPaused && container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 1) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += (scrollSpeed * delta) / 16;
        }
      }

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, autoScrollEnabled]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const current = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? current - scrollAmount : current + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-10 bg-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter text-[#D2D2C2] italic">
            Shop by category
          </h2>
          
         
        </div>

        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* On duplique les catégories pour l'effet de boucle */}
          {[...categories, ...categories, ...categories].map((category, index) => (
            <Link
              key={`${category.id}-${index}`}
              href={category.link}
              className="group relative flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] aspect-[3/4] overflow-hidden bg-zinc-100 border border-black/5"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 80vw, 30vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs tracking-[0.3em] uppercase mb-1 opacity-80 font-medium">Category</p>
                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}