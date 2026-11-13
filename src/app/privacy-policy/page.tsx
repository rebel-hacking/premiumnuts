"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#702D3C] selection:text-[#FAF6EF]">
      <Navbar />
      <CartDrawer />

      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#702D3C] block mb-2">
            LEGAL DISCLOSURE
          </span>
          <h1
            className="font-serif text-3xl sm:text-5xl text-[#702D3C] font-normal tracking-tight mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Privacy Policy
          </h1>

          <div className="prose prose-stone text-xs sm:text-sm text-[#777065] leading-relaxed space-y-6 font-light">
            <p>
              At <strong>PREMIUM NUTS</strong>, we value the trust you place in us when sharing your
              personal information for gifting purposes. This Privacy Policy outlines how your
              details are handled when visiting our website or ordering via WhatsApp.
            </p>

            <h3 className="font-serif text-xl text-[#702D3C] font-normal pt-2">
              1. Information We Collect
            </h3>
            <p>
              When configuring a gift hamper or preparing an order, we collect information you
              provide voluntarily, including recipient name, delivery address, phone number,
              city, PIN code, and personalized gift card messages.
            </p>

            <h3 className="font-serif text-xl text-[#702D3C] font-normal pt-2">
              2. How Your Information Is Used
            </h3>
            <p>
              Your contact details are strictly utilized to coordinate order fulfillment, generate
              pre-filled WhatsApp messages for your review, and dispatch hampers via our
              temperature-controlled logistics partners. We do not sell, rent, or trade your data
              to third-party advertising brokers.
            </p>

            <h3 className="font-serif text-xl text-[#702D3C] font-normal pt-2">
              3. WhatsApp Communications
            </h3>
            <p>
              Our order checkout connects directly to WhatsApp. Any communication held over WhatsApp
              is governed by standard end-to-end encryption protocols provided by Meta/WhatsApp,
              ensuring your discussions with our concierge remain private.
            </p>

            <h3 className="font-serif text-xl text-[#702D3C] font-normal pt-2">
              4. Data Retention & Contact
            </h3>
            <p>
              You may request the deletion of your customer contact record at any time by messaging
              our team at <strong>+91 7829267846</strong> or emailing{" "}
              <strong>concierge@premiumnuts.in</strong>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

