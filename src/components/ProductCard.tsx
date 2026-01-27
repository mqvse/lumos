"use client";

import { Plus } from "lucide-react";
import { useCartStore, Product } from "@/store/useCartStore";
import Link from "next/link"; 

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore();

  return (
    <div className="min-w-[85vw] md:min-w-[400px] h-[70vh] relative flex-shrink-0 snap-center group">
      {/* 1. The Image Container (Luxury aspect ratio) */}
      <div className="w-full h-full bg-[#111111] rounded-[2rem] overflow-hidden relative border border-white/5">
        
        {/* WRAP IMAGE & INFO IN LINK */}
        <Link href={`/product/${product.id}`} className="block w-full h-full cursor-pointer">
            <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

            {/* Product Info (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full p-8">
                <p className="text-rose-400 text-xs font-mono tracking-widest uppercase mb-2">
                    {product.category}
                </p>
                <h3 className="text-4xl font-serif text-white mb-2 leading-none">
                    {product.name}
                </h3>
                <p className="text-white/60 text-lg font-light">
                    ${product.price.toLocaleString()}
                </p>
            </div>
        </Link>

        {/* 2. Floating "Add" Button (Top Right) */}
        <button 
            onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                addToCart(product);
            }}
            className="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"
        >
            <Plus size={24} />
        </button>

      </div>
    </div>
  );
}