// app/pay/[method]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MockGateway } from "../../components/MockGateway";
import { isMethod } from "../../lib/payments";
import "../../css/Gateway.css";

export const metadata: Metadata = {
  title: "Test payment | Peachy",
  robots: { index: false },
};

type Params = { method: string };

/* Reading params must happen inside <Suspense>, so it lives in its own component. */
async function Gateway({ params }: { params: Promise<Params> }) {
  const { method } = await params;
  if (!isMethod(method)) notFound();
  return <MockGateway method={method} />;
}

export default function PayPage({ params }: { params: Promise<Params> }) {
  return (
    <div className="py-page">
      <main>
        <Suspense fallback={<div className="gw" aria-busy="true" />}>
          <Gateway params={params} />
        </Suspense>
      </main>
    </div>
  );
}