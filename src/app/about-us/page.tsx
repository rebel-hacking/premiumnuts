"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Sparkles, HeartHandshake, Trees, ShieldCheck, ArrowRight, Gift } from "lucide-react";

export default function AboutUsPage() {
  const values = [
    {
      title: "The Spirit of Generosity",
      desc: "A gift is a reflection of reverence and affection. We curate each box with the thought that someone deeply valued will hold it in their hands.",
    },
    {
      title: "Purity of Origin",
      desc: "From California orchards to Himalayan groves, we select only pristine, sun-ripened crops free from artificial glazing or forced processing.",
    },
    {
      title: "Tactile Unboxing Ceremony",
      desc: "Our magnetic bookbinding box, satin gold partitions, and wax-sealed calligraphy card ensure every unboxing feels like a celebratory milestone.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#183D30] selection:text-[#FAF6EF]">
      <Navbar />
      <CartDrawer />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-[#183D30] text-[#FAF6EF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B89A65]/15 border border-[#B89A65]/30 text-[#B89A65] text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MAISON PHILOSOPHY</span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-6xl text-[#FAF6EF] font-normal tracking-tight max-w-3xl mx-auto leading-tight mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Rooted in Nature. Made for Moments.
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#F2E8D8]/85 font-light max-w-2xl mx-auto leading-relaxed">
            PREMIUM NUTS was founded on a singular belief: that dry fruits and nuts, when curated
            with uncompromising integrity and presented in exceptional packaging, represent the
            ultimate expression of love, honor, and celebration.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-28 bg-[#FAF6EF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#B89A65]/40 shadow-xl bg-white">
                <Image
                  src="/images/lifestyle/hamper-lifestyle.jpg"
                  alt="Premium Nuts Hamper Setting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#183D30] block">
                OUR PROMISE
              </span>
              <h2
                className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Why We Do Not Sell Ordinary Bags
              </h2>
              <p className="text-xs sm:text-sm text-[#777065] leading-relaxed font-light">
                We are not a supermarket or a mass bulk wholesaler. We specialize entirely in
                <strong> one signature gift hamper</strong>, available in three calibrated sizes,
                giving our customers the power to choose their exact six favourite varieties.
              </p>
              <p className="text-xs sm:text-sm text-[#777065] leading-relaxed font-light">
                By maintaining absolute focus on our core hamper, we ensure that every box is
                assembled by hand, every walnut is intact, every date is succulent, and every
                magnetic seal snaps shut with reassuring luxury.
              </p>

              <div className="pt-2">
                <Link
                  href="/our-hamper"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#183D30] hover:bg-[#102B22] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
                >
                  <span>Explore The Hamper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-20 sm:py-28 bg-[#F2E8D8] border-t border-[#B89A65]/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#183D30] block mb-2">
              OUR VALUES
            </span>
            <h2
              className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The Pillars of Our House
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-[#B89A65]/30 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#183D30]/10 text-[#183D30] flex items-center justify-center font-serif text-lg font-semibold mb-6">
                    0{i + 1}
                  </div>
                  <h3
                    className="font-serif text-2xl text-[#183D30] font-normal mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777065] font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

