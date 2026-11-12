"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function CorporateGiftingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.03]);
  const cardY = useTransform(scrollYProgress, [0, 1], [14, -14]);

  const corporateBenefits = [
    "Custom logo hot-stamping on royal burgundy sleeves",
    "Choice of custom 6-variety ingredient combinations per batch",
    "Individual employee and client desk delivery across India",
    "Dedicated Corporate Concierge manager for seamless fulfillment",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#183D30] text-[#FAF6EF] relative overflow-x-clip"
    >
      {/* Subtle gold watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(184,154,101,0.18),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center lg:items-start">
          {/* Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#B89A65] mb-3">
              <Building2 className="w-4 h-4" />
              <span>EXECUTIVE & ENTERPRISE GIFTING</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-5xl text-[#FAF6EF] font-normal tracking-tight leading-[1.1] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Elevate Your Corporate Relationships
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#F2E8D8]/85 font-light leading-relaxed mb-8">
              Make every business touchpoint unforgettable. From client onboarding tokens and
              executive holiday celebrations to major annual shareholder galas, our bespoke
              magnetic hampers convey prestige, wellness, and genuine regard.
            </p>

            <ul className="space-y-3 mb-8">
              {corporateBenefits.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 text-xs text-[#F2E8D8]/95"
                >
                  <div className="w-5 h-5 rounded-full bg-[#B89A65]/20 text-[#B89A65] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>

            <div>
              <Link
                href="/corporate-gifting"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#B89A65] hover:bg-[#a58957] text-[#102B22] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-xl"
              >
                <span>EXPLORE CORPORATE GIFTING</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Column: Sticky on desktop, natural flow on mobile/tablet */}
          <div className="lg:col-span-6 relative lg:sticky lg:top-28">
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#B89A65]/40 shadow-2xl bg-[#102B22]"
              style={{ position: "relative" }}
            >
              <motion.div style={{ scale: visualScale }} className="absolute inset-0">
                <Image
                  src="/images/corporate/corporate-hampers-grid.jpg"
                  alt="Corporate Hampers Presentation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Desktop-only gradient overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#102B22]/80 via-transparent to-transparent" />

              {/* Desktop-only overlay pill (Untouched on desktop) */}
              <motion.div
                style={{ y: cardY }}
                className="hidden md:block absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#102B22]/90 backdrop-blur-md border border-[#B89A65]/40 text-xs text-[#FAF6EF]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-[#FAF6EF]">
                    Bespoke Bulk Tier Orders
                  </span>
                  <span className="text-[#B89A65] font-semibold">10 to 5,000+ Units</span>
                </div>
                <p className="text-[11px] text-[#F2E8D8]/75 mt-0.5">
                  Dedicated corporate specialist assigned to oversee custom artwork proofing and logistics.
                </p>
              </motion.div>
            </div>

            {/* Mobile-only info card below image (unblocks corporate image on mobile) */}
            <div className="md:hidden mt-3 p-3.5 rounded-2xl bg-[#102B22] border border-[#B89A65]/40 text-xs text-[#FAF6EF] shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base text-[#FAF6EF]">
                  Bespoke Bulk Tier Orders
                </span>
                <span className="text-[#B89A65] font-semibold">10 to 5,000+ Units</span>
              </div>
              <p className="text-[11px] text-[#F2E8D8]/75 mt-0.5 font-light leading-relaxed">
                Dedicated corporate specialist assigned to oversee custom artwork proofing and logistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

