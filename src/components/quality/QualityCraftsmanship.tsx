"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Microscope, Gem, Sparkles, Flame, LucideIcon } from "lucide-react";

interface QualityStep {
  num: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
}

export default function QualityCraftsmanship() {
  const qualitySteps: QualityStep[] = [
    {
      num: "01",
      title: "Caliber & Optical Sorting",
      tagline: "Only the top 5% of global harvest qualifies.",
      description:
        "Every harvest batch passes through high-precision dual-spectrum optical cameras followed by triple hand-inspection to eliminate cracked kernels, skin abrasions, and discoloration.",
      icon: Microscope,
    },
    {
      num: "02",
      title: "Slow Low-Temp Roasting",
      tagline: "Honoring the intrinsic volatile oils.",
      description:
        "We never flash-fry or submerge nuts in industrial oil baths. Our roasting utilizes precision European air-convection drums at low temperatures to ensure caramelization without scorching.",
      icon: Flame,
    },
    {
      num: "03",
      title: "Cold-Chain Moisture Lock",
      tagline: "Crispness preserved from orchard to table.",
      description:
        "Nuts contain sensitive natural fats. We cold-store our harvests under strict humidity controls (<10°C) until the exact moment of order assembly and hermetic nitrogen sealing.",
      icon: Gem,
    },
    {
      num: "04",
      title: "Artisanal Keepsake Packaging",
      tagline: "Designed to be cherished long after the final bite.",
      description:
        "From heavyweight textured rigid presentation cases to hand-blown glass jars with airtight wood lids, every vessel is engineered to protect flavor and elevate your living space.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="craft" className="py-24 sm:py-32 bg-[#F8F5ED] text-[#29251F] border-t border-[#E8DDC8]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B89A65] mb-3 inline-block">
            THE PURSUIT OF PERFECTION
          </span>
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#702D3C] font-normal tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Excellence is in the details.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#777065] font-light leading-relaxed">
            Our uncompromising standards govern every touchpoint — from botanical seed purity
            to the weight of the ribbons tied across our presentation chests.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {qualitySteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-7 sm:p-8 rounded-2xl bg-white border border-[#E8DDC8] shadow-xs hover:shadow-xl hover:border-[#702D3C]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#B89A65] group-hover:text-[#702D3C] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#702D3C]/5 text-[#702D3C] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3
                    className="font-serif text-2xl text-[#702D3C] font-normal mb-1.5"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#641F35] uppercase tracking-wider mb-4">
                    {step.tagline}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#777065] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8DDC8]/60 flex items-center gap-2 text-[11px] text-[#B89A65] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#702D3C]" />
                  <span>Verified Maison Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
