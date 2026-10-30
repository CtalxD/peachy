// app/checkout/return/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { PaymentReturn } from "../../components/PaymentReturn";
import "../../css/Checkout.css";

export const metadata: Metadata = {
  title: "Order status | Peachy",
  robots: { index: false },
};

export default function ReturnPage() {
  return (
    <div className="py-page">
      <Navbar solid />
      <main id="top">
        <Suspense fallback={<div className="ck" aria-busy="true" />}>
          <PaymentReturn />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}