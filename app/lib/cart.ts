// app/lib/cart.ts
"use client";

import { useSyncExternalStore } from "react";
import { products, FREE_SHIPPING_AT, type Product } from "../data/products";

/** Cart is a map of product slug -> number of cans. Saved in localStorage so it survives the page change to /checkout. */
export type Cart = Record<string, number>;

/** Flat shipping fee (NPR) below FREE_SHIPPING_AT. Placeholder value, replace with the real one. */
export const SHIPPING_FEE = 100;

const KEY = "peachy-cart";
const MAX_QTY = 99;
const EMPTY: Cart = {};

const listeners = new Set<() => void>();
let lastRaw: string | null = null;
let lastCart: Cart = EMPTY;

function parse(raw: string | null): Cart {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw);
    const out: Cart = {};
    for (const p of products) {
      const q = Number(data?.[p.slug]);
      if (Number.isInteger(q) && q > 0) out[p.slug] = Math.min(q, MAX_QTY);
    }
    return Object.keys(out).length ? out : EMPTY;
  } catch {
    return EMPTY;
  }
}

/* Must return the same object until the stored value changes. */
function getSnapshot(): Cart {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    /* storage blocked: behave as an empty cart */
  }
  if (raw !== lastRaw) {
    lastRaw = raw;
    lastCart = parse(raw);
  }
  return lastCart;
}

function getServerSnapshot(): Cart {
  return EMPTY;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) cb();
  };
  window.addEventListener("storage", onStorage); // other tabs
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: Cart) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked */
  }
  listeners.forEach((l) => l());
}

export function addToCart(slug: string, qty = 1) {
  const cur = getSnapshot();
  write({ ...cur, [slug]: Math.min((cur[slug] ?? 0) + qty, MAX_QTY) });
}

export function setQty(slug: string, qty: number) {
  const cur = { ...getSnapshot() };
  if (qty <= 0) delete cur[slug];
  else cur[slug] = Math.min(qty, MAX_QTY);
  write(cur);
}

export function removeFromCart(slug: string) {
  setQty(slug, 0);
}

export function clearCart() {
  write({});
}

export type CartLine = { p: Product; qty: number; lineTotal: number };

const subscribeNever = () => () => {};

export function useCart() {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  /* false during server render and hydration, true afterwards */
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);

  const lines: CartLine[] = products
    .filter((p) => cart[p.slug])
    .map((p) => ({ p, qty: cart[p.slug], lineTotal: Math.round(p.price * cart[p.slug] * 100) / 100 }));

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = Math.round(lines.reduce((n, l) => n + l.lineTotal, 0) * 100) / 100;
  const shipping = count === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  const total = Math.round((subtotal + shipping) * 100) / 100;

  return { hydrated, lines, count, subtotal, shipping, total };
}