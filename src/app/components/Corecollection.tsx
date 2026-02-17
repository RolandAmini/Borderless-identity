'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CoreCollection({ products = [], isLoading = false }) {
  // Produits de démonstration
  const coreCollections = [
    {
      id: 1,
      name: 't-shirt',
      price: 'KSh22,500.00 KES',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=533&fit=crop',
      slug: 'balmore-logo-hoodie-grey-marl'
    },
    {
      id: 2,
      name: 't-shirt',
      price: 'KSh17,100.00 KES',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=533&fit=crop',
      slug: 'burcham-logo-crew-grey-marl'
    },
    {
      id: 3,
      name: 't-shirt',
      price: 'KSh20,700.00 KES',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=533&fit=crop',
      slug: 'woolmore-logo-jogger-grey-marl'
    },
    {
      id: 4,
      name: 't-shirt BLACK',
      price: 'KSh22,500.00 KES',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=533&fit=crop&sat=-100',
      slug: 'balmore-logo-hoodie-black'
    },
    {
      id: 5,
      name: 't-shirt ',
      price: 'KSh22,500.00 KES',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=533&fit=crop&sat=-100',
      slug: 'carradale-logo-hoodie-black'
    },
    {
      id: 6,
      name: 'BURCHAM LOGO CREW BLACK',
      price: 'KSh17,100.00 KES',
      image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=533&fit=crop',
      slug: 'burcham-logo-crew-black'
    }
  ];

  // Utiliser les produits fournis ou les produits de démo
  const displayProducts = products.length > 0 ? products : coreCollections;

  if (isLoading) return null;

  return (
    <section className="w-full bg-[#947D1E] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-[#D2D2C2]">
            Core collection
          </h2>
          <Link 
            href="/collections/core"
            className="flex items-center gap-2 text-[#D2D2C2] hover:text-[#D2D2C2] transition-colors group"
            aria-label="View all core collection products"
          >
            <span className="sr-only">View all</span>
            <svg 
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="relative">
          {/* Scrollable container */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-3 md:gap-4 min-w-min pb-4">
              {displayProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex-shrink-0 w-[240px] md:w-[260px] group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] bg-[#D2D2C2] mb-4 overflow-hidden">
                    <Image
                      src={(product as any).images ? (product as any).images[0] : (product as any).image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 240px, 260px"
                      unoptimized
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-medium text-[#D2D2C2] uppercase tracking-wide leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#D2D2C2]">
{typeof (product as any).price === 'number' ? `KSh ${(product as any).price.toLocaleString()}` : (product as any).price}                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Fade effect on right edge (optional) */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#D2D2C2] to-transparent pointer-events-none hidden md:block" />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}