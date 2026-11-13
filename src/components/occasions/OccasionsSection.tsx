"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import occasionsData from "@/data/occasions.json";
import { OccasionItem } from "@/types";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function OccasionsSection() {
  const occasions = occasionsData as OccasionItem[];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -340 : 340;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32 bg-[#F2E8D8] text-[#29251F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#702D3C] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B89A65]" />
              <span>MOMENTS WORTH CELEBRATING</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#702D3C] font-normal tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Gifting for Every Occasion
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#777065] font-light max-w-xl mt-2">
              Whether marking sacred festivals, celebrating lifelong unions, or honoring corporate partnerships, our magnetic luxury hamper is tailored for lasting impressions.
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous occasion"
              className="w-10 h-10 rounded-full border border-[#B89A65]/40 hover:border-[#702D3C] bg-white flex items-center justify-center text-[#702D3C] transition-colors shadow-xs hover:bg-[#FAF6EF]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next occasion"
              className="w-10 h-10 rounded-full border border-[#B89A65]/40 hover:border-[#702D3C] bg-white flex items-center justify-center text-[#702D3C] transition-colors shadow-xs hover:bg-[#FAF6EF]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Reel (Touch swipe on mobile, smooth overflow scroll) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex flex-col justify-between rounded-2xl bg-gradient-to-b from-white to-[#FAF6EF] border border-[#B89A65]/35 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 group"
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6EF]"
                style={{ position: "relative" }}
              >
                <Image
                  src={occasion.image}
                  alt={occasion.name}
                  fill
                  sizes="320px"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />

                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#702D3C]/90 backdrop-blur-md text-[9px] font-semibold text-[#FAF6EF] uppercase tracking-wider border border-[#B89A65]/30">
                  {occasion.tagline.split("&")[0]}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="font-serif text-xl sm:text-2xl text-[#29251F] font-normal mb-1 group-hover:text-[#702D3C] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {occasion.name}
                  </h3>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B89A65] mb-2.5">
                    {occasion.tagline}
                  </p>
                  <p className="text-xs text-[#777065] leading-relaxed font-light mb-4">
                    {occasion.description}
                  </p>
                </div>

                <Link
                  href="/our-hamper"
                  className="pt-3 border-t border-[#F2E8D8] flex items-center justify-between text-xs font-semibold text-[#702D3C] group-hover:text-[#4A1523] transition-colors uppercase tracking-wider"
                >
                  <span>Curate This Hamper</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
