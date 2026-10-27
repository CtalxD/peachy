"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { products } from "../data/products";

export function Hero() {
  const [i, setI] = useState(0);
  const active = products[i];

  function tilt(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 14}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 10}deg`);
  }
  function reset(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  }

  return (
    <section className="py-hero">
      {products.map((p, k) => (
        <div
          key={p.slug}
          aria-hidden="true"
          className={`py-heroBg ${k === i ? "is-on" : ""}`}
          style={{
            background: `radial-gradient(ellipse 55% 65% at 72% 52%, ${p.theme.glow} 0%, ${p.theme.a} 45%, ${p.theme.b} 100%)`,
          }}
        />
      ))}

      <div className="py-heroCopy">
        <h1>Iced tea that tastes like the peach.</h1>
        <p key={active.slug} className="py-heroLine">
          <strong>{active.name}.</strong> {active.line}
        </p>
        <div className="py-actions">
          <Link href={`/shop/${active.slug}`} className="btn btn-lg btn-light">Shop {active.name}</Link>
          <a href="#flavors" className="btn btn-lg btn-outline">Compare flavors</a>
        </div>

        <div className="py-picker" role="group" aria-label="Choose a flavor">
          {products.map((p, k) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={k === i}
              onClick={() => setI(k)}
              className="py-pick"
            >
              <Image src={p.image} alt="" width={40} height={80} />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="py-heroArt" onPointerMove={tilt} onPointerLeave={reset}>
        <div className="py-heroGlow" style={{ background: active.theme.glow }} />
        <div className="py-heroTilt">
          <Image
            key={active.slug}
            src={active.hero}
            alt={`Peachy ${active.name} iced tea can`}
            width={800}
            height={1200}
            priority
            className="py-heroCan"
          />
        </div>
      </div>
    </section>
  );
}