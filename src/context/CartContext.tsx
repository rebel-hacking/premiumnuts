"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HamperCartItem, HamperSize, Ingredient } from "@/types";

interface CartContextType {
  cart: HamperCartItem[];
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (size: HamperSize, selectedIngredients: Ingredient[], quantity?: number) => void;
  buyNow: (size: HamperSize, selectedIngredients: Ingredient[], quantity?: number) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItemCount: number;
  subtotal: number;
  originalTotal: number;
  totalSavings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "premium_nuts_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<HamperCartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage safely on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to parse cart from storage", e);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage on updates
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.warn("Failed to persist cart", e);
      }
    }
  }, [cart, isHydrated]);

  const generateItemId = (sizeId: string, ingredients: Ingredient[]) => {
    const ingIds = ingredients.map((i) => i.id).sort().join("-");
    return `${sizeId}_${ingIds}`;
  };

  const addToCart = (
    size: HamperSize,
    selectedIngredients: Ingredient[],
    quantity: number = 1
  ) => {
    if (selectedIngredients.length !== 6) return;

    const itemId = generateItemId(size.id, selectedIngredients);

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === itemId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: itemId,
          size,
          selectedIngredients,
          quantity,
          unitPrice: size.price,
          unitOriginalPrice: size.originalPrice,
        },
      ];
    });

    setIsCartDrawerOpen(true);
  };

  const buyNow = (
    size: HamperSize,
    selectedIngredients: Ingredient[],
    quantity: number = 1
  ) => {
    addToCart(size, selectedIngredients, quantity);
    // Direct navigate to /cart or open drawer
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cart.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  const originalTotal = cart.reduce((acc, it) => acc + it.unitOriginalPrice * it.quantity, 0);
  const totalSavings = originalTotal - subtotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        addToCart,
        buyNow,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        originalTotal,
        totalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

