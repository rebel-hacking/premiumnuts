"use client";

import React from "react";
import Image from "next/image";
import { Ingredient } from "@/types";
import { Check, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selectedIds: string[];
  onToggleIngredient: (ingredient: Ingredient) => void;
  maxSelections?: number;
}

export default function IngredientSelector({
  ingredients,
  selectedIds,
  onToggleIngredient,
  maxSelections = 6,
}: IngredientSelectorProps) {
  const activeIngredients = ingredients.filter((ing) => ing.active);
  const selectedCount = selectedIds.length;
  const isComplete = selectedCount === maxSelections;

  return (
    <div className="w-full">
      {/* Live Selection Counter & Status Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#F2E8D8] border border-[#B89A65]/40 mb-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#702D3C]">
              CHOOSE YOUR SIX VARIETIES
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#702D3C] text-[#FAF6EF] font-semibold tracking-wider">
              Step 2 of 2
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#777065] font-light">
            Select any <strong className="text-[#702D3C] font-semibold">6 varieties</strong> to be
            portioned into the 6 golden compartments of your gift hamper.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 transition-all duration-300 ${
              isComplete
                ? "bg-[#702D3C] text-[#FAF6EF] border-[#702D3C] shadow-md ring-2 ring-[#B89A65]/40"
                : "bg-white text-[#29251F] border-[#B89A65]/50 shadow-xs"
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="w-4 h-4 text-[#B89A65]" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#B89A65]" />
            )}
            <span className="font-serif text-base font-semibold tracking-wide">
              {selectedCount} / {maxSelections} Selected
            </span>
          </div>
        </div>
      </div>

      {/* Completion Notification Banner */}
      {isComplete ? (
        <div className="mb-6 p-4 rounded-xl bg-[#702D3C]/10 border border-[#702D3C]/30 flex items-center justify-between text-xs sm:text-sm text-[#702D3C] font-medium animate-fade-in shadow-xs">
          <span className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#702D3C] stroke-[2.5]" />
            <span>Your six varieties are selected! You can now add your hamper to bag or buy now.</span>
          </span>
          <span className="text-[11px] text-[#777065] hidden md:inline">Tap any card to replace</span>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-white border border-[#B89A65]/30 flex items-center gap-2.5 text-xs text-[#777065] shadow-xs">
          <AlertCircle className="w-4 h-4 text-[#B89A65] shrink-0" />
          <span>
            Please select {maxSelections - selectedCount} more {maxSelections - selectedCount === 1 ? "variety" : "varieties"} to complete your 6-compartment gift hamper.
          </span>
        </div>
      )}

      {/* Responsive Ingredient Grid (4-5 desktop, 3-4 tablet, 2 mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
        {activeIngredients.map((ingredient) => {
          const isSelected = selectedIds.includes(ingredient.id);
          const isDisabled = !isSelected && isComplete;

          return (
            <button
              type="button"
              key={ingredient.id}
              onClick={() => onToggleIngredient(ingredient)}
              disabled={isDisabled}
              className={`group relative text-left rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between border touch-manipulation ${
                isSelected
                  ? "bg-[#FBF6F7] border-2 border-[#702D3C] shadow-xl shadow-[#702D3C]/15 ring-2 ring-[#B89A65]/40 -translate-y-1.5"
                  : isDisabled
                  ? "bg-[#FAF6EF]/60 border-[#F2E8D8] opacity-40 grayscale-[25%] cursor-not-allowed"
                  : "bg-white hover:bg-white border-[#B89A65]/35 hover:border-[#702D3C] shadow-xs hover:shadow-xl hover:-translate-y-1.5"
              }`}
            >
              {/* End-to-End Image Container (Flush to edges of card, no margin space) */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#FAF6EF] to-[#F2E8D8] border-b border-[#B89A65]/20"
                style={{ position: "relative" }}
              >
                <Image
                  src={ingredient.image}
                  alt={ingredient.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isSelected ? "scale-106" : "group-hover:scale-106"
                  }`}
                />

                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Selection Checkmark Indicator Badge */}
                <div
                  className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "bg-[#702D3C] text-[#FAF6EF] ring-2 ring-[#B89A65] shadow-md scale-100"
                      : "bg-white/90 text-transparent border border-[#B89A65]/60 scale-95 opacity-85 group-hover:opacity-100 group-hover:border-[#702D3C]"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                {/* Luxury Category Tag */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#702D3C]/90 backdrop-blur-md text-[8.5px] font-semibold text-[#FAF6EF] uppercase tracking-[0.16em] border border-[#B89A65]/30 shadow-xs">
                  {ingredient.category}
                </div>
              </div>

              {/* Text Info Area (with comfortable inner padding) */}
              <div className="w-full flex-1 p-3.5 sm:p-4 flex flex-col justify-between bg-white/70">
                <div>
                  <h4
                    className={`font-serif text-base sm:text-[17px] leading-tight transition-colors duration-200 ${
                      isSelected
                        ? "text-[#702D3C] font-semibold"
                        : "text-[#29251F] font-medium group-hover:text-[#702D3C]"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {ingredient.name}
                  </h4>
                  <p className="text-[10.5px] text-[#777065] line-clamp-1 mt-1 font-light tracking-wide">
                    {ingredient.tagline}
                  </p>
                </div>

                {/* Micro Luxury Status Cue */}
                <div className="mt-3 pt-2.5 border-t border-[#F2E8D8] flex items-center justify-between text-[9.5px]">
                  <span
                    className={`font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                      isSelected ? "text-[#702D3C]" : "text-[#B89A65]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-[#702D3C]" : "bg-[#B89A65]"
                      }`}
                    />
                    {isSelected ? "Compartment Selected" : "Grade A+ Reserve"}
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
