import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import VaultLoader from "@/components/common/VaultLoader";

export const metadata: Metadata = {
  title: "PREMIUM NUTS | Luxury Gourmet Nuts & Dry Fruits Gift Hampers",
  description:
    "An extraordinary expression of nature's finest. Handcrafted luxury magnetic-closure gift hampers with custom 6-variety ingredient selection for personal and corporate gifting.",
  keywords: [
    "premium nuts gift hamper",
    "luxury dry fruits gifting",
    "corporate gift hampers",
    "festive nut boxes",
    "customizable dry fruits gift box",
    "magnetic closure gift box",
  ],
  openGraph: {
    title: "PREMIUM NUTS — The Art of Thoughtful Gifting",
    description: "Handcrafted luxury magnetic-closure gift hampers with customer-selected ingredients.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF6EF] text-[#29251F] selection:bg-[#702D3C] selection:text-[#FAF6EF]">
        <VaultLoader />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
