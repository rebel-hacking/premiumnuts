"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Shield, Compass, Award } from "lucide-react";

interface ProductEditorialStoriesProps {
  onFilterCategory: (category: string) => void;
}

export default function ProductEditorialStories({
  onFilterCategory,
}: ProductEditorialStoriesProps) {
  const stories = [
    {
      categoryKey: "walnuts",
      eyebrow: "01 • THE SIGNATURE RESERVE",
      headline: "Naturally extraordinary.",
      supporting:
        "Discover the distinctive character and intricate natural beauty of walnuts. Hand-cracked at peak moisture to preserve the tender golden kernel and its pure, creamy, oil-rich architecture.",
      cta: "Explore Walnuts",
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1200&q=85",
      accentColor: "#183C2D",
      bgColor: "#F1EBDD",
      aspect: "landscape",
      quote: "A testament to slow nature: untouched shells that protect a golden heart.",
      details: [
        { label: "Grade", val: "Extra Light Halves (>85%)" },
        { label: "Palate", val: "Smooth, zero bitterness" },
        { label: "Character", val: "Radiant golden hue" },
      ],
    },
    {
      categoryKey: "almonds",
      eyebrow: "02 • THE IMPERIAL CRUNCH",
      headline: "Simply exceptional.",
      supporting:
        "Carefully composed almond harvests from sun-drenched coastal valleys. Each almond is hand-sorted for velvety bronze skins, dense fiber, and an assertive snap that releases aromatic sweet marzipan notes.",
      cta: "Explore Almonds",
      image: "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=1200&q=85",
      accentColor: "#641F35",
      bgColor: "#F8F5ED",
      aspect: "portrait",
      quote: "Dry-roasted over pure convection heat, preserving natural enzymes and unadulterated sweetness.",
      details: [
        { label: "Caliber", val: "Supreme 20/22" },
        { label: "Roast", val: "Slow drum convection" },
        { label: "Finish", val: "Clean toasted brioche" },
      ],
    },
    {
      categoryKey: "cashews",
      eyebrow: "03 • THE SILK CRESCENT",
      headline: "An elegant indulgence.",
      supporting:
        "Macro cashew photography reveals rich natural cream tones and voluptuous organic curves. Sourced exclusively from coastal estates where tropical rains yield jumbo W-180 mammoth caliber kernels.",
      cta: "Explore Cashews",
      image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=85",
      accentColor: "#102D23",
      bgColor: "#F1EBDD",
      aspect: "landscape",
      quote: "Velvety density that dissolves into sweet buttercream on the palate.",
      details: [
        { label: "Grade", val: "King W-180 Mammoth" },
        { label: "Texture", val: "Velvet buttery chew" },
        { label: "Integrity", val: "100% whole unbroken" },
      ],
    },
    {
      categoryKey: "pistachios",
      eyebrow: "04 • THE EMERALD JEWEL",
      headline: "A little extraordinary.",
      supporting:
        "Naturally opened pistachios bursting with vibrant jade kernels and organic shell textures. Bathed in mountain sunshine and finished with mineral-rich crystal salt that honors their botanical nobility.",
      cta: "Explore Pistachios",
      image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=85",
      accentColor: "#183C2D",
      bgColor: "#F8F5ED",
      aspect: "portrait",
      quote: "Sun-split along natural sutures, offering effortless opening and vivid emerald luster.",
      details: [
        { label: "Split", val: "100% natural tree-burst" },
        { label: "Hue", val: "Deep jade & violet blush" },
        { label: "Mineral", val: "Sun-evaporated sea salt" },
      ],
    },
    {
      categoryKey: "mixed",
      eyebrow: "05 • THE GRAND HARMONY",
      headline: "Discover more to savour.",
      supporting:
        "Refined mixed-nut compositions celebrating natural variety and rich textural contrasts. An orchestrated tasting journey connecting orchards from California to Piedmont and Mangalore.",
      cta: "Explore Collection",
      image: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=1200&q=85",
      accentColor: "#641F35",
      bgColor: "#E8DDC8",
      aspect: "landscape",
      quote: "Every handful reveals an interplay of buttery crunch, silky sweetness, and subtle salinity.",
      details: [
        { label: "Assortment", val: "Four premier single origins" },
        { label: "Packaging", val: "Airtight wooden keepsake" },
        { label: "Experience", val: "The connoisseur's benchmark" },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F5ED] text-[#29251F] border-t border-[#E8DDC8]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Story Section Intro */}
        <div className="max-w-2xl mb-16 sm:mb-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C9A80] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
            <span>Sensorial Artistry</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-5xl text-[#183C2D] font-normal tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            The Botanical Anthology
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#777065] font-light leading-relaxed">
            Each nut in our repertoire possesses a distinct lineage, microclimate origin, and
            gastronomic personality. We celebrate these natural masterpieces with bespoke curation.
          </p>
        </div>

        {/* Alternating Editorial Showcase Blocks */}
        <div className="flex flex-col gap-24 sm:gap-32">
          {stories.map((story, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={story.categoryKey}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12 lg:gap-16`}
              >
                {/* Visual Imagery Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl bg-white border border-[#E8DDC8] shadow-lg">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.headline}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Editorial Caption Tag */}
                    <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#E8DDC8]/80 text-[#29251F] shadow-sm">
                      <p className="font-serif italic text-sm sm:text-base text-[#183C2D] leading-snug">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editorial Narrative Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C9A80] mb-3">
                    {story.eyebrow}
                  </span>

                  <h3
                    className="font-serif text-3xl sm:text-5xl text-[#183C2D] font-normal leading-[1.1] mb-5 tracking-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {story.headline}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#777065] font-light leading-relaxed mb-8">
                    {story.supporting}
                  </p>

                  {/* Specification Matrix */}
                  <div className="grid grid-cols-3 gap-4 py-5 border-y border-[#E8DDC8] mb-8">
                    {story.details.map((detail, dIdx) => (
                      <div key={dIdx}>
                        <span className="block text-[10px] uppercase tracking-wider text-[#8C9A80] font-semibold mb-1">
                          {detail.label}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#29251F]">
                          {detail.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Direct Link CTA */}
                  <div>
                    <button
                      onClick={() => onFilterCategory(story.categoryKey)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183C2D] hover:bg-[#102D23] text-[#F8F5ED] text-xs uppercase tracking-widest font-medium transition-all shadow-xs hover:gap-3"
                    >
                      <span>{story.cta}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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

