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
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#702D3C]">
          CHOOSE HAMPER SIZE
        </span>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#702D3C] text-[#FAF6EF] font-semibold tracking-wider">
          Step 1 of 2
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
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
                  ? "bg-[#FBF6F7] border-2 border-[#702D3C] shadow-lg shadow-[#702D3C]/12 ring-2 ring-[#B89A65]/40 -translate-y-1"
                  : "bg-gradient-to-b from-white to-[#FAF6EF] hover:bg-white border-[#B89A65]/35 hover:border-[#702D3C]/70 shadow-xs hover:shadow-md"
              }`}
            >
              {/* Popular Badge */}
              {size.isPopular && (
                <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#702D3C] text-white text-[9px] font-semibold tracking-wider uppercase shadow-xs flex items-center gap-1 border border-[#B89A65]/40">
                  <Sparkles className="w-2.5 h-2.5 text-[#B89A65]" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4
                    className={`font-serif text-xl sm:text-2xl transition-colors ${
                      isSelected ? "text-[#702D3C] font-semibold" : "text-[#29251F] font-normal"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {size.name}
                  </h4>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#702D3C] text-white ring-1 ring-[#B89A65]"
                        : "border border-[#B89A65]/40 text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                <p className="text-[11px] text-[#777065] font-light mb-2">{size.subtitle}</p>
                <span className="inline-block text-[10px] font-semibold text-[#702D3C] bg-[#702D3C]/10 border border-[#702D3C]/20 px-2.5 py-0.5 rounded-full mb-4">
                  {size.approxWeight}
                </span>
              </div>

              {/* Pricing Line */}
              <div className="pt-3 border-t border-[#F2E8D8]">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#702D3C]">
                    ₹{size.price}
                  </span>
                  <span className="text-xs text-[#777065] line-through">
                    ₹{size.originalPrice}
                  </span>
                  <span className="text-[10px] font-bold text-[#702D3C] bg-[#702D3C]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
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
