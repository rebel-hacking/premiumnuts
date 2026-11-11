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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#F2E8D8] border border-[#B89A65]/40 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183D30]">
              CHOOSE YOUR SIX VARIETIES
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#183D30] text-[#FAF6EF] font-semibold">
              Step 2 of 2
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#777065]">
            Select any <strong className="text-[#183D30] font-semibold">6 varieties</strong> to be
            portioned into the 6 golden compartments of your gift hamper.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 transition-all ${
              isComplete
                ? "bg-[#183D30] text-[#FAF6EF] border-[#183D30] shadow-sm"
                : "bg-white text-[#29251F] border-[#B89A65]/50"
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
        <div className="mb-6 p-3.5 rounded-xl bg-[#183D30]/10 border border-[#183D30]/30 flex items-center justify-between text-xs sm:text-sm text-[#183D30] font-medium animate-fade-in">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#183D30] stroke-[2.5]" />
            <span>Your six varieties are selected! You can now add your hamper to bag or buy now.</span>
          </span>
          <span className="text-[11px] text-[#777065] hidden md:inline">Tap any card to replace</span>
        </div>
      ) : (
        <div className="mb-6 p-3.5 rounded-xl bg-white border border-[#F2E8D8] flex items-center gap-2 text-xs text-[#777065]">
          <AlertCircle className="w-4 h-4 text-[#B89A65] shrink-0" />
          <span>
            Please select {maxSelections - selectedCount} more {maxSelections - selectedCount === 1 ? "variety" : "varieties"} to complete your 6-compartment gift hamper.
          </span>
        </div>
      )}

      {/* Responsive Ingredient Grid (4-5 desktop, 3-4 tablet, 2 mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {activeIngredients.map((ingredient) => {
          const isSelected = selectedIds.includes(ingredient.id);
          const isDisabled = !isSelected && isComplete;

          return (
            <button
              type="button"
              key={ingredient.id}
              onClick={() => onToggleIngredient(ingredient)}
              disabled={isDisabled}
              className={`group relative text-left rounded-xl p-2.5 sm:p-3 transition-all duration-300 flex flex-col justify-between border touch-manipulation ${
                isSelected
                  ? "bg-[#FAF6EF] border-[#183D30] shadow-md ring-1 ring-[#183D30]/20 -translate-y-0.5"
                  : isDisabled
                  ? "bg-[#FAF6EF]/60 border-[#F2E8D8] opacity-50 cursor-not-allowed"
                  : "bg-white hover:bg-[#FAF6EF] border-[#F2E8D8] hover:border-[#B89A65] hover:shadow-sm"
              }`}
            >
              {/* Image Container with 1:1 square ratio */}
              <div
                className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F2E8D8] mb-2.5"
                style={{ position: "relative" }}
              >
                <Image
                  src={ingredient.image}
                  alt={ingredient.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className={`object-cover transition-transform duration-500 ${
                    isSelected ? "scale-105" : "group-hover:scale-105"
                  }`}
                />

                {/* Selection Checkmark Indicator Badge */}
                <div
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#183D30] text-[#FAF6EF] shadow-sm scale-100"
                      : "bg-white/85 text-transparent border border-black/10 scale-90 opacity-70 group-hover:opacity-100"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                {/* Subtle category tag */}
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-sm bg-black/50 backdrop-blur-xs text-[9px] font-medium text-white uppercase tracking-wider">
                  {ingredient.category}
                </div>
              </div>

              {/* Text Info */}
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h4
                    className={`font-serif text-sm sm:text-base leading-tight font-medium ${
                      isSelected ? "text-[#183D30]" : "text-[#29251F]"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {ingredient.name}
                  </h4>
                </div>
                <p className="text-[10px] text-[#777065] line-clamp-1 mt-0.5 font-light">
                  {ingredient.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

