"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="w-full py-4 overflow-hidden border-y border-white/5 bg-[#111111]/30 backdrop-blur-sm relative z-10">
      {/* Container for the scrolling text */}
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: "-50%" }}
        transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 // Adjust speed here (lower = faster)
        }}
      >
        {/* We repeat the text so it loops seamlessly */}
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-white/50 mx-8">
            High Fidelity Audio & Vision • Future Tech • Lumos Drop 01 •
          </span>
        ))}
      </motion.div>
    </div>
  );
}