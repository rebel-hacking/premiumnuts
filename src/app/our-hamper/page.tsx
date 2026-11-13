"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HamperCustomizer from "@/components/hamper/HamperCustomizer";
import PackagingShowcase from "@/components/packaging/PackagingShowcase";
import WhyPremiumNuts from "@/components/why/WhyPremiumNuts";
import { Sparkles, Gift, ShieldCheck } from "lucide-react";

export default function OurHamperPage() {
  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#702D3C] selection:text-[#FAF6EF] overflow-x-clip">
      <Navbar />
      <CartDrawer />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-[#FAF6EF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#702D3C]/10 border border-[#702D3C]/20 text-[#702D3C] text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A65]" />
            <span>BESPOKE GOURMET SELECTION</span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-6xl text-[#702D3C] font-normal tracking-tight max-w-3xl mx-auto leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            The Signature Hamper
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#777065] font-light max-w-xl mx-auto leading-relaxed">
            One exceptional gift box. Three generous sizes. Six ingredients chosen entirely by you.
            Handcrafted with magnetic closure and satin gold partitions.
          </p>
        </div>
      </section>

      {/* Hamper Customizer Interface */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <HamperCustomizer />
        </div>
      </section>

      {/* Packaging & Unboxing Detail */}
      <PackagingShowcase />

      {/* Why Choose Us */}
      <WhyPremiumNuts />

      <Footer />
    </main>
  );
}

