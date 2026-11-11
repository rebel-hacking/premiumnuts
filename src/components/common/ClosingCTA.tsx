"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface ClosingCTAProps {
  onExploreCollection: () => void;
  onExploreGifting: () => void;
}

export default function ClosingCTA({
  onExploreCollection,
  onExploreGifting,
}: ClosingCTAProps) {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#183C2D] to-[#102D23] text-[#F8F5ED] relative overflow-hidden border-t border-[#8C9A80]/20">
      {/* Decorative ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(182,154,104,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B69A68]/15 border border-[#B69A68]/30 text-[#B69A68] text-xs uppercase tracking-[0.25em] font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A SIGNATURE EXPERIENCE</span>
        </div>

        <h2
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F5ED] leading-[1.08] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Some moments deserve something special.
        </h2>

        <p className="font-sans text-base sm:text-xl text-[#E8DDC8]/85 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Discover the pleasure of giving and receiving something extraordinary.
          From hand-cracked royal walnuts to grand corporate presentation chests.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={onExploreCollection}
            className="px-8 py-4 rounded-full bg-[#B69A68] hover:bg-[#a38755] text-[#102D23] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>Explore Premium Nuts</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreGifting}
            className="px-8 py-4 rounded-full border border-[#E8DDC8]/40 hover:border-[#F8F5ED] bg-white/5 hover:bg-white/10 text-[#F8F5ED] text-xs uppercase tracking-widest font-medium transition-all"
          >
            Discover Our Gift Collection
          </button>
        </div>
      </div>
    </section>
  );
}

