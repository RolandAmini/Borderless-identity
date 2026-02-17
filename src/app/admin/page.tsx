'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
const [products, setProducts] = useState<any[]>([]);  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'T-shirt',
  });
  const [file, setFile] = useState<File | null>(null);

  // --- CHARGER LES PRODUITS ---
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur de chargement", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- ACTIONS ---
  const handleDelete = async (id: string) => {
    if (!confirm("⚠️ Supprimer ce produit définitivement ?")) return;
    
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts(); // Rafraîchir la liste
  };

  const handleUpdatePrice = async (id: string, newPrice: string) => {
    // 1. On convertit en nombre pour éviter l'erreur Prisma
    const numericPrice = parseFloat(newPrice);
    
    // 2. Sécurité : si ce n'est pas un nombre, on arrête
    if (isNaN(numericPrice)) return;

    try{
    const res = await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: newPrice }),
    });
    if (res.ok) {
        // 3. Mise à jour locale (plus rapide que fetchProducts)
        setProducts((prev) =>
          prev.map((p: any) => (p.id === id ? { ...p, price: numericPrice } : p))
        );
        console.log("✅ Prix mis à jour");
      }
    } catch (error) {
      console.error("Erreur mise à jour prix:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Choisis une image !");
    setLoading(true);

    try {
      // 1. Upload Cloudinary
      const imageFormData = new FormData();
      imageFormData.append('file', file);
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: imageFormData });
      const uploadData = await uploadRes.json();

      // 2. Création MongoDB
      const productRes = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: [uploadData.url],
          stock: 10
        }),
      });

      if (productRes.ok) {
        alert("✅ Produit publié !");
        setFormData({ name: '', description: '', price: '', category: 'T-shirt' });
        setFile(null);
        fetchProducts(); // Update la liste en bas
      }
    } catch (error) {
      alert("Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D2D2C2] p-4 md:p-8 text-black font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* FORMULAIRE D'AJOUT */}
        <div className="bg-white p-6 md:p-8 shadow-sm border border-black/5">
          <h1 className="text-2xl font-bold uppercase tracking-tighter mb-8">New product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              placeholder="PRODUCT NAME" 
              className="w-full border-b border-black/10 py-2 outline-none focus:border-black uppercase text-sm"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="number" placeholder="PRICE (USD)" 
                className="w-full border-b border-black/10 py-2 outline-none focus:border-black text-sm"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
              <input 
                type="file" 
                className="text-xs pt-2"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <textarea 
              placeholder="DESCRIPTION" 
              className="w-full border border-black/10 p-2 h-24 text-sm outline-none focus:border-black"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <button 
              disabled={loading}
              className="w-full bg-black text-white py-4 text-xs font-bold uppercase hover:bg-zinc-800 transition-all"
            >
              {loading ? "IN PROGRESS..." : "ADD TO STOCK"}
            </button>
          </form>
        </div>

        {/* LISTE DE GESTION (INVENTAIRE) */}
        <div className="bg-white p-6 md:p-8 shadow-sm border border-black/5">
          <h2 className="text-xl font-bold uppercase tracking-tighter mb-6">Stock Management</h2>
          <div className="divide-y divide-black/5">
            {products.map((p: any) => (
              <div key={p.id} className="py-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 overflow-hidden">
                    <img src={p.images[0]} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase">{p.name}</h3>
                    <div className="flex items-center gap-1 text-[10px]">
                      <span>USD</span>
                      <input 
                        type="number" 
                        defaultValue={p.price}
                        onBlur={(e) => handleUpdatePrice(p.id, e.target.value)}
                        className="w-16 border-b border-transparent focus:border-black outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest"
                >
                DELETE
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}