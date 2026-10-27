// app/components/Footer.tsx
import Link from "next/link";
import "../css/Footer.css";

export function Footer() {
  return (
    <footer className="py-footer">
      <div className="py-footTop">
        <Link href="/" className="py-logo">Peachy</Link>
        <nav aria-label="Footer">
          <Link href="/shop">Shop</Link>
          <a href="#flavors">Flavors</a>
          <a href="#faq">Questions</a>
        </nav>
      </div>
      <div className="py-footMeta">
        <span>Canned iced tea. Serve cold.</span>
      </div>
    </footer>
  );
}