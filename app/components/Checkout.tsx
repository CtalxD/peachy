// app/components/Checkout.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { money, stageGradient, CAN_W, CAN_H, FREE_SHIPPING_AT } from "../data/products";
import { useCart, setQty, removeFromCart } from "../lib/cart";
import {
  METHODS, createPayment, loadOrder, methodLabel, saveOrder,
  type Details, type Order, type PaymentMethod,
} from "../lib/payments";

type Step = "details" | "payment";

const NO_DETAILS: Details = { email: "", name: "", address: "", city: "", region: "", postal: "", country: "" };

const STEPS: [string, string][] = [
  ["details", "Details"],
  ["payment", "Payment"],
  ["confirmation", "Confirmation"],
];

export function Checkout() {
  const { hydrated, lines, count, subtotal, shipping, total } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<Details>(NO_DETAILS);
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  /* coming back from a failed or cancelled payment: keep what they typed */
  useEffect(() => {
    const o = loadOrder();
    if (o && o.status === "pending") {
      setDetails(o.details);
      setMethod(o.method);
    }
  }, []);

  /* the browser back button from the gateway can restore this page mid-redirect */
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => { if (e.persisted) setBusy(false); };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  /* move focus to the heading when the step changes (not on first load) */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    headingRef.current?.focus();
  }, [step]);

  if (!hydrated) return <div className="ck" aria-busy="true" />;

  if (count === 0) {
    return (
      <div className="ck ck-empty">
        <h1>Your cart is empty.</h1>
        <p>Pick a flavor and it will show up here.</p>
        <Link href="/shop" className="btn btn-lg btn-solid">Shop Peachy</Link>
      </div>
    );
  }

  const onDetails = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: keyof Details) => String(f.get(k) ?? "").trim();
    setDetails({
      email: get("email"), name: get("name"), address: get("address"),
      city: get("city"), region: get("region"), postal: get("postal"), country: get("country"),
    });
    setStep("payment");
  };

  const pay = async () => {
    setBusy(true);
    setError("");
    try {
      const order: Order = {
        id: `PCH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        method, details, total, count, status: "pending",
      };
      saveOrder(order);
      const { url } = await createPayment(order);
      window.location.assign(url);
    } catch {
      setError("We couldn’t start the payment. Please try again.");
      setBusy(false);
    }
  };

  const stepIdx = step === "details" ? 0 : 1;

  return (
    <div className="ck">
      <ol className="ck-steps" aria-label="Checkout progress">
        {STEPS.map(([id, label], k) => (
          <li
            key={id}
            aria-current={k === stepIdx ? "step" : undefined}
            className={k < stepIdx ? "is-past" : k === stepIdx ? "is-now" : ""}
          >
            <span>{k + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="ck-grid">
        <div className="ck-main">
          {step === "details" && (
            <form onSubmit={onDetails}>
              <h1 ref={headingRef} tabIndex={-1}>Where should we send it?</h1>

              <div className="ck-fields">
                <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={details.email} wide />
                <Field label="Full name" name="name" autoComplete="name" defaultValue={details.name} wide />
                <Field label="Address" name="address" autoComplete="address-line1" defaultValue={details.address} wide />
                <Field label="City" name="city" autoComplete="address-level2" defaultValue={details.city} />
                <Field label="State / province" name="region" autoComplete="address-level1" defaultValue={details.region} />
                <Field label="Postal code" name="postal" autoComplete="postal-code" defaultValue={details.postal} />
                <Field label="Country" name="country" autoComplete="country-name" defaultValue={details.country} />
              </div>

              <button type="submit" className="btn btn-lg btn-solid ck-cta">Continue to payment</button>
            </form>
          )}

          {step === "payment" && (
            <div>
              <h1 ref={headingRef} tabIndex={-1}>Payment</h1>

              <dl className="ck-recap">
                <div>
                  <dt>Contact</dt>
                  <dd>{details.email}</dd>
                </div>
                <div>
                  <dt>Ship to</dt>
                  <dd>
                    {details.name}, {details.address}, {details.city}, {details.region} {details.postal}, {details.country}
                  </dd>
                </div>
              </dl>
              <button type="button" className="ck-link" onClick={() => setStep("details")}>Edit details</button>

              <fieldset className="ck-methods">
                <legend>Pay with</legend>
                {METHODS.map((m) => (
                  <label key={m.id} className={`ck-method${m.id === method ? " is-on" : ""}`}>
                    <input
                      type="radio"
                      name="method"
                      value={m.id}
                      checked={m.id === method}
                      onChange={() => setMethod(m.id)}
                    />
                    <span>
                      {m.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={m.logo} alt={m.label} className="ck-methodLogo" />
                      ) : (
                        <b>{m.label}</b>
                      )}
                      <small>{m.blurb}</small>
                    </span>
                    <em>{money(total)}</em>
                  </label>
                ))}
              </fieldset>

              <div className="ck-pay">
                <p>
                  <b>Test mode.</b> You&rsquo;ll be sent to a dummy {methodLabel(method)} page where you choose the result.
                  No real payment happens.
                </p>
              </div>

              {error && <p className="ck-error" role="alert">{error}</p>}

              <button type="button" className="btn btn-lg btn-solid ck-cta" onClick={pay} disabled={busy}>
                {busy ? "Redirecting…" : `Pay with ${methodLabel(method)} · ${money(total)}`}
              </button>
            </div>
          )}
        </div>

        <aside className="ck-summary" aria-label="Order summary">
          <h2>Your order</h2>
          <ul className="ck-lines">
            {lines.map(({ p, qty, lineTotal }) => (
              <li key={p.slug}>
                <div className="ck-thumb" style={{ background: stageGradient(p) }}>
                  <Image src={p.image} alt="" width={CAN_W} height={CAN_H} sizes="64px" />
                </div>
                <div className="ck-lineInfo">
                  <b>{p.name}</b>
                  <span>{money(p.price)} / can</span>
                  {step === "details" ? (
                    <div className="ck-qty">
                      <button type="button" aria-label={`Fewer ${p.name}`} onClick={() => setQty(p.slug, qty - 1)}>&minus;</button>
                      <span aria-live="polite">{qty}</span>
                      <button type="button" aria-label={`More ${p.name}`} onClick={() => setQty(p.slug, qty + 1)}>+</button>
                      <button type="button" className="ck-link" onClick={() => removeFromCart(p.slug)}>Remove</button>
                    </div>
                  ) : (
                    <span>Qty {qty}</span>
                  )}
                </div>
                <p className="ck-lineTotal">{money(lineTotal)}</p>
              </li>
            ))}
          </ul>

          <dl className="ck-totals">
            <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
            <div className="ck-grand"><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
          {shipping > 0 && (
            <p className="ck-hint">Add {money(FREE_SHIPPING_AT - subtotal)} more for free shipping.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", autoComplete, defaultValue, wide,
}: {
  label: string;
  name: keyof Details;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  wide?: boolean;
}) {
  return (
    <div className={`ck-field${wide ? " is-wide" : ""}`}>
      <label htmlFor={`ck-${name}`}>{label}</label>
      <input id={`ck-${name}`} name={name} type={type} autoComplete={autoComplete} defaultValue={defaultValue} required />
    </div>
  );
}