"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#183D30] selection:text-[#FAF6EF]">
      <Navbar />
      <CartDrawer />

      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#183D30] block mb-2">
            CLIENT AGREEMENT
          </span>
          <h1
            className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal tracking-tight mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Terms and Conditions
          </h1>

          <div className="prose prose-stone text-xs sm:text-sm text-[#777065] leading-relaxed space-y-6 font-light">
            <p>
              Welcome to <strong>PREMIUM NUTS</strong>. By browsing this website, configuring
              hampers, or placing orders via our WhatsApp concierge, you agree to the following terms.
            </p>

            <h3 className="font-serif text-xl text-[#183D30] font-normal pt-2">
              1. Product & Customisation Nature
            </h3>
            <p>
              We specialize in custom dry fruits and nuts gift hampers featuring six customer-selected
              varieties in three designated sizes (Small ₹499, Medium ₹699, Large ₹999). Due to the
              botanical nature of agricultural harvests, natural variations in kernel size, hue, and
              texture may occur.
            </p>

            <h3 className="font-serif text-xl text-[#183D30] font-normal pt-2">
              2. Order Confirmation & Payment
            </h3>
            <p>
              Placing an order through this website generates a WhatsApp inquiry. An order is deemed
              confirmed only after our concierge verifies product availability, agrees upon delivery
              timelines with you, and receives payment via authorized digital payment methods.
            </p>

            <h3 className="font-serif text-xl text-[#183D30] font-normal pt-2">
              3. Deliveries & Freshness Guarantee
            </h3>
            <p>
              Every hamper is packaged hermetically in food-grade compartments before shipment. We
              work with express courier partners across India. Specific festival dispatch dates
              must be coordinated in advance.
            </p>

            <h3 className="font-serif text-xl text-[#183D30] font-normal pt-2">
              4. Corporate & Bulk Orders
            </h3>
            <p>
              Corporate orders with custom logo hot-stamping require advance artwork approval.
              Standard production and dispatch schedules apply as communicated during quotation.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

