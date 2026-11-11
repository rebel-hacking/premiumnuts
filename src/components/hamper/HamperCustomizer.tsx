"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import productConfig from "@/data/product-config.json";
import rawIngredients from "@/data/ingredients.json";
import { HamperSize, Ingredient } from "@/types";
import { useCart } from "@/context/CartContext";
import SizeSelector from "./SizeSelector";
import IngredientSelector from "./IngredientSelector";
import { ShoppingBag, ArrowRight, ShieldCheck, Check, Sparkles, Plus, Minus, Gift } from "lucide-react";

interface HamperCustomizerProps {
  onSuccessNavigate?: () => void;
}

export default function HamperCustomizer({ onSuccessNavigate }: HamperCustomizerProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const sizes = productConfig.sizes as HamperSize[];
  const ingredients = rawIngredients as Ingredient[];

  // Selected state
  const [selectedSize, setSelectedSize] = useState<HamperSize>(sizes[1] || sizes[0]); // Default Medium
  // Default first 6 active ingredients selected
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([
    "almonds",
    "cashews",
    "walnuts",
    "pistachios",
    "dates",
    "figs",
  ]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  const galleryImages = [
    {
      src: "/images/hamper/signature-hamper-main.jpg",
      title: "Signature Royal Burgundy Hamper (Open View)",
      caption: "Glossy burgundy magnetic closure box with satin gold 6-compartment interior",
    },
    {
      src: "/images/hamper/signature-hamper-tray.jpg",
      title: "6 Partitioned Golden Freshness Compartments",
      caption: "Each ingredient cleanly separated in food-grade satin gold partitions",
    },
    {
      src: "/images/hamper/signature-hamper-closure.jpg",
      title: "Precision Magnetic Flap & Embossed Trim",
      caption: "Rigid luxury keepsake packaging built to be cherished",
    },
  ];

  const handleToggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredientIds((prev) => {
      if (prev.includes(ingredient.id)) {
        return prev.filter((id) => id !== ingredient.id);
      }
      if (prev.length < productConfig.selectionLimit) {
        return [...prev, ingredient.id];
      }
      return prev;
    });
  };

  const getSelectedIngredientObjects = (): Ingredient[] => {
    return ingredients.filter((ing) => selectedIngredientIds.includes(ing.id));
  };

  const isSelectionReady = selectedIngredientIds.length === productConfig.selectionLimit;

  const handleAddToCart = () => {
    if (!isSelectionReady) return;
    const selectedObjs = getSelectedIngredientObjects();
    addToCart(selectedSize, selectedObjs, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    if (!isSelectionReady) return;
    const selectedObjs = getSelectedIngredientObjects();
    addToCart(selectedSize, selectedObjs, quantity);
    router.push("/cart");
  };

  return (
    <div className="w-full bg-[#FAF6EF] rounded-3xl border border-[#F2E8D8] p-4 sm:p-8 lg:p-12 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Authentic Hamper Gallery & Visual Preview */}
        {/* Mobile & Tab: relative (smooth natural scrolling); Desktop (lg+): sticky top-28 */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 relative lg:sticky lg:top-28">
          {/* Main Visual Display */}
          <div
            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F2E8D8] border border-[#B89A65]/40 shadow-lg"
            style={{ position: "relative" }}
          >
            <Image
              src={galleryImages[activeImageIndex].src}
              alt={galleryImages[activeImageIndex].title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-all duration-500"
            />
            {/* Gradient active on desktop only to keep mobile photo clear and unblocked */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

            {/* Badges: compact on mobile so top of box is visible */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-row md:flex-col gap-1.5 z-10 flex-wrap">
              <span className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-semibold tracking-widest uppercase bg-[#702D3C] text-white shadow-xs">
                Signature Hamper
              </span>
              <span className="px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[8px] md:text-[9px] font-medium tracking-wider uppercase bg-[#183D30] text-[#FAF6EF]">
                Magnetic Keepsake Box
              </span>
            </div>

            {/* Desktop-only Live Size Pill overlay (Preserved untouched for desktop) */}
            <div className="hidden md:block absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-[#F2E8D8] text-[#29251F] text-xs shadow-md">
              <div className="flex items-center justify-between font-medium">
                <span className="text-[#183D30] font-serif text-sm">
                  {selectedSize.name} Hamper ({selectedSize.approxWeight})
                </span>
                <span className="font-serif text-base font-semibold text-[#183D30]">
                  ₹{selectedSize.price}
                </span>
              </div>
              <p className="text-[11px] text-[#777065] mt-0.5 font-light">
                {galleryImages[activeImageIndex].caption}
              </p>
            </div>
          </div>

          {/* Mobile-only info card rendered cleanly below image (leaves mobile image 100% visible) */}
          <div className="md:hidden p-3.5 rounded-xl bg-white border border-[#F2E8D8] text-[#29251F] text-xs shadow-xs">
            <div className="flex items-center justify-between font-medium">
              <span className="text-[#183D30] font-serif text-sm font-semibold">
                {selectedSize.name} Hamper ({selectedSize.approxWeight})
              </span>
              <span className="font-serif text-base font-semibold text-[#183D30]">
                ₹{selectedSize.price}
              </span>
            </div>
            <p className="text-[11px] text-[#777065] mt-1 font-light leading-relaxed">
              {galleryImages[activeImageIndex].caption}
            </p>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{ position: "relative" }}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-[#183D30] shadow-sm scale-[1.02]"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt={img.title} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Selected Varieties Quick Summary Pills */}
          <div className="p-4 rounded-2xl bg-white border border-[#F2E8D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#183D30] font-semibold mb-2">
              <span className="uppercase tracking-wider">Your 6 Selected Varieties:</span>
              <span className="font-mono">{selectedIngredientIds.length} / 6</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedIngredientIds.length === 0 ? (
                <span className="text-xs text-[#777065] italic">No varieties selected yet.</span>
              ) : (
                getSelectedIngredientObjects().map((ing) => (
                  <span
                    key={ing.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF6EF] border border-[#F2E8D8] text-[11px] font-medium text-[#29251F]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#183D30]" />
                    {ing.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customizer Configuration Controls */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#B89A65] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FLAGSHIP GIFTING EXPERIENCE</span>
            </div>

            <h1
              className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal leading-tight mb-2 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {productConfig.name}
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#702D3C] font-semibold mb-4">
              {productConfig.tagline}
            </p>

            <p className="text-sm text-[#777065] font-light leading-relaxed mb-6">
              {productConfig.shortDescription}
            </p>
          </div>

          {/* Step 1: Hamper Size Selection */}
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSelectSize={(size) => setSelectedSize(size)}
          />

          {/* Step 2: 13-Ingredient Selection Cards Grid */}
          <IngredientSelector
            ingredients={ingredients}
            selectedIds={selectedIngredientIds}
            onToggleIngredient={handleToggleIngredient}
            maxSelections={productConfig.selectionLimit}
          />

          {/* Quantity & CTA Buttons Section */}
          <div className="p-6 rounded-2xl bg-white border border-[#B89A65]/40 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#777065]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#F2E8D8] rounded-full bg-[#FAF6EF]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#777065] hover:text-[#183D30]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-serif text-base font-semibold text-[#183D30]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#777065] hover:text-[#183D30]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subtotal Display */}
              <div className="text-right">
                <span className="text-xs text-[#777065] block">Order Subtotal</span>
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="font-serif text-3xl font-semibold text-[#183D30]">
                    ₹{selectedSize.price * quantity}
                  </span>
                  <span className="text-xs text-[#777065] line-through">
                    ₹{selectedSize.originalPrice * quantity}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isSelectionReady}
                className={`py-4 px-6 rounded-full text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                  isSelectionReady
                    ? "bg-[#183D30] hover:bg-[#102B22] text-[#FAF6EF] shadow-md hover:shadow-lg"
                    : "bg-[#777065]/20 text-[#777065] cursor-not-allowed"
                }`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-[#B89A65]" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!isSelectionReady}
                className={`py-4 px-6 rounded-full text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                  isSelectionReady
                    ? "bg-[#702D3C] hover:bg-[#521e2b] text-white shadow-md hover:shadow-lg"
                    : "bg-[#777065]/20 text-[#777065] cursor-not-allowed"
                }`}
              >
                <span>Buy Now via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] text-[#777065] pt-2 border-t border-[#F2E8D8]">
              <ShieldCheck className="w-4 h-4 text-[#183D30]" />
              <span>Free Luxury Ribbon & Wax-Sealed Gift Card Included</span>
              <span>•</span>
              <span>Direct WhatsApp Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

