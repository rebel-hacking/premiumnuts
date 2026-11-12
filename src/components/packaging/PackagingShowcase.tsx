"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Shield, Gift, ArrowRight, Check } from "lucide-react";

export default function PackagingShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const detailY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const mainScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.03]);

  const packagingFeatures = [
    {
      title: "Magnetic Flap Precision Closure",
      desc: "An acoustic and tactile snap that signals uncompromising luxury from the moment of unboxing.",
    },
    {
      title: "Satin Gold 6-Partition Tray",
      desc: "Custom-molded food-grade interior dividers keep every single ingredient pristine and separate.",
    },
    {
      title: "Embossed Foil Sleeve & Ribbon",
      desc: "Adorned with gold hot-stamped branding, hand-tied satin grosgrain ribbon, and personalized calligraphy cards.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#FAF6EF] text-[#29251F] border-t border-[#F2E8D8] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center lg:items-start">
          {/* Visual Showcase Side: Sticky on desktop, natural scroll on mobile/tablet */}
          <div className="lg:col-span-6 relative lg:sticky lg:top-28">
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#B89A65]/40 shadow-2xl bg-white"
              style={{ position: "relative" }}
            >
              <motion.div style={{ scale: mainScale }} className="absolute inset-0">
                <Image
                  src="/images/hamper/signature-hamper-main.jpg"
                  alt="Premium Nuts Magnetic Gift Hamper"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Desktop-only gradient overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

              {/* Desktop-only overlay pill (Untouched on desktop) */}
              <div className="hidden md:block absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#F2E8D8] text-xs">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#702D3C] block mb-0.5">
                  THE SIGNATURE BOX
                </span>
                <p className="font-serif text-base text-[#183D30] font-normal">
                  Royal Burgundy Exterior with Satin Gold 6-Compartment Interior
                </p>
              </div>
            </div>

            {/* Mobile-only caption card rendered cleanly below image (leaves mobile image unblocked) */}
            <div className="md:hidden mt-3 p-3.5 rounded-xl bg-white border border-[#F2E8D8] text-xs shadow-xs">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#702D3C] block mb-0.5">
                THE SIGNATURE BOX
              </span>
              <p className="font-serif text-base text-[#183D30] font-normal">
                Royal Burgundy Exterior with Satin Gold 6-Compartment Interior
              </p>
            </div>

            {/* Overlapping Detail Vignette with subtle scroll parallax */}
            <motion.div
              className="hidden sm:block absolute -bottom-6 right-2 lg:-bottom-8 lg:-right-8 w-56 h-40 rounded-2xl overflow-hidden border-2 border-white shadow-2xl"
              style={{ position: "absolute", width: "14rem", height: "10.5rem", y: detailY }}
            >
              <Image
                src="/images/hamper/signature-hamper-closure.jpg"
                alt="Magnetic closure detail"
                fill
                sizes="224px"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Narrative Content Side */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#B89A65] mb-3">
              <Gift className="w-3.5 h-3.5" />
              <span>THE UNBOXING RITUAL</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal tracking-tight leading-[1.1] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The Art of Packaging
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#777065] font-light leading-relaxed mb-8">
              We believe a gift should enchant before it is even tasted. Our signature hamper is
              crafted from heavyweight rigid bookbinding paperboard, wrapped in deep burgundy sheen,
              and engineered with hidden neodymium magnetic closures for effortless elegance.
            </p>

            <div className="space-y-4 mb-8">
              {packagingFeatures.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#F2E8D8] shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#183D30] text-[#FAF6EF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#183D30] font-medium leading-snug">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-[#777065] font-light mt-0.5">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <Link
                href="/our-hamper"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#183D30] hover:bg-[#102B22] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>Curate Your Hamper Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

