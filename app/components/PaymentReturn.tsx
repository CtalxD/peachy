// app/components/PaymentReturn.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clearCart } from "../lib/cart";
import { money } from "../data/products";
import { loadOrder, methodLabel, type Order } from "../lib/payments";

export function PaymentReturn() {
  const status = useSearchParams().get("status");
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const o = loadOrder();
    setOrder(o);
    /* Only a paid order empties the cart. Safe to run twice (refresh, strict mode). */
    if (o?.status === "paid" && status === "success") clearCart();
  }, [status]);

  useEffect(() => {
    if (order !== undefined) headingRef.current?.focus();
  }, [order]);

  if (order === undefined) return <div className="ck" aria-busy="true" />;

  /* The query string alone is never trusted: the order has to be marked paid. */
  if (status === "success" && order?.status === "paid") {
    return (
      <div className="ck ck-done">
        <h1 ref={headingRef} tabIndex={-1}>Thank you. Order {order.id} is in.</h1>
        <p>
          {order.count} {order.count === 1 ? "can" : "cans"} &middot; {money(order.total)} paid with{" "}
          {methodLabel(order.method)}. A confirmation will go to {order.details.email}.
        </p>
        <Link href="/shop" className="btn btn-lg btn-solid">Keep shopping</Link>
      </div>
    );
  }

  const cancelled = status === "cancelled";
  const unconfirmed = status === "success";

  return (
    <div className="ck ck-done">
      <h1 ref={headingRef} tabIndex={-1}>
        {cancelled ? "Payment cancelled." : unconfirmed ? "We couldn’t confirm that payment." : "Payment didn’t go through."}
      </h1>
      <p>
        {cancelled
          ? "Nothing was charged and your cart is still here."
          : "Nothing was charged and your cart is still here. You can try again or pick the other payment method."}
      </p>
      <Link href="/checkout" className="btn btn-lg btn-solid">Back to checkout</Link>
    </div>
  );
}