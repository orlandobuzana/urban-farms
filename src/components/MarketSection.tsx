'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';
import { Search, Plus, Leaf, Droplet, Sparkles, Cpu } from 'lucide-react';

export default function MarketSection() {
  const { products, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Crops' },
    { id: 'microgreens', label: 'Living Microgreens' },
    { id: 'greens', label: 'Salad Greens & Brassicas' },
    { id: 'herbs', label: 'Living Culinary Herbs' },
    { id: 'specialty', label: 'Gourmet Fungi' },
    { id: 'pantry', label: 'Farm Pantry' }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddProduct = (product: Product) => {
    addToCart({
      type: 'product',
      productId: product.id,
      title: product.name,
      price: product.price,
      quantity: 1,
      unit: product.unit,
      image: product.image
    });
  };

  return (
    <section id="farm-market" className="py-24 bg-[#090a0b] text-zinc-100 border-b border-zinc-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>FACILITY CATALOG // DAILY HARVEST BATCHES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
              Daily Harvested Crops
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl leading-relaxed">
              Order individual living root crops, specialty fungi, or nutrient-dense microgreens grown under calibrated LED lighting recipes.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative font-mono">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH CROP CODE OR NAME..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar font-mono">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 font-mono">
            <p className="text-sm">NO CROPS FOUND IN SECTOR.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-emerald-400 font-bold hover:underline"
            >
              RESET QUERY
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Growth method chip */}
                  <div className="absolute top-3 left-3 bg-zinc-950/90 text-emerald-400 font-mono text-[9px] font-bold px-2.5 py-1 rounded-md border border-zinc-800 flex items-center gap-1">
                    <Droplet className="w-2.5 h-2.5" />
                    <span>{product.growthMethod.toUpperCase()}</span>
                  </div>

                  {/* Highlight badge */}
                  {product.badge && (
                    <div className="absolute bottom-3 left-3 bg-emerald-500 text-zinc-950 font-mono text-[9px] font-black px-2 py-0.5 rounded shadow-md uppercase">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-emerald-400 transition-colors font-mono">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Highlights tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5 font-mono">
                      {product.nutritionHighlights.slice(0, 2).map((nh, i) => (
                        <span
                          key={i}
                          className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-semibold px-2 py-0.5 rounded"
                        >
                          {nh}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono">
                    <div>
                      <span className="text-xl font-black text-emerald-400">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-zinc-500 block -mt-1">
                        /{product.unit}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddProduct(product)}
                      disabled={!product.inStock}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
                        product.inStock
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{product.inStock ? 'ADD' : 'DEPLETED'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
