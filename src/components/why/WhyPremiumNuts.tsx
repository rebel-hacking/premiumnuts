"use client";

import React from "react";
import { Sparkles, Layers, Sliders, Box, Heart, Building2, CheckCircle2 } from "lucide-react";

export default function WhyPremiumNuts() {
  const reasons = [
    {
      icon: Sparkles,
      title: "Thoughtfully Selected Ingredients",
      desc: "Each nut and dry fruit is hand-inspected for uniform caliber, golden color, and crisp natural oil retention.",
    },
    {
      icon: Sliders,
      title: "Flexible 6-Variety Selection",
      desc: "You are not locked into pre-filled boxes. Choose exactly six varieties that match your or your recipient's taste.",
    },
    {
      icon: Layers,
      title: "Three Considered Hamper Sizes",
      desc: "Available in Small (₹499), Medium (₹699), and Large (₹999) to suit personal gestures or lavish celebrations.",
    },
    {
      icon: Box,
      title: "Magnetic Keepsake Box",
      desc: "Luxurious royal burgundy finish with satin gold interior dividers that can be cherished as a jewelry or desk organizer.",
    },
    {
      icon: Heart,
      title: "Bespoke Personal Gifting",
      desc: "Every order arrives ready for gifting with embossed satin ribbon and complimentary wax-sealed handwritten cards.",
    },
    {
      icon: Building2,
      title: "Corporate & Executive Services",
      desc: "Dedicated bulk order concierge with custom logo hot-stamping, volume tiers, and split delivery to business partners.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF6EF] text-[#29251F] border-t border-[#F2E8D8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#183D30] block mb-3">
            THE MAISON ADVANTAGE
          </span>
          <h2
            className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Why Premium Nuts?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#777065] font-light max-w-md mx-auto mt-2">
            A gifting house dedicated to presentation, bespoke choice, and wholesome gourmet excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#F2E8D8] shadow-xs hover:shadow-md hover:border-[#B89A65]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#183D30]/10 text-[#183D30] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="font-serif text-xl text-[#183D30] font-normal mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-xs text-[#777065] leading-relaxed font-light">
                    {reason.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F2E8D8] flex items-center gap-1.5 text-[10px] text-[#183D30] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Signature Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

