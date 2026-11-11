"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GIFTING_TIERS } from "@/data/products";
import { Gift, Sparkles, Building2, Check, ArrowRight, X, Send } from "lucide-react";
import { CorporateEnquiry } from "@/types";

interface TheArtOfGiftingProps {
  onPersonalGiftingClick: () => void;
  onFestiveGiftingClick: () => void;
}

export default function TheArtOfGifting({
  onPersonalGiftingClick,
  onFestiveGiftingClick,
}: TheArtOfGiftingProps) {
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Corporate calculator state
  const [hamperCount, setHamperCount] = useState(50);
  const [selectedBoxStyle, setSelectedBoxStyle] = useState<"forest" | "burgundy" | "wood">("forest");
  const [customRibbon, setCustomRibbon] = useState(true);
  const [engravedBox, setEngravedBox] = useState(true);

  // Form fields
  const [formState, setFormState] = useState<CorporateEnquiry>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    estimatedHampers: 50,
    budgetPerHamper: "$85 - $150",
    occasion: "Year-End Client Recognition",
    customRibbon: true,
    engravedWoodBox: true,
    notes: "",
  });

  const basePricePerUnit =
    selectedBoxStyle === "wood" ? 135 : selectedBoxStyle === "burgundy" ? 110 : 85;
  const ribbonAddon = customRibbon ? 6 : 0;
  const engravingAddon = engravedBox ? 12 : 0;
  const estimatedUnitTotal = basePricePerUnit + ribbonAddon + engravingAddon;
  const estimatedOrderTotal = estimatedUnitTotal * hamperCount;

  const handleTierClick = (id: string) => {
    if (id === "corporate") {
      setIsCorporateModalOpen(true);
    } else if (id === "festive") {
      onFestiveGiftingClick();
    } else {
      onPersonalGiftingClick();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      // Keep modal open with confirmation
    }, 500);
  };

  return (
    <section id="gifting" className="py-24 sm:py-32 bg-[#183C2D] text-[#F8F5ED] relative overflow-hidden">
      {/* Subtle Luxury Watermark / Motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(182,154,104,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_left,rgba(100,31,53,0.2),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#B69A68] mb-4 inline-block">
            THE ART OF GIVING
          </span>
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F8F5ED] font-normal tracking-tight leading-tight mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Make every gesture extraordinary.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#E8DDC8]/80 font-light leading-relaxed">
            Thoughtful selections, beautifully presented, for moments that deserve something
            special. From intimate host tokens to bespoke corporate collections.
          </p>
        </div>

        {/* 3 Luxury Gifting Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {GIFTING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col bg-[#102D23] rounded-2xl border border-[#8C9A80]/20 overflow-hidden shadow-xl hover:border-[#B69A68]/60 transition-all duration-500 hover:-translate-y-1.5 group"
            >
              {/* Image Area */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#183C2D]">
                <Image
                  src={tier.imageUrl}
                  alt={tier.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102D23] via-transparent to-transparent opacity-80" />

                {/* Starting price tag */}
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-[#183C2D]/90 backdrop-blur-md border border-[#B69A68]/40 text-xs font-serif text-[#B69A68]">
                  From ${tier.priceStartingAt}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#B69A68] font-medium block mb-1">
                    {tier.subtitle}
                  </span>
                  <h3
                    className="font-serif text-2xl sm:text-3xl text-[#F8F5ED] font-normal mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {tier.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8DDC8]/75 font-light leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-8">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#E8DDC8]/90">
                        <Check className="w-3.5 h-3.5 text-[#B69A68] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => handleTierClick(tier.id)}
                  className={`w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                    tier.id === "corporate"
                      ? "bg-[#641F35] hover:bg-[#451626] text-[#F8F5ED] shadow-md hover:shadow-lg"
                      : "bg-[#F8F5ED] hover:bg-white text-[#183C2D] shadow-xs"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Bespoke Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-2xl bg-[#102D23]/70 border border-[#B69A68]/30 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#B69A68]/15 border border-[#B69A68]/40 flex items-center justify-center text-[#B69A68] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#F8F5ED] font-normal">
                Planning a Large Corporate Initiative?
              </h4>
              <p className="text-xs sm:text-sm text-[#E8DDC8]/80 font-light mt-0.5">
                Our Corporate Concierge oversees logo hot-stamping, split international addresses, and dedicated timeline delivery.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCorporateModalOpen(true)}
            className="px-7 py-3 rounded-full bg-[#B69A68] hover:bg-[#a58957] text-[#102D23] text-xs font-semibold uppercase tracking-wider transition-all shrink-0 shadow-sm"
          >
            Open Corporate Concierge
          </button>
        </div>
      </div>

      {/* Corporate Concierge Modal */}
      {isCorporateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F8F5ED] text-[#29251F] rounded-2xl p-6 sm:p-10 shadow-2xl border border-[#E8DDC8]">
            <button
              onClick={() => {
                setIsCorporateModalOpen(false);
                setEnquirySuccess(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#E8DDC8]/50 hover:bg-[#E8DDC8] flex items-center justify-center text-[#29251F] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {enquirySuccess ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#183C2D]/10 text-[#183C2D] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3
                  className="font-serif text-3xl text-[#183C2D] font-normal mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Enquiry Received
                </h3>
                <p className="text-sm text-[#777065] max-w-md mx-auto mb-6">
                  Thank you, {formState.fullName || "valued client"}. Our Senior Gifting
                  Director will review your requirements for {hamperCount} bespoke hampers and
                  contact you within 4 business hours with physical swatch proofs and digital mockups.
                </p>
                <button
                  onClick={() => {
                    setIsCorporateModalOpen(false);
                    setEnquirySuccess(false);
                  }}
                  className="px-8 py-3 rounded-full bg-[#183C2D] text-[#F8F5ED] text-xs uppercase tracking-widest font-semibold"
                >
                  Return to Boutique
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C9A80] block mb-1">
                  CORPORATE GIFTING CONCIERGE
                </span>
                <h3
                  className="font-serif text-2xl sm:text-3xl text-[#183C2D] font-normal mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Bespoke Corporate Presentation
                </h3>
                <p className="text-xs sm:text-sm text-[#777065] mb-6">
                  Configure your volume requirements and luxury customizations below for an instant
                  estimate and direct consultation request.
                </p>

                {/* Interactive Configurator */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#F1EBDD] border border-[#E8DDC8] mb-6 space-y-4">
                  {/* Quantity Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-medium text-[#29251F] mb-1.5">
                      <span>Order Volume (Units):</span>
                      <span className="font-serif text-base font-semibold text-[#183C2D]">
                        {hamperCount} Hampers
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={500}
                      step={5}
                      value={hamperCount}
                      onChange={(e) => setHamperCount(Number(e.target.value))}
                      className="w-full accent-[#183C2D] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#777065]">
                      <span>20 min</span>
                      <span>150 units</span>
                      <span>500+ custom</span>
                    </div>
                  </div>

                  {/* Vessel Choice */}
                  <div>
                    <label className="block text-xs font-medium text-[#29251F] mb-1.5">
                      Vessel & Box Architecture:
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { key: "forest", name: "Forest Rigid Box", price: "$85" },
                        { key: "burgundy", name: "Burgundy Velvet", price: "$110" },
                        { key: "wood", name: "Lacquered Wood Chest", price: "$135" },
                      ].map((box) => (
                        <button
                          type="button"
                          key={box.key}
                          onClick={() => setSelectedBoxStyle(box.key as any)}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            selectedBoxStyle === box.key
                              ? "bg-[#183C2D] text-white border-[#183C2D]"
                              : "bg-white text-[#29251F] border-[#E8DDC8]"
                          }`}
                        >
                          <div className="font-medium">{box.name}</div>
                          <div className="text-[11px] opacity-80">{box.price} / unit</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={customRibbon}
                        onChange={(e) => setCustomRibbon(e.target.checked)}
                        className="rounded border-[#8C9A80] text-[#183C2D] focus:ring-0"
                      />
                      <span>Embossed Foil Ribbon (+ $6)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={engravedBox}
                        onChange={(e) => setEngravedBox(e.target.checked)}
                        className="rounded border-[#8C9A80] text-[#183C2D] focus:ring-0"
                      />
                      <span>Laser-Engraved Company Logo (+ $12)</span>
                    </label>
                  </div>

                  {/* Estimated Total Display */}
                  <div className="pt-3 border-t border-[#E8DDC8] flex justify-between items-center text-xs">
                    <span className="text-[#777065]">
                      Estimated Unit:{" "}
                      <strong className="text-[#183C2D]">${estimatedUnitTotal}</strong>
                    </span>
                    <span className="font-serif text-lg font-semibold text-[#183C2D]">
                      Est. Total: ${estimatedOrderTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Form fields */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#777065] mb-1">
                        Contact Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Katherine Vance"
                        value={formState.fullName}
                        onChange={(e) =>
                          setFormState({ ...formState, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#777065] mb-1">
                        Company Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Vance Capital & Partners"
                        value={formState.companyName}
                        onChange={(e) =>
                          setFormState({ ...formState, companyName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#777065] mb-1">
                        Corporate Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="katherine@vancecap.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#777065] mb-1">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 234-8900"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#777065] mb-1">
                      Special Instructions / Timeline
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Specify requested delivery window, custom greeting card requests, or multiple dispatch addresses..."
                      value={formState.notes}
                      onChange={(e) =>
                        setFormState({ ...formState, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#183C2D] hover:bg-[#102D23] text-[#F8F5ED] text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Formal Corporate Enquiry</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

