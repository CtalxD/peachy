// app/lib/payments.ts
export type PaymentMethod = "stripe" | "esewa";

export const METHODS: {
  id: PaymentMethod;
  label: string;
  blurb: string;
  /**
   * Path to the official logo file in /public, for example "/payments/stripe.svg".
   * Download the logos from each company's brand or press page and follow their usage rules.
   * Leave undefined to show the name as text.
   */
  logo?: string;
}[] = [
  { id: "stripe", label: "Stripe", blurb: "Credit or debit card" },
  { id: "esewa", label: "eSewa", blurb: "eSewa wallet" },
];

export const isMethod = (v: unknown): v is PaymentMethod => v === "stripe" || v === "esewa";
export const methodLabel = (m: PaymentMethod) => METHODS.find((x) => x.id === m)!.label;

export type Details = {
  email: string;
  name: string;
  address: string;
  city: string;
  region: string;
  postal: string;
  country: string;
};

export type Order = {
  id: string;
  method: PaymentMethod;
  details: Details;
  /** Total in NPR. */
  total: number;
  count: number;
  status: "pending" | "paid";
};

/* The order lives in sessionStorage so it survives the redirect to the gateway and back.
   With real gateways this moves to your server/database. */
const KEY = "peachy-order";

export function saveOrder(order: Order) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* storage blocked */
  }
}

export function loadOrder(): Order | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (typeof o?.id !== "string" || !isMethod(o?.method) || typeof o?.total !== "number" || !o?.details) return null;
    return o as Order;
  } catch {
    return null;
  }
}

export function markPaid(): Order | null {
  const o = loadOrder();
  if (!o) return null;
  const paid: Order = { ...o, status: "paid" };
  saveOrder(paid);
  return paid;
}

export async function createPayment(order: Order): Promise<{ url: string }> {
  await new Promise((r) => setTimeout(r, 500));
  return { url: `/pay/${order.method}?order=${encodeURIComponent(order.id)}` };
}