// app/checkout/page.tsx
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Checkout } from "../components/Checkout";
import "../css/Checkout.css";

export const metadata: Metadata = {
  title: "Checkout | Peachy",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="py-page">
      <Navbar solid />
      <main id="top">
        <Checkout />
      </main>
      <Footer />
    </div>
  );
}