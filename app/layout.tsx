//app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}