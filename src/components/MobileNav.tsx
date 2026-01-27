"use client";

import { ShoppingBag, Search, Home, Menu } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const { cart, toggleCart, toggleSearch, toggleMenu, isCartOpen, isSearchOpen, isMenuOpen } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");

  // Reset active tab to 'home' only if we navigate to the homepage proper
  useEffect(() => {
    if (pathname === "/" && !isCartOpen && !isSearchOpen && !isMenuOpen) {
        setActiveTab("home");
    }
  }, [pathname, isCartOpen, isSearchOpen, isMenuOpen]);

  const navItems = [
    { 
      id: "home", 
      icon: Home, 
      isLink: true, 
      href: "/",
      onClick: () => {
         // Close other overlays if we go home
         if(isCartOpen) toggleCart();
         if(isSearchOpen) toggleSearch();
         if(isMenuOpen) toggleMenu();
         setActiveTab("home");
      }
    },
    { 
      id: "search", 
      icon: Search, 
      isLink: false, 
      onClick: () => { 
          // If we are already here, do nothing or toggle off
          if (!isSearchOpen) {
              if (isCartOpen) toggleCart();
              if (isMenuOpen) toggleMenu();
              toggleSearch(); 
          }
          setActiveTab("search"); 
      }
    },
    { 
      id: "cart", 
      icon: ShoppingBag, 
      isLink: false, 
      onClick: () => { 
          if (!isCartOpen) {
              if (isSearchOpen) toggleSearch();
              if (isMenuOpen) toggleMenu();
              toggleCart(); 
          }
          setActiveTab("cart"); 
      }
    },
    { 
      id: "menu", 
      icon: Menu, 
      isLink: false, 
      onClick: () => { 
          if (!isMenuOpen) {
              if (isCartOpen) toggleCart();
              if (isSearchOpen) toggleSearch();
              toggleMenu(); 
          }
          setActiveTab("menu"); 
      }
    },
  ];

  return (
    // z-[100] ensures it sits ON TOP of the Menu/Search overlays (which are usually z-50 to z-90)
    <div className="fixed bottom-8 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
        
        <div className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl flex items-center gap-1">
            {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            const ButtonContent = (
                <div className="relative z-10 p-3 md:p-4 transition-colors duration-200">
                <Icon 
                    size={20} 
                    strokeWidth={2} 
                    className={`transition-colors duration-200 ${isActive ? "text-black" : "text-white/60 group-hover:text-white"}`} 
                />
                {item.id === "cart" && totalItems > 0 && (
                    <span className="absolute top-2 right-2 bg-rose-500 w-2 h-2 rounded-full border border-[#111111]" />
                )}
                </div>
            );

            const SlidingBackground = isActive && (
                <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            );

            return (
                <div key={item.id} className="relative group">
                {SlidingBackground}
                {item.isLink ? (
                    <Link href={item.href} onClick={item.onClick} className="block relative">
                    {ButtonContent}
                    </Link>
                ) : (
                    <button onClick={item.onClick} className="block relative">
                    {ButtonContent}
                    </button>
                )}
                </div>
            );
            })}
        </div>
    </div>
  );
}