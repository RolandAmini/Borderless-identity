'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand on clique sur un lien
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#D2D2C2] border-b border-gray-200 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-[70px] flex items-center justify-between">
          
          {/* GAUCHE: Navigation Links (Desktop only) */}
          <div className="hidden lg:flex items-center gap-10">
            <Link 
              href="/shop" 
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#0025a8] hover:text-red-600 transition-colors relative group"
            >
              SHOP
              <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/coming-soon" 
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#0025a8] hover:text-red-600 transition-colors relative group whitespace-nowrap"
            >
              COMING SOON
              <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* MOBILE: Menu Hamburger (Mobile only) */}
          <button 
            className="lg:hidden p-2 hover:scale-110 transition-transform duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} strokeWidth={1.5} className="text-black" />
            ) : (
              <Menu size={24} strokeWidth={1.5} className="text-black" />
            )}
          </button>

          {/* CENTRE: Logo */}
          <Link 
            href="/" 
            className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 group"
          >
            <span className="text-[12px] sm:text-[14px] lg:text-[16px] font-semibold tracking-[0.3em] sm:tracking-[0.5em] text-[#006B44] transition-all duration-300 group-hover:tracking-[0.4em] sm:group-hover:tracking-[0.75em]">
              BORDERLESS IDENTITY
            </span>
          </Link>

          {/* DROITE: Icons */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Search - Hidden on mobile */}
            <button 
              className="hidden sm:block p-2 hover:scale-110 transition-transform duration-200" 
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} className="text-blue-700" />
            </button>
            
            {/* User - Hidden on mobile */}
            <button 
              className="hidden sm:block p-2 hover:scale-110 transition-transform duration-200" 
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} className="text-blue-700" />
            </button>
            
            {/* Cart - Always visible */}
            <button 
              className="p-2 hover:scale-110 transition-transform duration-200" 
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} className="text-blue-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMobileMenu}
      />

      {/* MOBILE MENU PANEL */}
      <div 
        className={`fixed top-[70px] left-0 right-0 bg-white z-40 transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 py-8 space-y-6">
          {/* Navigation Links */}
          <div className="space-y-4">
            <Link 
              href="/shop" 
              className="block text-sm font-medium tracking-[0.15em] uppercase text-black hover:text-gray-500 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              SHOP
            </Link>
            <Link 
              href="/coming-soon" 
              className="block text-sm font-medium tracking-[0.15em] uppercase text-black hover:text-gray-500 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              COMING SOON
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Mobile Icons */}
          <div className="flex items-center gap-6">
            <button 
              className="flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-black hover:text-gray-500 transition-colors"
              onClick={closeMobileMenu}
            >
              <Search size={20} strokeWidth={1.5} />
              SEARCH
            </button>
            <button 
              className="flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-black hover:text-gray-500 transition-colors"
              onClick={closeMobileMenu}
            >
              <User size={20} strokeWidth={1.5} />
              ACCOUNT
            </button>
          </div>
        </div>
      </div>

      {/* Spacer pour éviter que le contenu soit caché sous la navbar */}
      <div className="h-[70px]" />
    </>
  );
}