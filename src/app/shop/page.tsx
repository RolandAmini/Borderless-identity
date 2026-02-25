'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

interface Product {
  id: string | number;
  name: string;
  price: string;
  image: string;
  bgColor?: string;
  slug?: string;
}

export default function StampdPage2() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const apiEndpoints = [
        '/api/products',
        '/api/admin/products',
        '/api/shop/products',
      ];

      let response: Response | null = null;

      for (const endpoint of apiEndpoints) {
        try {
          response = await fetch(endpoint, {
            next: { revalidate: 60 },
          });
          if (response.ok) break;
        } catch (e) {
          continue;
        }
      }

      if (!response?.ok) {
        throw new Error('No products API found');
      }

      const data = await response.json();

      // Sanitize: ensure image is never undefined/null
      const raw: Product[] = Array.isArray(data) ? data : data.products || [];
      setProducts(
        raw.map((p) => ({
          ...p,
          image: p.image || '',
        }))
      );
    } catch (err: any) {
      console.error('Products fetch error:', err);
      setError('Products temporarily unavailable');
      setProducts([
        { id: 1, name: 't-shirt', price: 'KSh13,100', image: '/products/tee-white.jpg', bgColor: '#f5f5f5' },
        { id: 2, name: 't-shirt', price: 'KSh13,100', image: '/products/tee-black-la.jpg', bgColor: '#e8e8e8' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full mb-4"
          />
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: '#efefef' }}>

        {/* Filter Bar */}
        <div className="bg-white sticky top-0 z-20 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
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
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md z-50 rounded-lg">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        className="block w-full text-left px-4 py-2.5 text-[11px] hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
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
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 mb-4">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
              {products.map((product, idx) => (
                <motion.div
                  key={`${product.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group"
                >
                  {/* White Card */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">

                    {/* Product Image */}
                    <div
                      className="relative w-full aspect-square flex items-center justify-center p-4"
                      style={{ backgroundColor: product.bgColor || '#f8f8f8' }}
                    >
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                      ) : null}

                      {/* Fallback placeholder */}
                      <div
                        className={`${
                          product.image ? 'hidden' : ''
                        } w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm font-bold absolute inset-0 m-auto`}
                      >
                        ?
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="px-4 py-4">
                      <h3 className="text-[11px] font-normal tracking-tight leading-[1.3] mb-2 text-black uppercase line-clamp-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[13px] font-semibold text-black tracking-wide">
                        {product.price}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </>
  );
}