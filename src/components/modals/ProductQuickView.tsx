"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductWeightOption } from "@/types";
import { X, Plus, Check, Sparkles, Shield, HeartHandshake, Compass } from "lucide-react";

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, option: ProductWeightOption) => void;
}

export default function ProductQuickView({
  product,
  onClose,
  onAddToCart,
}: ProductQuickViewProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentOption = product.options[selectedOptionIndex];

  const handleAdd = () => {
    onAddToCart(product, currentOption);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F8F5ED] text-[#29251F] rounded-2xl shadow-2xl border border-[#E8DDC8] flex flex-col md:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#29251F] flex items-center justify-center shadow-xs transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Visual */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-[#F1EBDD] overflow-hidden min-h-[300px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Badges */}
          <div className="absolute top-5 left-5 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#702D3C] text-[#F8F5ED]">
                {product.badge}
              </span>
            )}
            {product.isReserve && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-[#641F35] text-[#F8F5ED]">
                Grand Cru Reserve
              </span>
            )}
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-7 sm:p-9 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-[#B89A65] font-medium mb-1.5 uppercase tracking-widest">
              <span>{product.categoryLabel}</span>
              <span className="truncate max-w-[160px]">{product.origin}</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-4xl text-[#702D3C] font-normal leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {product.name}
            </h2>
            <p className="text-xs uppercase tracking-wider text-[#641F35] font-semibold mb-4">
              {product.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#777065] leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Tasting Notes */}
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#702D3C] block mb-2">
                Tasting Notes:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#F1EBDD] text-[#3B2A20] text-xs font-medium border border-[#E8DDC8]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Pairing Suggestions */}
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#702D3C] block mb-2">
                Gastronomic Pairings:
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-[#777065]">
                {product.pairingSuggestions.map((pair, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full bg-white border border-[#E8DDC8] text-[11px]"
                  >
                    ✦ {pair}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="pt-6 border-t border-[#E8DDC8]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#777065] block mb-2">
              Select Presentation Vessel:
            </span>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {product.options.map((opt, idx) => (
                <button
                  key={opt.weight}
                  onClick={() => setSelectedOptionIndex(idx)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedOptionIndex === idx
                      ? "bg-[#702D3C] text-white border-[#702D3C]"
                      : "bg-white text-[#29251F] border-[#E8DDC8] hover:border-[#B89A65]"
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.weight}</div>
                  <div className="text-[10px] opacity-80">${opt.price}</div>
                </button>
              ))}
            </div>

            {/* Price & Add to Bag */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#777065] block">Price</span>
                <span className="font-serif text-3xl font-semibold text-[#702D3C]">
                  ${currentOption.price}
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-[#B89A65] text-white"
                    : "bg-[#702D3C] hover:bg-[#4A1523] text-[#F8F5ED] shadow-md hover:shadow-lg"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

