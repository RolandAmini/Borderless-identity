import Link from 'next/link';

export default function OfferSale() {
  return (
    <div className="w-full max-w-5xl h-[200px] bg-[#0025a8] via-blue-700 to-blue-500 rounded-2xl relative overflow-hidden shadow-2xl shadow-blue-500/30 font-sans">
      <h1 className="absolute top-1/2 left-12 -translate-y-1/2 text-[#D2D2C2] text-5xl md:text-[3.5rem] font-black leading-tight drop-shadow-2xl [-webkit-text-stroke:0.5px_rgba(0,0,0,0.3)]">
        Offer<br className="sm:hidden" /> Sale
      </h1>
      <p className="absolute bottom-10 left-12 text-[#D2D2C2] text-lg font-medium opacity-95">
        Up to 80% Off
      </p>
      <Link 
        href="/shop"
        className="absolute bottom-8 right-12 bg-[#D2D2C2]] backdrop-blur-xl border-2 border-white/40 text-white px-8 py-4 text-lg font-semibold rounded-full hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 no-underline inline-block"
      >
        Shop Now
      </Link>
    </div>
  );
}
