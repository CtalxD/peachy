// app/components/MockGateway.tsx
// Stand-in for the hosted Stripe / eSewa payment page. Development only.
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { money } from "../data/products";
import { loadOrder, markPaid, methodLabel, type Order, type PaymentMethod } from "../lib/payments";

export function MockGateway({ method }: { method: PaymentMethod }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(loadOrder());
  }, []);

  const name = methodLabel(method);
  const back = (status: "success" | "failed" | "cancelled") => router.push(`/checkout/return?status=${status}`);

  /* Stands in for the gateway confirming the payment to the server. */
  const succeed = () => {
    markPaid();
    back("success");
  };

  return (
    <div className="gw">
      <div className="gw-card">
        <div className="gw-head">
          <b>{name}</b>
          <span>Test mode</span>
        </div>
        <p className="gw-banner">Dummy gateway for development. No real payment happens here.</p>

        {order === undefined ? (
          <div className="gw-body" aria-busy="true" />
        ) : !order || order.method !== method ? (
          <div className="gw-body">
            <p>There is no pending order for {name}. Start again from the shop.</p>
            <Link href="/shop" className="gw-btn gw-primary">Back to shop</Link>
          </div>
        ) : (
          <div className="gw-body">
            <dl className="gw-rows">
              <div><dt>Merchant</dt><dd>Peachy</dd></div>
              <div><dt>Order</dt><dd>{order.id}</dd></div>
              <div><dt>Items</dt><dd>{order.count} {order.count === 1 ? "can" : "cans"}</dd></div>
              <div className="gw-amount"><dt>Amount</dt><dd>{money(order.total)}</dd></div>
            </dl>

            <p className="gw-label">Choose a test result</p>
            <button type="button" className="gw-btn gw-primary" onClick={succeed}>Simulate successful payment</button>
            <button type="button" className="gw-btn" onClick={() => back("failed")}>Simulate failed payment</button>
            <button type="button" className="gw-cancel" onClick={() => back("cancelled")}>Cancel and return to Peachy</button>
          </div>
        )}
      </div>
    </div>
  );
}