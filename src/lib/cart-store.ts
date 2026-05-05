import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  startDate: Date;
  termLabel: string;
  termPrice: number;
  deliveryMethod: "flatpack" | "assembled";
  deliveryPrice: number;
}

const DEPOSIT = 50;

let globalCart: CartItem[] = [];
let listeners: Set<() => void> = new Set();

function notify() {
  listeners.forEach((l) => l());
}

export function addToCart(item: CartItem) {
  globalCart = [...globalCart, item];
  notify();
}

export function removeFromCart(id: string) {
  globalCart = globalCart.filter((i) => i.id !== id);
  notify();
}

export function clearCart() {
  globalCart = [];
  notify();
}

export function useCart() {
  const [, setTick] = useState(0);
  const rerender = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    listeners.add(rerender);
    return () => { listeners.delete(rerender); };
  }, [rerender]);

  const items = globalCart;
  const deposit = items.length > 0 ? DEPOSIT : 0;
  const subtotal = items.reduce((s, i) => s + i.termPrice + i.deliveryPrice, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    deposit,
    total: subtotal + deposit,
    count: items.length,
  };
}
