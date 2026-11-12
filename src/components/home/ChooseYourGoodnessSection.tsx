"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import rawIngredients from "@/data/ingredients.json";
import { Ingredient } from "@/types";
import { Sparkles, ArrowRight, Check } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#183D30] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A65]" />
            <span>BESPOKE INGREDIENT CURATION</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal tracking-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Your Hamper. Your Selection.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#777065] font-light max-w-lg mx-auto">
            Choose any six varieties from our thirteen world-class harvests. Every box is prepared fresh to order in our satin gold partitioned tray.
          </p>
        </motion.div>

        {/* 13 Ingredients Preview Grid (Responsive 2 to 5 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-12">
          {ingredients.map((ing, idx) => (
            <motion.div
              key={ing.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: (idx % 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group p-3 rounded-2xl bg-white border border-[#B89A65]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF6EF] mb-2.5"
                style={{ position: "relative" }}
              >
                <Image
                  src={ing.image}
                  alt={ing.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-sm bg-black/50 backdrop-blur-xs text-[9px] font-medium text-white uppercase tracking-wider">
                  {ing.category}
                </div>
              </div>

              <div>
                <h3
                  className="font-serif text-base text-[#183D30] font-normal leading-tight group-hover:text-[#702D3C] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {ing.name}
                </h3>
                <p className="text-[10px] text-[#777065] font-light truncate mt-0.5">
                  {ing.tagline}
                </p>
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
          className="text-center p-6 rounded-2xl bg-white border border-[#B89A65]/40 max-w-xl mx-auto shadow-sm"
        >
          <p className="text-xs text-[#777065] mb-4">
            Ready to hand-pick your six varieties? Step into our interactive customizer.
          </p>
          <Link
            href="/our-hamper"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#183D30] hover:bg-[#102B22] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <span>SELECT YOUR 6 VARIETIES NOW</span>
            <ArrowRight className="w-4 h-4 text-[#B89A65]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

