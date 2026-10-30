//app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Peachy | Canned iced tea, peach first",
  description:
    "Peachy is canned iced tea made with real tea and ripe peach. Steeped slow, cooled fast, served cold.",
  openGraph: {
    title: "Peachy | Canned iced tea, peach first",
    description:
      "Real tea, steeped slow and cooled fast, with a ripe peach note. Open it. Drink it cold.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b1423",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* suppressHydrationWarning: browser extensions add attributes to <body> before React loads */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}