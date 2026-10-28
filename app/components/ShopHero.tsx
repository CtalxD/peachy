// app/components/ShopHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { products, money, stageGradient, FREE_SHIPPING_AT, CAN_W, CAN_H } from "../data/products";
import { Navbar } from "./Navbar";

const POS = ["front", "right", "left"] as const;

export function ShopHero() {
  const [i, setI] = useState(0);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [status, setStatus] = useState("");
  const active = products[i];

  const count = Object.values(cart).reduce((n, q) => n + q, 0);
  const subtotal = products.reduce((n, p) => n + p.price * (cart[p.slug] ?? 0), 0);

  const add = () => {
    setCart((c) => ({ ...c, [active.slug]: (c[active.slug] ?? 0) + 1 }));
    setStatus(`${active.name} added to cart`);
  };

  return (
    <section
      className={`sp-hero${count > 0 ? " has-cart" : ""}`}
      data-tone={active.tone}
      style={{ "--hero-ink": active.ink, "--hero-ink-soft": active.inkSoft } as CSSProperties}
    >
      {products.map((p, k) => (
        <div
          key={p.slug}
          aria-hidden="true"
          className={`sp-bg${k === i ? " is-on" : ""}`}
          style={{ background: stageGradient(p) }}
        />
      ))}

      <Navbar />

      <div className="sp-copy">
        <h1>{active.name}</h1>

        <div key={active.slug} className="sp-text">
          <p className="sp-notes">{active.notes}</p>
          <p className="sp-line">{active.line}</p>
          <p className="sp-price">{money(active.price)} <span>/ 12 fl oz can</span></p>
        </div>

        <div className="sp-chips" role="group" aria-label="Choose a flavor">
          {products.map((p, k) => (
            <button
              key={p.slug}
              type="button"
              className="sp-chip"
              aria-pressed={k === i}
              onClick={() => setI(k)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <button type="button" className="btn btn-lg btn-light sp-add" onClick={add}>
          Add to cart
        </button>
      </div>

      <div className="sp-cans">
        {products.map((p, k) => {
          const pos = POS[(k - i + products.length) % products.length];
          return (
            <button
              key={p.slug}
              type="button"
              className="sp-can"
              data-pos={pos}
              aria-pressed={k === i}
              aria-label={`Select ${p.name}`}
              onClick={() => setI(k)}
            >
              <Image
                src={p.image}
                alt=""
                width={CAN_W}
                height={CAN_H}
                sizes="(max-width: 900px) 45vw, 25vw"
                priority
              />
            </button>
          );
        })}
      </div>

      {count > 0 && (
        <div className="sp-cart">
          <p>
            <b>{count} {count === 1 ? "can" : "cans"} &middot; {money(subtotal)}</b>
            <small>
              {subtotal >= FREE_SHIPPING_AT
                ? "Free shipping unlocked. Checkout opens soon."
                : `${money(FREE_SHIPPING_AT - subtotal)} away from free shipping. Checkout opens soon.`}
            </small>
          </p>
          <div className="sp-cartActions">
            <button type="button" className="sp-clear" onClick={() => { setCart({}); setStatus("Cart cleared"); }}>
              Clear
            </button>
            <Link href="/#find" className="btn btn-light btn-sm">Get notified</Link>
          </div>
        </div>
      )}

      <p className="sp-sr" role="status" aria-live="polite">{status}</p>
    </section>
  );
}