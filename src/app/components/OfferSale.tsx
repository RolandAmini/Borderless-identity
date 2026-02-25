import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function OfferSale() {
  return (
    <div className="w-full max-w-6xl mx-auto min-h-[320px] md:min-h-[380px] lg:min-h-[420px] relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/90 to-emerald-900/80 rounded-3xl shadow-2xl shadow-black/20 border border-white/10 backdrop-blur-xl">
      
      {/* Dégradé décoratif subtil */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-emerald-500/10" />
      
      {/* Badge "HOT SALE" */}
      <div className="absolute top-6 left-6 lg:left-8 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm border border-orange-400/50">
         HOT SALE
      </div>

      {/* Contenu principal - Responsive */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-6 md:px-10 lg:px-16 py-12 lg:py-16">
        
        {/* Section Texte - GAUCHE */}
        <div className="text-center lg:text-left lg:w-2/3 space-y-6 lg:space-y-8 mb-8 lg:mb-0">
          {/* Titre principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black leading-tight bg-gradient-to-r from-white via-slate-200 to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl">
            <span className="block lg:inline">EXCLUSIVE</span>
            <span className="block lg:inline lg:ml-4">OFFER SALE</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl lg:text-2xl font-light text-slate-200/90 max-w-lg mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
           Coming soon
          </p>

          {/* Compteur ou urgence */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start pt-4">
            <div className="flex items-center gap-2 text-[#947D1E] text-sm md:text-base font-mono bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="w-6 h-6 bg-[#947D1E] rounded-full flex items-center justify-center text-xs font-bold text-black">00</span>
              <span className="uppercase tracking-wider">Days Left</span>
            </div>
          </div>
        </div>

        {/* Section CTA - DROITE */}
        <div className="flex flex-col items-center lg:items-end gap-6 lg:gap-8 w-full lg:w-auto">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-6 w-full lg:w-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center min-w-[120px]">
              <div className="text-2xl lg:text-3xl font-black text-white mb-1">200+</div>
              <div className="text-xs uppercase tracking-wider text-slate-300">Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center min-w-[120px]">
              <div className="text-2xl lg:text-3xl font-black text-[#947D1E] mb-1">24h</div>
              <div className="text-xs uppercase tracking-wider text-slate-300">Delivery</div>
            </div>
          </div>

          {/* Bouton principal */}
          <Link 
            href="/shop"
            className="group relative bg-red-600 to-[#0025a8] hover:from-orange-600 hover:via-red-600 hover:to-[#0025a8] text-white font-bold px-8 py-5 lg:px-12 lg:py-6 text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-white/20 backdrop-blur-xl overflow-hidden w-full lg:w-fit no-underline flex items-center justify-center gap-3"
          >
            {/* Ligne décorative */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent h-px bottom-2 left-4 w-16 group-hover:w-full transition-all duration-500" />
            
            <ShoppingBag className="w-6 h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300" />
            <span>Shop Exclusive Deals</span>
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500" />
          </Link>
        </div>
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-orange-400/20 via-red-400/10 to-emerald-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -left-16 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-white/10 to-slate-300/10 rounded-full blur-2xl animate-pulse delay-1000" />
      
      {/* Badge mobile */}
      <div className="lg:hidden absolute top-6 right-6 bg-[#006B44] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
        LIMITED TIME
      </div>
    </div>
  );
}
