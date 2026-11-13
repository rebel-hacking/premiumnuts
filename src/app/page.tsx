"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import WalnutScrollytelling from "@/components/hero/WalnutScrollytelling";
import SignatureHamperHeroSection from "@/components/home/SignatureHamperHeroSection";
import ChooseYourGoodnessSection from "@/components/home/ChooseYourGoodnessSection";
import CorporateGiftingSection from "@/components/corporate/CorporateGiftingSection";
import OccasionsSection from "@/components/occasions/OccasionsSection";
import PackagingShowcase from "@/components/packaging/PackagingShowcase";
import WhyPremiumNuts from "@/components/why/WhyPremiumNuts";
import SeasonalOffersSection from "@/components/offers/SeasonalOffersSection";
import BrandHeritage from "@/components/story/BrandHeritage";
import FinalHomeCTA from "@/components/home/FinalHomeCTA";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Home() {
  const handleScrollToHamper = () => {
    const el = document.getElementById("hamper");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#702D3C] selection:text-[#FAF6EF]">
      {/* Global Minimalist Luxury Navbar */}
      <Navbar />

      {/* Slide-out Cart Drawer with WhatsApp Order Integration */}
      <CartDrawer />

      {/* Section 1: Animated Walnut Scrollytelling Hero (Preserved with Single CTA: EXPLORE OUR HAMPER) */}
      <WalnutScrollytelling onExploreHamper={handleScrollToHamper} />

      {/* Section 2: Signature Gift Hamper Showcase (Flagship product, 3 sizes, prices) */}
      <SignatureHamperHeroSection />

      {/* Section 3: Choose Your Goodness (13 Varieties preview & customizer invitation) */}
      <ChooseYourGoodnessSection />

      {/* Section 4: Corporate Gifting (Employee, client appreciation, bulk quote CTA) */}
      <CorporateGiftingSection />

      {/* Section 5: Gifting for Every Occasion (Horizontal interactive card section) */}
      <OccasionsSection />

      {/* Section 6: The Art of Packaging (Magnetic closure, gold tray, unboxing) */}
      <PackagingShowcase />

      {/* Section 7: Why Premium Nuts? (Curated ingredients, 6 choices, 3 sizes, magnetic box) */}
      <WhyPremiumNuts />

      {/* Section 8: Seasonal Offers (Dynamically managed from offers.json) */}
      <SeasonalOffersSection />

      {/* Section 9: Brand Storytelling (Maison philosophy & heritage) */}
      <BrandHeritage />

      {/* Section 10: Final CTA ("Make Your Next Gift Unforgettable") */}
      <FinalHomeCTA />

      {/* Section 11: Luxury Maison Footer */}
      <Footer />
    </main>
  );
}
