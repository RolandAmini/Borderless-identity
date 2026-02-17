import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from '../../components/Navbar';
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // 1. Chercher le produit dans MongoDB
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  // 2. Si le produit n'existe pas, afficher la page 404
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* SECTION GAUCHE : IMAGE */}
          <div className="relative aspect-[3/4] bg-zinc-800 overflow-hidden rounded-sm">
            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* SECTION DROITE : INFOS */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                {product.name}
              </h1>
              <p className="text-2xl mt-4 text-zinc-400">
                KSh {product.price.toLocaleString()}
              </p>
            </div>

            <div className="h-px bg-zinc-800 w-full" />

            <p className="text-lg text-zinc-300 leading-relaxed font-light">
              {product.description}
            </p>

            <div className="space-y-4 pt-8">
              <button className="w-full bg-white text-black py-5 text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95">
                Add to Cart
              </button>
              <p className="text-[10px] text-center text-zinc-500 uppercase tracking-widest">
                Complimentary shipping on orders over KSh 50,000
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}