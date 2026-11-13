"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchDialog({
  isOpen,
  onClose,
  onSelectProduct,
}: SearchDialogProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tastingNotes.some((n) => n.toLowerCase().includes(q))
    );
  });

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#F8F5ED] text-[#29251F] rounded-2xl shadow-2xl border border-[#E8DDC8] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8DDC8] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#B89A65]" />
          <input
            autoFocus
            type="text"
            placeholder="Search walnuts, jumbo cashews, gift boxes, or tasting notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#29251F] placeholder-[#777065] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#777065] hover:text-[#29251F] text-xs uppercase"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E8DDC8]/50 hover:bg-[#E8DDC8] flex items-center justify-center text-[#29251F]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="px-5 py-3 bg-[#F1EBDD] border-b border-[#E8DDC8] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#777065] shrink-0 font-medium">Suggested:</span>
            {["Chandler Walnuts", "W-180 Jumbo", "Nonpareil Almonds", "Emerald Pistachio", "Lacquered Chest"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded-full bg-white text-[#702D3C] border border-[#E8DDC8] shrink-0 hover:bg-[#702D3C] hover:text-white transition-colors"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#E8DDC8]/70 p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#777065] text-sm">
              No matching reserve creations found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="p-3.5 sm:p-4 rounded-xl hover:bg-white transition-colors flex items-center gap-4 cursor-pointer group"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#F1EBDD] shrink-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#B89A65] font-semibold block">
                    {product.categoryLabel}
                  </span>
                  <h4 className="font-serif text-lg text-[#702D3C] group-hover:text-[#641F35] transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#777065] truncate font-light">
                    {product.subtitle} • {product.origin}
                  </p>
                </div>
                <div className="text-right shrink-0 flex items-center gap-2">
                  <span className="font-serif text-base font-semibold text-[#702D3C]">
                    ${product.options[0].price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#B89A65] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

