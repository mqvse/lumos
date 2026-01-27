"use client";

import { products } from "@/store/products";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, Star, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import CartDrawer from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import { use } from "react"; // <--- 1. IMPORT THIS

// 2. Define params as a Promise
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 3. Unwrap the params using 'use'
  const { id } = use(params);

  // 4. USE 'id' HERE (Do NOT use params.id)
  const product = products.find((p) => p.id === id);
  
  const { addToCart, toggleCart } = useCartStore();

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32">
      <CartDrawer />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full">
        <Link href="/" className="absolute top-8 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-colors">
            <ArrowLeft size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">Back</span>
        </Link>

        <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* --- DETAILS SECTION --- */}
      <div className="px-6 -mt-20 relative z-10">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <span className="text-rose-400 font-mono tracking-widest text-xs uppercase mb-2 block">{product.category} Series</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-none">{product.name}</h1>
            <p className="text-3xl font-light text-white/80">${product.price.toLocaleString()}</p>
        </motion.div>

        <button 
            onClick={() => { addToCart(product); toggleCart(); }}
            className="w-full py-5 bg-white text-black font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-rose-400 transition-colors mb-12"
        >
            Add to Bag
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/5">
                <Zap className="text-rose-400 mb-4" />
                <h3 className="text-lg font-serif mb-2">Instant Connect</h3>
                <p className="text-white/40 text-sm">Ultra-low latency pairing with proprietary Lumos Link technology.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/5">
                <ShieldCheck className="text-rose-400 mb-4" />
                <h3 className="text-lg font-serif mb-2">2-Year Warranty</h3>
                <p className="text-white/40 text-sm">Full coverage for any hardware defects or battery degradation.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/5">
                <Star className="text-rose-400 mb-4" />
                <h3 className="text-lg font-serif mb-2">Top Rated</h3>
                <p className="text-white/40 text-sm">Voted best-in-class design by AudioPhile Weekly 2025.</p>
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-white/60 font-light leading-relaxed">
            <p>
                Experience the future of {product.category.toLowerCase()} with the {product.name}. 
                Engineered for those who demand precision, style, and uncompromising performance.
                Whether you are in the studio or on the move, the adaptive environment control ensures 
                you stay in the zone.
            </p>
        </div>

      </div>
      
      <MobileNav />
    </main>
  );
}