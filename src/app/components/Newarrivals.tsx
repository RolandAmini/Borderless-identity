'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * ProductCarousel - Composant de carousel de produits horizontal
 * 
 * @param {string} title - Titre de la section (défaut: "New Arrivals")
 * @param {Array} products - Tableau de produits avec structure: { id, name, price, image, color? }
 * @param {string} backgroundColor - Couleur de fond (défaut: "#f5f5f5")
 * 
 * Exemple d'utilisation:
 * 
 * const myProducts = [
 *   {
 *     id: 1,
 *     name: 'CROMER TRUCKER DYED JACKET ONYX',
 *     price: 'KSh53,200.00',
 *     image: '/images/products/jacket.jpg',
 *   },
 *   {
 *     id: 2,
 *     name: 'CROMER DYED JEANS ONYX',
 *     price: 'KSh45,000.00',
 *     image: '/images/products/jeans.jpg',
 *   },
 * ];
 * 
 * <ProductCarousel title="New Arrivals" products={myProducts} />
 */
export default function ProductCarousel({ 
  title = "New Arrivals",
  products = [],
  backgroundColor = "#f5f5f5"
}) {
  // Fonction pour faire défiler le carousel
  const handleScroll = () => {
    const container = document.getElementById('products-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Produits de démonstration si aucun produit n'est fourni
  const demoProducts = [
    {
      id: 1,
      name: 'allen white tshirt',
      price: 'KSh53,200.00',
      image: '/p5.jpeg',
    },
    {
      id: 2,
      name: 't-shirt classic black',
      price: 'KSh45,000.00',
      image: '/p4.jpeg',
    },
    {
      id: 3,
      name: 't-shirt oversized grey',
      price: 'KSh35,200.00',
      image: '/p3.jpeg',
    },
    {
      id: 4,
      name: 'casual shirt blue',
      price: 'KSh28,900.00',
      image: '/p2.jpeg',
    },
    {
      id: 5,
      name: 't-shirt classic white',
      price: 'KSh53,200.00',
      image: '/p1.jpeg',
    },
    {
      id: 6,
      name: 'masai t-shirt',
      price: 'KSh31,600.00',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=533&fit=crop&sat=-100',
    },
  ];

  // Utiliser les produits fournis ou les produits de démonstration
  const displayProducts = products.length > 0 ? products : demoProducts;

  return (
    <section 
      className="relative py-16 mt-0 px-0 bg-[#D2D2C2]"
      
    >
      <div className="max-w-[1600px] mx-auto">
        {/* ========================================
            HEADER - Titre et bouton de navigation
        ======================================== */}
        <div className="flex justify-between items-center mb-8 px-4 md:px-8">
          {/* Titre de la section */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#006B44]">
            {title}
          </h2>
          
          {/* Bouton flèche pour faire défiler */}
          <button
            onClick={handleScroll}
            className="w-10 h-10 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-colors duration-300"
            aria-label="Faire défiler vers la droite"
          >
            {/* Icône flèche droite */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* ========================================
            CAROUSEL - Liste des produits scrollable
        ======================================== */}
        <div
          id="products-scroll"
          className="flex gap-0 overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: 'none',  // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          {displayProducts.map((product, idx) => (
            <motion.div
              key={product.id || idx}
              // Animation d'entrée au scroll
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.05 // Délai progressif pour chaque carte
              }}
              viewport={{ once: true }} // Animation une seule fois
              className="flex-shrink-0 w-[260px] md:w-[280px] group cursor-pointer"
            >
              {/* ========================================
                  IMAGE DU PRODUIT
              ======================================== */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
                {product.image ? (
                  // Image avec Next.js Image pour optimisation
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 260px, 280px"
                    unoptimized // Activé pour les images externes
                  />
                ) : (
                  // Fallback: couleur de fond si pas d'image
                  <div 
                    className="w-full h-full"
                    style={{ backgroundColor: product.color || '#cccccc' }}
                  />
                )}
                
                {/* Overlay blanc au hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>

              {/* ========================================
                  INFORMATIONS DU PRODUIT
              ======================================== */}
              <div className="mt-3 px-2">
                {/* Nom du produit */}
                <h3 className="text-[10px] md:text-[11px] font-medium tracking-tight text-black uppercase leading-tight mb-1.5">
                  {product.name}
                </h3>
                
                {/* Prix du produit */}
                <p className="text-[10px] md:text-[11px] font-normal text-black">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========================================
            STYLES CSS - Cache la scrollbar
        ======================================== */}
        <style jsx>{`
          #products-scroll::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
      </div>
    </section>
  );
}