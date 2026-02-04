import Link from 'next/link';

export default function OfferSale() {
  return (
    <div className="w-full max-w-5xl min-h-[280px] md:h-[300px] bg-[#0025a8] bg-gradient-to-br from-[#0025a8] via-blue-700 to-blue-500 rounded-2xl relative overflow-hidden shadow-2xl shadow-blue-500/30 font-sans flex flex-col justify-center p-8 md:p-0">
  
  {/* Titre : Centré sur mobile, à gauche sur desktop */}
  <h1 className="md:absolute md:top-1/2 md:left-12 md:-translate-y-1/2 text-[#D2D2C2] text-4xl sm:text-5xl md:text-[3.5rem] font-black leading-tight drop-shadow-2xl [-webkit-text-stroke:0.5px_rgba(0,0,0,0.3)] mb-2 md:mb-0">
    Offer<br className="hidden sm:block" /> Sale
  </h1>

  {/* Texte Promo : Sous le titre sur mobile */}
  <p className="md:absolute md:bottom-10 md:left-12 text-[#D2D2C2] text-base md:text-lg font-medium opacity-95 mb-6 md:mb-0">
    Up to 80% Off
  </p>

  {/* Bouton : Aligné à gauche sur mobile pour le confort, à droite sur desktop */}
  <Link 
    href="/shop"
    className="md:absolute md:bottom-8 md:right-12 bg-white/20 backdrop-blur-xl border-2 border-white/40 text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-full hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 no-underline w-fit"
  >
    Shop Now
  </Link>

  {/* Déco optionnelle pour remplir le vide sur mobile */}
  <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
</div>
  );
}
