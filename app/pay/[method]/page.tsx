// app/pay/[method]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MockGateway } from "../../components/MockGateway";
import { isMethod } from "../../lib/payments";
import "../../css/Gateway.css";

export const metadata: Metadata = {
  title: "Test payment | Peachy",
  robots: { index: false },
};  

type Params = { method: string };

/* params is a Promise in newer Next versions and a plain object in older ones; await handles both. */
export default async function PayPage({ params }: { params: Params | Promise<Params> }) {
  const { method } = await params;
  if (!isMethod(method)) notFound();

  return (
    <div className="py-page">
      <main>
        <MockGateway method={method} />
      </main>
    </div>
  );
}