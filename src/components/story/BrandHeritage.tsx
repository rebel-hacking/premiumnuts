"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Compass, HeartHandshake, Trees, Clock } from "lucide-react";

export default function BrandHeritage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const badgeY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.03]);

  const heritagePillars = [
    {
      icon: Trees,
      title: "Orchard Lineage",
      desc: "We partner exclusively with multi-generational growers where soil microclimate, mountain runoff, and slow seasonal ripening allow nuts to reach their true botanical potential.",
    },
    {
      icon: Clock,
      title: "The Art of Slow Harvesting",
      desc: "No premature shaking or forced mechanical drying. We harvest only as nature signals peak oil maturation, ensuring profound natural sweetness and crisp cellular snap.",
    },
    {
      icon: HeartHandshake,
      title: "The Tactile Ritual of Giving",
      desc: "Luxury is not merely an ingredient; it is the anticipation of unboxing. We create rigid presentation sleeves, wax seals, and velvet linings worthy of life's defining milestones.",
    },
  ];

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#F1EBDD] text-[#29251F] relative overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C9A80] block mb-3">
            MAISON PHILOSOPHY
          </span>
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#183C2D] font-normal tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Rooted in nature. Made for moments.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#777065] font-light leading-relaxed">
            Premium Nuts was conceived on a singular tenet: that the earth&apos;s simplest creations,
            when nurtured under ideal conditions and presented with uncompromising artistry,
            rival the world&apos;s greatest delicacies.
          </p>
        </motion.div>

        {/* Editorial Split Grid: Sticky Left Heritage Photo + Scrolling Narrative Pillars on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center lg:items-start">
          {/* Main Visual Composition */}
          <div className="lg:col-span-7 relative lg:sticky lg:top-28">
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8DDC8] shadow-2xl bg-white"
              style={{ position: "relative" }}
            >
              <motion.div style={{ scale: photoScale }} className="absolute inset-0">
                <Image
                  src="/images/lifestyle/harvest-heritage.jpg"
                  alt="Harvested gourmet nuts"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Desktop-only gradient overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Desktop-only archival note overlay */}
              <div className="hidden md:block absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E8DDC8] block mb-1">
                  ARCHIVAL NOTE
                </span>
                <p className="font-serif text-lg sm:text-xl font-normal leading-snug">
                  &ldquo;Every shell carries the quiet history of a full season&apos;s sun and rain.&rdquo;
                </p>
              </div>
            </div>

            {/* Mobile-only Archival Note below image (leaves mobile photo clear) */}
            <div className="md:hidden mt-3 p-3.5 rounded-xl bg-white border border-[#E8DDC8] text-xs shadow-xs">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#702D3C] block mb-1">
                ARCHIVAL NOTE
              </span>
              <p className="font-serif text-base text-[#183D30] font-normal leading-snug">
                &ldquo;Every shell carries the quiet history of a full season&apos;s sun and rain.&rdquo;
              </p>
            </div>

            {/* Overlapping Floating Badge with subtle parallax */}
            <motion.div
              style={{ y: badgeY }}
              className="hidden sm:flex absolute -bottom-6 right-2 lg:-bottom-8 lg:-right-8 w-44 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8DDC8] shadow-xl flex-col items-center text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#183C2D] text-[#F8F5ED] flex items-center justify-center font-serif text-sm font-semibold mb-2">
                100%
              </div>
              <span className="text-[11px] font-semibold text-[#183C2D] uppercase tracking-wider">
                Single Origin
              </span>
              <span className="text-[10px] text-[#777065] mt-0.5">
                Traceable to individual micro-groves
              </span>
            </motion.div>
          </div>

          {/* Pillars Column */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-10">
            {heritagePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-xl bg-white/80 border border-[#E8DDC8] shadow-xs hover:border-[#183C2D]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#183C2D]/10 text-[#183C2D] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className="font-serif text-xl text-[#183C2D] font-normal"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#777065] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

