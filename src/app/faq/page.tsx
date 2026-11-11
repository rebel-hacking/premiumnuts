"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { ChevronDown, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_BASE_URL, WHATSAPP_PHONE_RAW } from "@/lib/whatsapp";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is included in the hamper?",
      a: "Every hamper includes our signature royal burgundy rigid bookbinding presentation box with hidden magnetic flap closure, a food-grade satin gold tray featuring 6 equal compartments, your choice of six selected dry fruits and nuts, and a hand-tied embossed satin ribbon with a personalized handwritten wax-sealed card.",
    },
    {
      q: "Can I choose my own six varieties?",
      a: "Yes, absolutely! Unlike ordinary pre-packed gift hampers, PREMIUM NUTS allows you to select any six varieties from our curated menu of thirteen world-class harvests (including almonds, cashews, walnuts, pistachios, raisins, dates, figs, apricots, hazelnuts, macadamias, Brazil nuts, pecans, and pine nuts).",
    },
    {
      q: "What are the available hamper sizes and weights?",
      a: "We offer three calibrated sizes: Small (~450g total, ~75g per compartment), Medium (~750g total, ~125g per compartment), and Large (~1.2kg total, ~200g per compartment). All three sizes feature the same six partitioned layout.",
    },
    {
      q: "What are the official prices and discounts?",
      a: "Our transparent pricing is: Small sells at ₹499 (Original ₹899, save 44%), Medium sells at ₹699 (Original ₹1,099, save 36%), and Large sells at ₹999 (Original ₹1,499, save 33%). These prices apply to all standard six-variety combinations.",
    },
    {
      q: "Can I order multiple hampers with different ingredient combinations?",
      a: "Yes. Our cart system fully supports multiple hampers with unique combinations. For example, you can curate one Medium hamper with almonds, cashews, and dates for family, and a second Large hamper with walnuts, pistachios, and figs for colleagues.",
    },
    {
      q: "Do you accept corporate and bulk orders?",
      a: "Yes, corporate and organizational gifting is one of our key specialities. We cater to orders ranging from 10 to 5,000+ hampers, with options for bespoke company logo hot-stamping, custom color ribbons, and multi-address destination courier dispatch.",
    },
    {
      q: "Can packaging be customised with our company logo or personal names?",
      a: "Yes. For corporate orders (25+ hampers), we offer precision gold foil hot-stamping of your corporate logo on the outer sleeve. For personal orders, every box includes a complimentary personalized handwritten calligraphy card sealed with wax.",
    },
    {
      q: "How does the WhatsApp ordering process work?",
      a: "When you click 'Buy Now' or 'Place Order via WhatsApp' in your cart, our system generates a complete, formatted WhatsApp message containing your selected hamper size, the six ingredients, pricing, and your delivery details. It opens WhatsApp directly on your phone or desktop, allowing you to finalize the order seamlessly with our team.",
    },
    {
      q: "How is payment arranged?",
      a: "Once we receive your order details via WhatsApp, our team verifies fresh ingredient batch availability and provides secure digital payment options (UPI, GPay, PhonePe, Net Banking, or Corporate Bank Transfer/Invoice). No payment is taken directly on the website without personal verification.",
    },
    {
      q: "Can I request a specific delivery date for festivals or events?",
      a: "Yes! You can specify your desired delivery date or festive dispatch window in the delivery instructions field or directly during our WhatsApp consultation.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#183D30] selection:text-[#FAF6EF]">
      <Navbar />
      <CartDrawer />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-[#183D30] text-[#FAF6EF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B89A65] block mb-3">
            ASSISTANCE & CLARITY
          </span>
          <h1
            className="font-serif text-4xl sm:text-6xl text-[#FAF6EF] font-normal tracking-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#F2E8D8]/85 font-light max-w-lg mx-auto">
            Everything you need to know about our signature hamper, 6-variety selection, pricing, and WhatsApp order delivery.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-20 sm:py-28 bg-[#FAF6EF]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <div className="space-y-3.5">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-[#F2E8D8] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-[#FAF6EF]/50"
                  >
                    <span
                      className="font-serif text-lg sm:text-xl text-[#183D30] font-normal"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#B89A65] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#183D30]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#777065] leading-relaxed border-t border-[#F2E8D8]/60 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* WhatsApp Support Prompt */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#F2E8D8] border border-[#B89A65]/40 text-center space-y-3">
            <h3
              className="font-serif text-2xl text-[#183D30] font-normal"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Have a Different Question?
            </h3>
            <p className="text-xs text-[#777065] max-w-md mx-auto">
              Our Gifting Specialists are on standby to answer custom packaging inquiries or corporate bulk orders.
            </p>
            <div className="pt-2">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183D30] text-[#FAF6EF] text-xs uppercase tracking-wider font-semibold hover:bg-[#102B22] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#B89A65]" />
                <span>Chat with Us on WhatsApp ({WHATSAPP_PHONE_RAW})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

