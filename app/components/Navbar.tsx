//app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "../css/Navbar.css";

const links = [
  ["Flavors", "/#flavors"],
  ["How it\u2019s made", "/#brew"],
  ["Questions", "/#faq"],
] as const;

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`py-nav${solid ? " py-nav--solid" : ""}${open ? " is-open" : ""}`}>
      <Link href="/" className="py-logo" onClick={close}>Peachy</Link>

      <button
        type="button"
        className="py-navToggle"
        aria-expanded={open}
        aria-controls="py-navMenu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span />
      </button>

      <nav id="py-navMenu" aria-label="Primary">
        {links.map(([label, href]) => (
          <Link key={label} href={href} onClick={close}>{label}</Link>
        ))}
        <Link href="/shop" className="btn btn-light btn-sm" onClick={close}>Shop</Link>
      </nav>
    </header>
  );
}