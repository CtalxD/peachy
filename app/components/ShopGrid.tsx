// app/components/ShopGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  products, packs, packPrice, money, stageGradient,
  varietyPrice, VARIETY_CANS, FREE_SHIPPING_AT, CAN_W, CAN_H,
  type Product, type Pack,
} from "../data/products";

type Cart = Record<string, { total: number; qty: number }>;
type Add = (key: string, total: number, message: string) => void;

function Tile({ p, onAdd }: { p: Product; onAdd: Add }) {
  const [packId, setPackId] = useState<Pack["id"]>("12");
  const pack = packs.find((k) => k.id === packId)!;
  const total = packPrice(p.price, pack);

  return (
    <article className="sp-tile">
      <div className="sp-stage" style={{ background: stageGradient(p) }}>
        <Image
          src={p.image}
          alt={`Peachy ${p.name} iced tea can`}
          width={CAN_W}
          height={CAN_H}
          sizes="(max-width: 720px) 70vw, 30vw"
          className="sp-can"
        />
      </div>

      <div className="sp-head">
        <h2>{p.name}</h2>
        <p className="sp-price">{money(total / pack.cans)} <span>/ can</span></p>
      </div>
      <p className="sp-notes">{p.notes}</p>

      <fieldset className="sp-packs">
        <legend className="sp-sr">Pack size for {p.name}</legend>
        {packs.map((k) => (
          <label key={k.id} className="sp-pack">
            <input
              type="radio"
              name={`pack-${p.slug}`}
              checked={k.id === packId}
              onChange={() => setPackId(k.id)}
            />
            <span>
              {k.label}
              <small>{k.off ? `Save ${Math.round(k.off * 100)}%` : "\u00A0"}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <button
        type="button"
        className="btn btn-solid sp-add"
        onClick={() => onAdd(`${p.slug}-${pack.id}`, total, `${pack.label} of ${p.name}`)}
      >
        Add to cart &middot; {money(total)}
      </button>
    </article>
  );
}

export function ShopGrid() {
  const [cart, setCart] = useState<Cart>({});
  const [status, setStatus] = useState("");

  const add: Add = (key, total, message) => {
    setCart((c) => ({ ...c, [key]: { total, qty: (c[key]?.qty ?? 0) + 1 } }));
    setStatus(`${message} added to cart`);
  };

  const items = Object.values(cart);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.total * i.qty, 0);

  return (
    <>
      <div className="sp-grid">
        {products.map((p) => <Tile key={p.slug} p={p} onAdd={add} />)}
      </div>

      <div className="sp-variety">
        <div>
          <h2>Can&rsquo;t pick? Try all three.</h2>
          <p>{VARIETY_CANS} cans, four of each flavor, {money(varietyPrice)}.</p>
        </div>
        <button
          type="button"
          className="btn btn-lg btn-solid"
          onClick={() => add("variety", varietyPrice, "Variety pack")}
        >
          Add variety pack
        </button>
      </div>

      {count > 0 && (
        <>
          <div className="sp-spacer" />
          <div className="sp-cart">
            <p>
              <b>{count} {count === 1 ? "item" : "items"} &middot; {money(subtotal)}</b>
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
        </>
      )}

      <p className="sp-sr" role="status" aria-live="polite">{status}</p>
    </>
  );
}