// app/components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { products, stageGradient, CAN_W, CAN_H } from "../data/products";

/* Rounded chevron for the circular buttons. Mirrored for "next". */
function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={dir === "next" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M14.5 5 7.5 12l7 7" />
    </svg>
  );
}

export function Hero({ nav }: { nav?: ReactNode }) {
  const [i, setI] = useState(0);
  const active = products[i];
  const go = (step: number) => setI((n) => (n + step + products.length) % products.length);

  return (
    <section
      className="py-hero"
      data-tone={active.tone}
      style={
        {
          "--hero-ink": active.ink,
          "--hero-ink-soft": active.inkSoft,
        } as CSSProperties
      }
    >
      {products.map((p, k) => (
        <div
          key={p.slug}
          aria-hidden="true"
          className={`py-heroBg ${k === i ? "is-on" : ""}`}
          style={{ background: stageGradient(p) }}
        />
      ))}

      {nav}

      <div className="py-heroCopy">
        <h1>Iced tea that tastes like the peach.</h1>
        <p key={active.slug} className="py-heroLine" aria-live="polite">
          <strong>{active.name}.</strong> {active.line}
        </p>
        <div className="py-actions">
          <Link href={`/shop/${active.slug}`} className="btn btn-lg btn-light">Shop {active.name}</Link>
          <a href="#flavors" className="btn btn-lg btn-outline">Compare flavors</a>
        </div>
      </div>

      <div className="py-heroArt">
        <button
          type="button"
          className="py-arrow py-arrowPrev"
          onClick={() => go(-1)}
          aria-label="Previous flavor"
        >
          <Chevron dir="prev" />
        </button>

        <Image
          key={active.slug}
          src={active.hero}
          alt={`Peachy ${active.name} iced tea can`}
          width={CAN_W}
          height={CAN_H}
          sizes="(max-width: 900px) 60vw, 30vw"
          priority
          className="py-heroCan"
        />

        <button
          type="button"
          className="py-arrow py-arrowNext"
          onClick={() => go(1)}
          aria-label="Next flavor"
        >
          <Chevron dir="next" />
        </button>
      </div>
    </section>
  );
}