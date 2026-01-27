import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = Product & { quantity: number };

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  isSearchOpen: boolean; // <--- 1. NEW STATE
  isMenuOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  toggleSearch: () => void; // <--- 2. NEW ACTION
  cartTotal: () => number;
  clearCart: () => void;
  toggleMenu: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isCartOpen: false,
  isSearchOpen: false, // <--- 3. INITIAL VALUE
  isMenuOpen: false,

  addToCart: (product) => set((state) => {
    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })), // <--- 4. THE LOGIC

    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  clearCart: () => set({ cart: [] }),
}));