"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductCategory, ProductWeightOption } from "@/types";
import { PRODUCTS } from "@/data/products";
import { Eye, Plus, Check, Sparkles, SlidersHorizontal, ArrowRight } from "lucide-react";

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, option: ProductWeightOption) => void;
}

export default function ProductCatalog({
  onSelectProduct,
  onAddToCart,
}: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [selectedWeightMap, setSelectedWeightMap] = useState<Record<string, number>>({});
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const categories: { key: ProductCategory; label: string }[] = [
    { key: "all", label: "Complete Reserve" },
    { key: "walnuts", label: "Walnuts" },
    { key: "almonds", label: "Almonds" },
    { key: "cashews", label: "Cashews" },
    { key: "pistachios", label: "Pistachios" },
    { key: "hazelnuts", label: "Hazelnuts" },
    { key: "mixed", label: "Curated Medleys" },
    { key: "dry-fruits", label: "Fine Dry Fruits" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleSelectWeight = (productId: string, optionIndex: number) => {
    setSelectedWeightMap((prev) => ({ ...prev, [productId]: optionIndex }));
  };

  const handleAdd = (product: Product) => {
    const optionIndex = selectedWeightMap[product.id] || 0;
    const chosenOption = product.options[optionIndex];
    onAddToCart(product, chosenOption);

    // Flash success checkmark
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1600);
  };

  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#F8F5ED] text-[#29251F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#702D3C]/5 border border-[#702D3C]/15 text-[#702D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
            <span>The Seasonal Harvest</span>
          </div>
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#702D3C] font-normal tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Discover Nature&apos;s Finest.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#777065] font-light leading-relaxed">
            A considered collection of exceptional nuts and premium dry fruits, hand-graded
            for uniform caliber, pristine natural oils, and remarkable gastronomic pleasure.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] tracking-wider uppercase font-medium transition-all ${
                    isActive
                      ? "bg-[#702D3C] text-[#F8F5ED] shadow-sm"
                      : "bg-[#F1EBDD] hover:bg-[#E8DDC8] text-[#3B2A20] border border-[#E8DDC8]/60"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => {
            const currentOptionIndex = selectedWeightMap[product.id] || 0;
            const currentOption = product.options[currentOptionIndex];
            const isAdded = !!addedItemMap[product.id];

            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white rounded-2xl border border-[#E8DDC8]/70 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#B89A65]/60 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Visual Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1EBDD]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    {product.badge && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#702D3C] text-[#F8F5ED] shadow-xs">
                        {product.badge}
                      </span>
                    )}
                    {product.isReserve && (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-[#641F35] text-[#F8F5ED]">
                        Grand Cru
                      </span>
                    )}
                  </div>

                  {/* Quick View Button overlay */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#702D3C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:scale-105 z-10"
                    title="Quick preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Origin */}
                    <div className="flex items-center justify-between text-xs text-[#777065] mb-2 font-medium">
                      <span className="uppercase tracking-widest">{product.categoryLabel}</span>
                      <span className="truncate max-w-[150px] text-[11px] text-[#B89A65]">
                        {product.origin.split(",")[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-2xl text-[#702D3C] font-normal leading-snug cursor-pointer hover:text-[#641F35] transition-colors mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#B89A65] font-medium uppercase tracking-wider mb-3">
                      {product.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#777065] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Tasting Notes Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {product.tastingNotes.map((note, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-[#F8F5ED] text-[#3B2A20] text-[10px] font-medium border border-[#E8DDC8]/60"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Purchase Controls */}
                  <div className="pt-4 border-t border-[#E8DDC8]/60">
                    {/* Weight Selection Chips */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {product.options.map((opt, idx) => (
                        <button
                          key={opt.weight}
                          onClick={() => handleSelectWeight(product.id, idx)}
                          className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-medium tracking-tight transition-all border ${
                            currentOptionIndex === idx
                              ? "bg-[#702D3C] text-[#F8F5ED] border-[#702D3C]"
                              : "bg-white text-[#777065] hover:text-[#29251F] border-[#E8DDC8]"
                          }`}
                        >
                          {opt.weight}
                        </button>
                      ))}
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#777065] block leading-none">Price</span>
                        <span className="font-serif text-2xl font-semibold text-[#702D3C]">
                          ${currentOption.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        disabled={isAdded}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                          isAdded
                            ? "bg-[#B89A65] text-white"
                            : "bg-[#702D3C] hover:bg-[#4A1523] text-[#F8F5ED] shadow-xs hover:shadow-md hover:scale-[1.02]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

