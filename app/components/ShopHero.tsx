// app/components/ShopHero.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import { products, money, stageGradient, CAN_W, CAN_H } from "../data/products";
import { addToCart } from "../lib/cart";
import { Navbar } from "./Navbar";

const POS = ["front", "right", "left"] as const;

export function ShopHero() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const active = products[i];

  /* Save the can, then go straight to checkout. */
  const add = () => {
    addToCart(active.slug);
    router.push("/checkout");
  };

  return (
    <section
      className="sp-hero"
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
    </section>
  );
}