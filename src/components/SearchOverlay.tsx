"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { products } from "@/store/products";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchOverlay() {
  const { isSearchOpen, toggleSearch } = useCartStore();
  const [query, setQuery] = useState("");

  // Lock body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isSearchOpen]);

  // Filter Logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-xl flex flex-col pt-24 px-6"
        >
          {/* Close Button */}
          <button 
            onClick={toggleSearch}
            className="absolute top-8 right-8 text-white/50 hover:text-white p-2"
          >
            <X size={32} />
          </button>

          {/* Search Input */}
          <div className="w-full max-w-2xl mx-auto border-b border-white/20 pb-4 mb-12 flex items-center gap-4">
            <Search className="text-white/50" size={24} />
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-3xl md:text-5xl font-serif text-white placeholder:text-white/20 focus:outline-none"
            />
          </div>

          {/* Results Grid */}
          <div className="w-full max-w-2xl mx-auto space-y-4 overflow-y-auto pb-20 scrollbar-hide">
            {query && filteredProducts.length === 0 ? (
                <p className="text-white/30 text-center mt-10">No results found for "{query}"</p>
            ) : (
                filteredProducts.map((product) => (
                    <Link 
                        key={product.id} 
                        href={`/product/${product.id}`}
                        onClick={toggleSearch} // Close overlay on click
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover opacity-80 group-hover:opacity-100" />
                        <div className="flex-1">
                            <h4 className="text-xl text-white font-serif">{product.name}</h4>
                            <p className="text-white/40 text-sm uppercase tracking-wider">{product.category}</p>
                        </div>
                        <ArrowRight className="text-white/20 group-hover:text-rose-400 transition-colors" />
                    </Link>
                ))
            )}
            
            {/* Suggestions (Show when empty) */}
            {!query && (
                <div className="mt-12">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-6">Popular Searches</p>
                    <div className="flex flex-wrap gap-3">
                        {["Audio", "Vision", "Accessories", "New Arrivals"].map((tag) => (
                            <button 
                                key={tag} 
                                onClick={() => setQuery(tag)}
                                className="px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}