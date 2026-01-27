import MobileNav from "@/components/MobileNav";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/store/useCartStore";
import CartDrawer from "@/components/CartDrawer";
import { products } from "@/store/products";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32">
      {/* 1. THE CART DRAWER (Lives here, invisible until opened) */}
      <CartDrawer />
      <header className="p-8 pt-12 flex justify-between items-end">
        <div>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tighter text-white">
            LUMOS
            </h1>
            <p className="text-rose-400/80 text-xs font-mono tracking-widest mt-2">
            DROP 01 // 2026
            </p>
        </div>
        <div className="hidden md:block text-right">
            <p className="text-white/40 text-xs uppercase tracking-widest">
                Scroll to explore
            </p>
        </div>
      </header>

      {/* 2. The "Swipe" Feed (Horizontal Scroll) */}
      <section className="mt-8 w-full overflow-x-auto scrollbar-hide px-6 pb-10">
        <div className="flex gap-6 w-max snap-x snap-mandatory">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            
            {/* Spacer to allow scrolling the last item fully into view */}
            <div className="w-6 shrink-0" />
        </div>
      </section>

      <MobileNav />
    </main>
  );
}