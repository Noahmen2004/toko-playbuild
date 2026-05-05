import { useState, useCallback } from "react";

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
let listeners: (() => void)[] = [];

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

export function getCartItems() {
  return globalCart;
}

export function getDeposit() {
  return globalCart.length > 0 ? DEPOSIT : 0;
}

export function getCartTotal() {
  const subtotal = globalCart.reduce((s, i) => s + i.termPrice + i.deliveryPrice, 0);
  return subtotal + getDeposit();
}

export function useCart() {
  const [, setTick] = useState(0);
  const rerender = useCallback(() => setTick((t) => t + 1), []);

  // subscribe on mount
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState(() => {
      listeners.push(rerender);
      return () => {
        listeners = listeners.filter((l) => l !== rerender);
      };
    });
  }

  return {
    items: getCartItems(),
    addToCart,
    removeFromCart,
    clearCart,
    deposit: getDeposit(),
    total: getCartTotal(),
    count: globalCart.length,
  };
}
