//app/data/products.ts
export type Product = {
  slug: string;
  name: string;
  line: string;
  notes: string;
  tea: number;
  peach: number;
  sweet: number;
  /** Price in NPR for one 12 fl oz can. Placeholder values, replace with real ones. */
  price: number;
  /** Tea base, used by the shop filter. */
  type: "black" | "green";
  /** Small label shown on the shop card. */
  tag: string;
  image: string;
  hero: string;
  /** Gradient stops shared by the hero and the flavor card stage. */
  bg: { from: string; to: string };
  /** Brightness of `bg`: "light" backgrounds get dark text, "dark" ones get light text. */
  tone: "light" | "dark";
  /** Hero heading and control color, tuned for this flavor's background (WCAG AA). */
  ink: string;
  /** Hero body text color, tuned for this flavor's background (WCAG AA). */
  inkSoft: string;
};

/**
 * Real pixel size of the can PNGs in /public. Keep in sync with the
 * `aspect-ratio` lines for .py-heroCan and .py-cardCan in globals.css.
 */
export const CAN_W = 800;
export const CAN_H = 1200;

/* Single source of truth for the landing page, the shop and the cart. */
export const products: Product[] = [
  {
    slug: "classic",
    name: "Classic",
    line: "Assam black tea steeped long, white peach pressed in at the end. Start here.",
    notes: "Malty, ripe, clean finish",
    tea: 4, peach: 4, sweet: 2,
    price: 400,
    type: "black",
    tag: "Best seller",
    image: "/Classic.png",
    hero: "/Classic.png",
    bg: { from: "#f1d9d4", to: "#dfb8b3" },
    tone: "light",
    ink: "#3a1520",      // deep wine on pink
    inkSoft: "#5a2f36",
  },
  {
    slug: "jasmine",
    name: "Jasmine",
    line: "Green tea layered with jasmine blossom. Quiet and floral; the peach arrives on the finish.",
    notes: "Floral, light, soft peach",
    tea: 2, peach: 3, sweet: 2,
    price: 400,
    type: "green",
    tag: "Lightest",
    image: "/Jasmine.png",
    hero: "/Jasmine.png",
    bg: { from: "#c9d9c2", to: "#9db592" },
    tone: "light",
    ink: "#16301b",      // deep forest on green
    inkSoft: "#2a4228",
  },
  {
    slug: "ginger",
    name: "Ginger",
    line: "Strong black tea with fresh ginger that bites a little. Peach softens it without sweetening it away.",
    notes: "Bold, warming, dry",
    tea: 4, peach: 3, sweet: 1,
    price: 425,
    type: "black",
    tag: "Boldest",
    image: "/Ginger.png",
    hero: "/Ginger.png",
    bg: { from: "#5a3347", to: "#2b1423" },
    tone: "dark",
    ink: "#f3ebe6",
    inkSoft: "#e2d5da",
  },
];

/** The exact gradient used behind a can, in the hero and in the flavor cards. */
export const stageGradient = (p: Product) =>
  `linear-gradient(180deg, ${p.bg.from}, ${p.bg.to})`;

/* ---------- shop ---------- */

export type Pack = {
  id: "4" | "12" | "24";
  cans: number;
  label: string;
  /** Discount off the single-can price, 0.1 = 10%. */
  off: number;
};

export const packs: Pack[] = [
  { id: "4", cans: 4, label: "4-pack", off: 0 },
  { id: "12", cans: 12, label: "12-pack", off: 0.1 },
  { id: "24", cans: 24, label: "24-pack", off: 0.15 },
];

/** Orders at or above this subtotal (NPR) ship free. Placeholder, replace with the real value. */
export const FREE_SHIPPING_AT = 2000;

/** Whole rupees, Indian-style digit grouping (1,00,000) which is how NPR is written. */
export const money = (n: number) => `NPR ${Math.round(n).toLocaleString("en-IN")}`;

export const packPrice = (unit: number, pack: Pack) =>
  Math.round(unit * pack.cans * (1 - pack.off));

/** Variety pack: 12 cans, 4 of each flavor, at the 12-pack discount. */
export const VARIETY_CANS = 12;
const avgUnit = products.reduce((sum, p) => sum + p.price, 0) / products.length;
export const varietyPrice =
  Math.round(avgUnit * VARIETY_CANS * (1 - packs[1].off));