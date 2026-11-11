"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_BASE_URL } from "@/lib/whatsapp";

export default function FinalHomeCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#183D30] to-[#102B22] text-[#FAF6EF] relative overflow-hidden border-t border-[#B89A65]/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,154,101,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B89A65]/15 border border-[#B89A65]/30 text-[#B89A65] text-xs uppercase tracking-[0.25em] font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A DEFINING GESTURE</span>
        </div>

        <h2
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#FAF6EF] leading-[1.08] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Make Your Next Gift Unforgettable.
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#F2E8D8]/85 font-light leading-relaxed max-w-xl mx-auto mb-10">
          From intimate family celebrations to large-scale enterprise recognition, our royal burgundy
          magnetic hampers are curated to delight the senses and honor every occasion.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/our-hamper"
            className="px-8 py-4 rounded-full bg-[#B89A65] hover:bg-[#a58957] text-[#102B22] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>EXPLORE OUR HAMPER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/corporate-gifting"
            className="px-8 py-4 rounded-full border border-[#FAF6EF]/40 hover:border-[#FAF6EF] bg-white/5 hover:bg-white/10 text-[#FAF6EF] text-xs uppercase tracking-widest font-medium transition-all"
          >
            <span>CORPORATE ENQUIRY</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

