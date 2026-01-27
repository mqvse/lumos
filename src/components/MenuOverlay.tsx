"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Instagram, Twitter, Facebook } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export default function MenuOverlay() {
  const { isMenuOpen, toggleMenu } = useCartStore();

  const menuLinks = [
    { title: "Audio", href: "/category/audio" },
    { title: "Vision", href: "/category/vision" },
    { title: "Tactile", href: "/category/tactile" },
    { title: "About Lumos", href: "/about" },
    { title: "Support", href: "/support" },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[90] bg-[#050505] flex flex-col p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <span className="text-white/40 text-xs uppercase tracking-widest">Menu</span>
            <button 
                onClick={toggleMenu}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
                <X size={24} />
            </button>
          </div>

          {/* Big Links */}
          <nav className="flex-1 flex flex-col justify-center space-y-6">
            {menuLinks.map((link, i) => (
                <Link 
                    key={i} 
                    href={link.href}
                    onClick={toggleMenu}
                    className="group flex items-center gap-4"
                >
                    <span className="text-5xl md:text-7xl font-serif text-white/50 group-hover:text-white transition-colors duration-300">
                        {link.title}
                    </span>
                    <ArrowUpRight 
                        size={32} 
                        className="text-white/0 group-hover:text-rose-400 transition-all duration-300 -translate-x-4 group-hover:translate-x-0" 
                    />
                </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 pt-8 flex justify-between items-end">
            <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Connect</p>
                <div className="flex gap-4 text-white">
                    <Instagram size={20} />
                    <Twitter size={20} />
                    <Facebook size={20} />
                </div>
            </div>
            <p className="text-white/20 text-[10px] uppercase tracking-widest">
                © 2026 Lumos Inc.
            </p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}