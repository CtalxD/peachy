// app/shop/page.tsx
import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { ShopHero } from "../components/ShopHero";
import "../css/Shop.css";

export const metadata: Metadata = {
  title: "Shop | Peachy",
  description: "Three canned iced teas, one white peach. Pick by how much tea you want in the glass.",
};

export default function ShopPage() {
  return (
    <div className="py-page">
      <main id="top">
        <ShopHero />
      </main>
      <Footer />
    </div>
  );
}