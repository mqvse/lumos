"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, addToCart, removeFromCart, cartTotal, clearCart } = useCartStore();
  
  // "checkout" | "success" | "cart"
  const [view, setView] = useState("cart"); 
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset view when opening/closing
  useEffect(() => {
    if (!isCartOpen) {
      // Wait for animation to finish before resetting
      const timer = setTimeout(() => setView("cart"), 500);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  // Prevent scrolling
  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
        setIsProcessing(false);
        setView("success");
        clearCart();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleCart} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#111111] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            
            {/* --- HEADER --- */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                {view === "cart" ? (
                   <h2 className="text-2xl font-serif text-white">Your Cart</h2>
                ) : (
                   <button onClick={() => setView("cart")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                      <ArrowLeft size={20} /> <span className="text-sm tracking-widest uppercase">Back</span>
                   </button>
                )}
                
                <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} className="text-white/50" />
                </button>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="flex-1 overflow-y-auto p-6 relative">
                
                {/* VIEW 1: CART ITEMS */}
                {view === "cart" && (
                    <div className="space-y-6">
                        {cart.length === 0 ? (
                            <div className="h-[50vh] flex flex-col items-center justify-center text-white/30 space-y-4">
                                <p>Your bag is empty.</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="w-20 h-24 bg-white/5 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="font-serif text-white">{item.name}</h4>
                                            <p className="text-xs text-white/50 uppercase tracking-wider">{item.category}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <p className="text-rose-300 font-mono">${item.price}</p>
                                            <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1 border border-white/10">
                                                <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white">
                                                    {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                                                </button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => addToCart(item)} className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white">
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* VIEW 2: CHECKOUT FORM */}
                {view === "checkout" && (
                    <form className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300" onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                        <div className="space-y-4">
                            <h3 className="text-white font-serif text-xl">Shipping Details</h3>
                            <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500 transition-colors" />
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500 transition-colors" />
                                <input required type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500 transition-colors" />
                            </div>
                            <input required type="text" placeholder="Address" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500 transition-colors" />
                        </div>

                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <h3 className="text-white font-serif text-xl">Payment</h3>
                             <div className="p-4 rounded-lg border border-white/10 bg-white/5 flex items-center gap-3">
                                <div className="w-8 h-5 bg-white/10 rounded flex overflow-hidden">
                                    <div className="w-1/2 bg-rose-500 h-full"></div>
                                </div>
                                <span className="text-sm text-white/50">Ending in 4242</span>
                            </div>
                        </div>
                    </form>
                )}

                {/* VIEW 3: SUCCESS */}
                {view === "success" && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
                            <CheckCircle size={40} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif text-white mb-2">Order Confirmed</h2>
                            <p className="text-white/50">Your order #LUMOS-8821 is on its way.</p>
                        </div>
                        <button onClick={toggleCart} className="mt-8 text-rose-400 hover:text-white text-sm tracking-widest uppercase border-b border-rose-400/50 pb-1">
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>

            {/* --- FOOTER (Dynamic based on view) --- */}
            {view !== "success" && cart.length > 0 && (
                <div className="p-6 bg-[#111111] border-t border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-white/50 uppercase text-xs tracking-widest">Total</span>
                        <span className="text-2xl font-serif text-white">${cartTotal().toLocaleString()}</span>
                    </div>
                    
                    {view === "cart" ? (
                        <button onClick={() => setView("checkout")} className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-rose-400 transition-colors">
                            Checkout
                        </button>
                    ) : (
                        <button 
                            onClick={handleCheckout} 
                            disabled={isProcessing}
                            className="w-full py-4 bg-rose-500 text-white font-bold tracking-widest uppercase hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? <Loader2 className="animate-spin" /> : "Pay Now"}
                        </button>
                    )}
                </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}