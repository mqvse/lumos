import MobileNav from "@/components/MobileNav";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/store/useCartStore";
import CartDrawer from "@/components/CartDrawer";
import { products } from "@/store/products";
import Marquee from "@/components/Marquee";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32 overflow-hidden relative">
      
      {/* 1. BACKGROUND TYPOGRAPHY (The "Texture") */}
      {/* This sits behind everything as a texture */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <h1 className="text-[25vw] font-serif text-[#111111] leading-none select-none whitespace-nowrap opacity-50">
            LUMOS
        </h1>
      </div>

      <CartDrawer />

      {/* 2. HEADER */}
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

      {/* 3. MARQUEE (The Scrolling Strip) */}
      <section className="relative z-10 my-8">
        <Marquee />
      </section>

      {/* 4. THE FEED (Horizontal Scroll) */}
      <section className="relative z-10 w-full overflow-x-auto scrollbar-hide px-6 pb-10">
        <div className="flex gap-6 w-max snap-x snap-mandatory">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            <div className="w-6 shrink-0" />
        </div>
      </section>

      <MobileNav />
    </main>
  );
}