"use client";

import React from "react";
import { HamperSize } from "@/types";
import { Sparkles, Check } from "lucide-react";

interface SizeSelectorProps {
  sizes: HamperSize[];
  selectedSize: HamperSize;
  onSelectSize: (size: HamperSize) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183D30]">
          CHOOSE HAMPER SIZE
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#183D30] text-[#FAF6EF] font-semibold">
          Step 1 of 2
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {sizes.map((size) => {
          const isSelected = selectedSize.id === size.id;
          const discountPct = Math.round(
            ((size.originalPrice - size.price) / size.originalPrice) * 100
          );

          return (
            <button
              type="button"
              key={size.id}
              onClick={() => onSelectSize(size)}
              className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between touch-manipulation ${
                isSelected
                  ? "bg-white border-[#183D30] shadow-md ring-2 ring-[#183D30]/20 -translate-y-0.5"
                  : "bg-white/80 hover:bg-white border-[#F2E8D8] hover:border-[#B89A65] hover:shadow-xs"
              }`}
            >
              {/* Popular Badge */}
              {size.isPopular && (
                <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#702D3C] text-white text-[9px] font-semibold tracking-wider uppercase shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#B89A65]" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className="font-serif text-xl sm:text-2xl text-[#183D30] font-normal"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {size.name}
                  </h4>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#183D30] text-white"
                        : "border border-[#F2E8D8] text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                <p className="text-[11px] text-[#777065] font-light mb-1">{size.subtitle}</p>
                <span className="inline-block text-[10px] font-medium text-[#183D30] bg-[#F2E8D8]/70 px-2 py-0.5 rounded-md mb-4">
                  {size.approxWeight}
                </span>
              </div>

              {/* Pricing Line */}
              <div className="pt-3 border-t border-[#F2E8D8]">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#183D30]">
                    ₹{size.price}
                  </span>
                  <span className="text-xs text-[#777065] line-through">
                    ₹{size.originalPrice}
                  </span>
                  <span className="text-[10px] font-bold text-[#702D3C] uppercase tracking-wider">
                    {discountPct}% OFF
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

