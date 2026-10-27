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
  stage: string;
  theme: { a: string; b: string; glow: string };
};

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
    theme: { a: "#2b1423", b: "#1a0b14", glow: "#6a3550" },
    stage: "py-stageClassic",
  },
  {
    slug: "jasmine",
    name: "Jasmine",
    line: "Green tea layered with jasmine blossom. Quiet and floral; the peach arrives on the finish.",
    notes: "Floral, light, soft peach",
    tea: 2, peach: 3, sweet: 2,
    image: "/Jasmine.png",
    hero: "/Jasmine.png",
    theme: { a: "#16281a", b: "#0d1a10", glow: "#3f6a47" },
    stage: "py-stageJasmine",
  },
  {
    slug: "ginger",
    name: "Ginger",
    line: "Strong black tea with fresh ginger that bites a little. Peach softens it without sweetening it away.",
    notes: "Bold, warming, dry",
    tea: 4, peach: 3, sweet: 1,
    image: "/Ginger.png",
    hero: "/Ginger.png",
    theme: { a: "#3a0f1c", b: "#220811", glow: "#9a3550" },
    stage: "py-stageGinger",
  },
];