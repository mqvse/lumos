"use client"; // <--- 1. Now a Client Component

import MobileNav from "@/components/MobileNav";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import Marquee from "@/components/Marquee";
import { products } from "@/store/products";
import { useRef } from "react"; // <--- 2. Import useRef
import { ChevronLeft, ChevronRight } from "lucide-react"; // <--- 3. Import Icons

export default function Home() {
  // 4. Create a reference to the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 5. Scroll Logic
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500; // How far to scroll per click
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32 overflow-hidden relative">
      
      {/* BACKGROUND TEXTURE */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <h1 className="text-[25vw] font-serif text-[#111111] leading-none select-none whitespace-nowrap opacity-50">
            LUMOS
        </h1>
      </div>

      <CartDrawer />

      {/* HEADER */}
      <header className="relative z-10 p-8 pt-12 flex justify-between items-end">
        <div>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter text-white mix-blend-difference">
            LUMOS
            </h2>
            <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <p className="text-rose-400/80 text-xs font-mono tracking-widest">
                LIVE DROP 01
                </p>
            </div>
        </div>
        <div className="hidden md:block text-right">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                Audio / Vision / Tactile
            </p>
            <p className="text-white/20 text-[10px] uppercase tracking-widest">
                Est. 2026
            </p>
        </div>
      </header>

      {/* MARQUEE */}
      <section className="relative z-10 my-8">
        <Marquee />
      </section>

      {/* --- THE FEED SECTION (Updated for Desktop) --- */}
      <section className="relative z-10 w-full px-6 pb-10 group">
        
        {/* LEFT BUTTON (Visible on Desktop Hover) */}
        <button 
           onClick={() => scroll("left")}
           className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-full text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 active:scale-90"
        >
           <ChevronLeft size={24} />
        </button>

        {/* RIGHT BUTTON (Visible on Desktop Hover) */}
        <button 
           onClick={() => scroll("right")}
           className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-full text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 active:scale-90"
        >
           <ChevronRight size={24} />
        </button>

        {/* SCROLL CONTAINER */}
        <div 
          ref={scrollContainerRef} // <--- Attach Ref Here
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
            {/* Added w-max wrapper to ensure horizontal layout */}
            <div className="flex gap-6 w-max"> 
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {/* Spacer */}
                <div className="w-24 shrink-0" />
            </div>
        </div>
      </section>

      <MobileNav />
    </main>
  );
}