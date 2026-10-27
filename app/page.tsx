import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { products } from "./data/products";
import { Hero } from "./components/Hero";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

const steps = [
  ["95°C", "Steep", "Whole leaves in water just off the boil, left alone for four minutes. Longer turns it bitter."],
  ["60°C", "Press the peach", "Ripe white peach goes in while the tea is still warm enough to carry its perfume."],
  ["4°C", "Chill and can", "Cooled fast and sealed cold, so nothing cooks or dulls before it reaches you."],
];

const faqs = [
  ["Is there added sugar?", "The sweetness comes from the pressed peach. Exact sugars per can will be on the label."],
  ["Does it have caffeine?", "Classic and Ginger use black tea. Jasmine uses green tea, so it is lighter."],
  ["When can I order?", "The shop opens soon. Leave your email below and we will write once, the week it does."],
];

export default function Page() {
  return (
    <div className={`py-page ${display.variable} ${body.variable}`}>
      <header className="py-nav">
        <Link href="/" className="py-logo">Peachy</Link>
        <nav aria-label="Primary">
          <a href="#flavors">Flavors</a>
          <a href="#brew">How it&rsquo;s made</a>
          <a href="#faq">Questions</a>
          <Link href="/shop" className="btn btn-light btn-sm">Shop</Link>
        </nav>
      </header>

      <main id="top">
        <Hero />

        <section id="flavors" className="py-section">
          <h2>Same peach, three teas underneath.</h2>
          <p className="py-sub">Pick by how much tea you want in the glass.</p>
          <div className="py-grid">
            {products.map((p) => (
              <article key={p.slug} className="py-card">
                <div className={`py-stage ${p.stage}`}>
                  <Image src={p.image} alt={`Peachy ${p.name} iced tea can`} width={400} height={800} className="py-cardCan" />
                </div>
                <div className="py-cardHead">
                  <h3>{p.name}</h3>
                  <span>{p.notes}</span>
                </div>
                <p>{p.line}</p>
                <dl className="py-meters">
                  {([["Tea", p.tea], ["Peach", p.peach], ["Sweet", p.sweet]] as const).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd><meter min={0} max={5} value={v} aria-label={`${k} ${v} of 5`} /></dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/shop/${p.slug}`} className="btn btn-solid btn-block">Shop {p.name}</Link>
              </article>
            ))}
          </div>
        </section>

        <section id="brew" className="py-section py-brew">
          <h2>Hot tea in, cold can out.</h2>
          <ol>
            {steps.map(([t, h, p]) => (
              <li key={h}><span>{t}</span><h3>{h}</h3><p>{p}</p></li>
            ))}
          </ol>
          <p className="py-brewNote"><b>In the can:</b> filtered water, tea, white peach purée and lemon juice. 12 fl oz, sealed cold.</p>
        </section>

        <section id="faq" className="py-section py-faq">
          <h2>Questions people ask first.</h2>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="find" className="py-find">
          <div>
            <h2>Not in your cooler yet.</h2>
            <p>Leave your email. We&rsquo;ll write once, the week Peachy reaches your neighborhood.</p>
          </div>
          <form>
            <label htmlFor="email">Email address</label>
            <div className="py-field">
              <input id="email" type="email" placeholder="you@example.com" required />
              <button type="submit" className="btn btn-solid">Notify me</button>
            </div>
          </form>
        </section>
      </main>

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
          <span>&copy; {new Date().getFullYear()} Peachy</span>
        </div>
      </footer>
    </div>
  );
}