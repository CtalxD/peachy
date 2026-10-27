// app/data/products.ts
export type Product = {
  slug: string;
  name: string;
  line: string;
  notes: string;
  tea: number;
  peach: number;
  sweet: number;
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

/* Single source of truth. The /shop and /shop/[slug] pages can import this later. */
export const products: Product[] = [
  {
    slug: "classic",
    name: "Classic",
    line: "Assam black tea steeped long, white peach pressed in at the end. Start here.",
    notes: "Malty, ripe, clean finish",
    tea: 4, peach: 4, sweet: 2,
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