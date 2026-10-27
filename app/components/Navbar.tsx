// app/components/Navbar.tsx
import Link from "next/link";
import "../css/Navbar.css";

export function Navbar() {
  return (
    <header className="py-nav">
      <Link href="/" className="py-logo">Peachy</Link>
      <nav aria-label="Primary">
        <a href="#flavors">Flavors</a>
        <a href="#brew">How it&rsquo;s made</a>
        <a href="#faq">Questions</a>
        <Link href="/shop" className="btn btn-light btn-sm">Shop</Link>
      </nav>
    </header>
  );
}