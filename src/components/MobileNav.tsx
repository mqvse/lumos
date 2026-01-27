"use client";

import { ShoppingBag, Search, Home, Menu } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function MobileNav() {
  const { cart, toggleCart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <div className="pointer-events-auto bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-2xl flex items-center gap-8">
        
        <button className="text-white/50 hover:text-white transition-colors">
            <Home size={24} strokeWidth={1.5} />
        </button>

        <button className="text-white/50 hover:text-white transition-colors">
            <Search size={24} strokeWidth={1.5} />
        </button>

        <button 
            onClick={toggleCart} 
            className="relative bg-white text-black w-14 h-14 rounded-full flex items-center justify-center -mt-8 shadow-lg shadow-white/10 hover:scale-105 active:scale-95 transition-transform"
        >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#111111]">
                    {totalItems}
                </span>
            )}
        </button>

        <button className="text-white/50 hover:text-white transition-colors">
            <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}