"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SeasonalOffer } from "@/types";
import rawOffers from "@/data/offers.json";
import { Sparkles, ArrowRight, Tag, Calendar } from "lucide-react";

export default function SeasonalOffersSection() {
  const offers = rawOffers as SeasonalOffer[];

  // Filter offers that are marked active and within start/end dates
  const now = new Date();
  const currentDateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

  const activeOffers = offers.filter((offer) => {
    if (!offer.active) return false;
    if (offer.startDate && currentDateStr < offer.startDate) return false;
    if (offer.endDate && currentDateStr > offer.endDate) return false;
    return true;
  });

  // Part 13.2: "If no offers are active, hide the entire offers section automatically. Do not leave empty spacing."
  if (activeOffers.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 bg-[#102B22] text-[#FAF6EF] relative overflow-hidden">
      {/* Subtle luxury backdrop motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(184,154,101,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_left,rgba(112,45,60,0.25),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B89A65]/15 border border-[#B89A65]/30 text-[#B89A65] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEASONAL PRIVILEGES</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-5xl text-[#FAF6EF] font-normal tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Curated Festive Offers
          </h2>
          <p className="text-xs sm:text-sm text-[#F2E8D8]/80 font-light mt-2 max-w-lg mx-auto">
            Limited-period celebration privileges, complimentary bespoke packaging, and corporate tier benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="group relative rounded-3xl overflow-hidden bg-[#183D30] border border-[#B89A65]/30 shadow-xl flex flex-col justify-between"
            >
              <div
                className="relative aspect-[16/9] w-full overflow-hidden bg-[#102B22]"
                style={{ position: "relative" }}
              >
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183D30] via-transparent to-transparent opacity-85" />

                {/* Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#702D3C] text-white text-[10px] font-semibold tracking-wider uppercase shadow-xs">
                  <Tag className="w-3 h-3 text-[#B89A65]" />
                  <span>{offer.badge}</span>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {offer.discountHighlight && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B89A65] block mb-1">
                      {offer.discountHighlight}
                    </span>
                  )}
                  <h3
                    className="font-serif text-2xl sm:text-3xl text-[#FAF6EF] font-normal mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F2E8D8]/80 font-light leading-relaxed mb-6">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B89A65]/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#F2E8D8]/70">
                    <Calendar className="w-3.5 h-3.5 text-[#B89A65]" />
                    <span>Valid until {offer.endDate}</span>
                  </div>

                  <Link
                    href={offer.ctaLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF6EF] hover:bg-white text-[#183D30] text-xs uppercase tracking-wider font-semibold transition-all group-hover:shadow-md"
                  >
                    <span>{offer.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

