"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import rawIngredients from "@/data/ingredients.json";
import { Ingredient } from "@/types";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ChooseYourGoodnessSection() {
  const ingredients = rawIngredients as Ingredient[];

  return (
    <section className="py-24 sm:py-32 bg-[#F2E8D8] text-[#29251F] border-t border-[#B89A65]/30 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#702D3C] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A65]" />
            <span>BESPOKE INGREDIENT CURATION</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-5xl text-[#702D3C] font-normal tracking-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Your Hamper. Your Selection.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#777065] font-light max-w-lg mx-auto">
            Choose any six varieties from our thirteen world-class harvests. Every box is prepared fresh to order in our satin gold partitioned tray.
          </p>
        </motion.div>

        {/* 13 Ingredients Preview Grid (Responsive 2 to 5 columns) with End-to-End Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5 mb-14">
          {ingredients.map((ing, idx) => (
            <motion.div
              key={ing.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: (idx % 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl overflow-hidden bg-white border border-[#B89A65]/35 hover:border-[#702D3C] shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* End-to-End Image Container (Flush to edges of card, no margin space) */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#FAF6EF] to-[#F2E8D8] border-b border-[#B89A65]/20"
                style={{ position: "relative" }}
              >
                <Image
                  src={ing.image}
                  alt={ing.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#702D3C]/90 backdrop-blur-md text-[8.5px] font-semibold text-[#FAF6EF] uppercase tracking-[0.16em] border border-[#B89A65]/30 shadow-xs">
                  {ing.category}
                </div>
              </div>

              {/* Text Info Area (with comfortable inner padding) */}
              <div className="w-full flex-1 p-3.5 sm:p-4 flex flex-col justify-between bg-white/70">
                <div>
                  <h3
                    className="font-serif text-base sm:text-[17px] text-[#29251F] font-medium leading-tight group-hover:text-[#702D3C] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {ing.name}
                  </h3>
                  <p className="text-[10.5px] text-[#777065] font-light truncate mt-1">
                    {ing.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#F2E8D8] flex items-center justify-between text-[9.5px]">
                  <span className="font-semibold uppercase tracking-wider text-[#B89A65] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89A65]" />
                    Reserve Harvest
                  </span>
                  <span className="text-[#702D3C] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Curate →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Link Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center p-6 sm:p-8 rounded-3xl bg-white border border-[#B89A65]/40 max-w-xl mx-auto shadow-md"
        >
          <p className="text-xs sm:text-sm text-[#777065] font-light mb-4">
            Ready to hand-pick your six varieties? Step into our interactive customizer.
          </p>
          <Link
            href="/our-hamper"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>SELECT YOUR 6 VARIETIES NOW</span>
            <ArrowRight className="w-4 h-4 text-[#B89A65]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
