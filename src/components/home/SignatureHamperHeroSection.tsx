"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import productConfig from "@/data/product-config.json";
import { HamperSize } from "@/types";
import { Sparkles, ArrowRight, Check, ShieldCheck, Gift } from "lucide-react";

export default function SignatureHamperHeroSection() {
  const sizes = productConfig.sizes as HamperSize[];
  const [selectedSize, setSelectedSize] = useState<HamperSize>(sizes[1] || sizes[0]);

  return (
    <section id="hamper" className="py-24 sm:py-32 bg-[#FAF6EF] text-[#29251F] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase Side */}
          <div className="lg:col-span-6 relative">
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#B89A65]/40 shadow-2xl group"
              style={{ position: "relative" }}
            >
              <Image
                src="/images/hamper/signature-hamper-main.jpg"
                alt="Signature Royal Burgundy Gift Hamper"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Desktop-only gradient overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 md:top-5 md:left-5 flex flex-row md:flex-col gap-1.5 z-10 flex-wrap">
                <span className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-semibold tracking-widest uppercase bg-[#702D3C] text-white shadow-xs">
                  The Signature Hamper
                </span>
                <span className="px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[8px] md:text-[9px] font-medium tracking-wider uppercase bg-[#183D30] text-[#FAF6EF]">
                  6 Gold Compartments
                </span>
              </div>

              {/* Desktop-only Bottom Caption Pill (Untouched on desktop) */}
              <div className="hidden md:flex absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#F2E8D8] text-xs items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#702D3C] font-semibold block">
                    EXCLUSIVE PRESENTATION
                  </span>
                  <span className="font-serif text-base text-[#183D30] font-normal">
                    {selectedSize.name} Hamper ({selectedSize.approxWeight})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#777065] line-through mr-1">
                    ₹{selectedSize.originalPrice}
                  </span>
                  <span className="font-serif text-xl font-bold text-[#183D30]">
                    ₹{selectedSize.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-only Caption Card Below Image (Unblocks the photo on mobile) */}
            <div className="md:hidden mt-3 p-3.5 rounded-2xl bg-white border border-[#F2E8D8] text-xs flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#702D3C] font-semibold block">
                  EXCLUSIVE PRESENTATION
                </span>
                <span className="font-serif text-base text-[#183D30] font-normal">
                  {selectedSize.name} Hamper ({selectedSize.approxWeight})
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#777065] line-through mr-1">
                  ₹{selectedSize.originalPrice}
                </span>
                <span className="font-serif text-lg font-bold text-[#183D30]">
                  ₹{selectedSize.price}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content Side */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#B89A65] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FLAGSHIP CREATION</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal tracking-tight leading-[1.1] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              A Little Box of Extraordinary Goodness.
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#702D3C] font-semibold mb-4">
              {productConfig.tagline}
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#777065] font-light leading-relaxed mb-6">
              Unlike generic dry fruits boxes, our signature hamper features a rigid bookbinding
              casket in glossy royal burgundy, an acoustic magnetic flap closure, and a satin gold
              tray divided into 6 freshness partitions. Tailor it with your recipient&apos;s six
              favourite gourmet varieties.
            </p>

            {/* Size Options Grid */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#183D30] block mb-3">
                Select Your Desired Caliber:
              </span>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  const discountPct = Math.round(
                    ((size.originalPrice - size.price) / size.originalPrice) * 100
                  );

                  return (
                    <button
                      type="button"
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-white border-[#183D30] shadow-md ring-1 ring-[#183D30]"
                          : "bg-white/70 hover:bg-white border-[#F2E8D8]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-[#183D30] font-normal">
                          {size.name}
                        </span>
                        <span className="text-[9px] font-bold text-[#702D3C]">{discountPct}% OFF</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="font-serif text-lg font-bold text-[#183D30]">
                          ₹{size.price}
                        </span>
                        <span className="text-[10px] text-[#777065] line-through">
                          ₹{size.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#777065] block mt-0.5 truncate">
                        {size.approxWeight.split("(")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA to Hamper Page */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/our-hamper"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#183D30] hover:bg-[#102B22] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>EXPLORE & CURATE HAMPER</span>
                <ArrowRight className="w-4 h-4 text-[#B89A65]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

