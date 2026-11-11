"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Compass, HeartHandshake, Trees, Clock } from "lucide-react";

export default function BrandHeritage() {
  const heritagePillars = [
    {
      icon: Trees,
      title: "Orchard Lineage",
      desc: "We partner exclusively with multi-generational growers where soil microclimate, mountain runoff, and slow seasonal ripening allow nuts to reach their true botanical potential.",
    },
    {
      icon: Clock,
      title: "The Art of Slow Harvesting",
      desc: "No premature shaking or forced mechanical drying. We harvest only as nature signals peak oil maturation, ensuring profound natural sweetness and crisp cellular snap.",
    },
    {
      icon: HeartHandshake,
      title: "The Tactile Ritual of Giving",
      desc: "Luxury is not merely an ingredient; it is the anticipation of unboxing. We create rigid presentation sleeves, wax seals, and velvet linings worthy of life's defining milestones.",
    },
  ];

  return (
    <section id="story" className="py-24 sm:py-32 bg-[#F1EBDD] text-[#29251F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C9A80] block mb-3">
            MAISON PHILOSOPHY
          </span>
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#183C2D] font-normal tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Rooted in nature. Made for moments.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#777065] font-light leading-relaxed">
            Premium Nuts was conceived on a singular tenet: that the earth&apos;s simplest creations,
            when nurtured under ideal conditions and presented with uncompromising artistry,
            rival the world&apos;s greatest delicacies.
          </p>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Visual Composition */}
          <div className="lg:col-span-7 relative">
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8DDC8] shadow-2xl bg-white"
              style={{ position: "relative" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=85"
                alt="Harvested gourmet nuts"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              {/* Desktop-only gradient overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Desktop-only archival note overlay */}
              <div className="hidden md:block absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E8DDC8] block mb-1">
                  ARCHIVAL NOTE
                </span>
                <p className="font-serif text-lg sm:text-xl font-normal leading-snug">
                  &ldquo;Every shell carries the quiet history of a full season&apos;s sun and rain.&rdquo;
                </p>
              </div>
            </div>

            {/* Mobile-only Archival Note below image (leaves mobile photo clear) */}
            <div className="md:hidden mt-3 p-3.5 rounded-xl bg-white border border-[#E8DDC8] text-xs shadow-xs">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#702D3C] block mb-1">
                ARCHIVAL NOTE
              </span>
              <p className="font-serif text-base text-[#183D30] font-normal leading-snug">
                &ldquo;Every shell carries the quiet history of a full season&apos;s sun and rain.&rdquo;
              </p>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-6 right-2 lg:-bottom-8 lg:-right-8 w-44 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8DDC8] shadow-xl flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-[#183C2D] text-[#F8F5ED] flex items-center justify-center font-serif text-sm font-semibold mb-2">
                100%
              </div>
              <span className="text-[11px] font-semibold text-[#183C2D] uppercase tracking-wider">
                Single Origin
              </span>
              <span className="text-[10px] text-[#777065] mt-0.5">
                Traceable to individual micro-groves
              </span>
            </div>
          </div>

          {/* Pillars Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {heritagePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white/80 border border-[#E8DDC8] shadow-xs hover:border-[#183C2D]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#183C2D]/10 text-[#183C2D] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className="font-serif text-xl text-[#183C2D] font-normal"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#777065] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

