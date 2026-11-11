"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { WHATSAPP_PHONE_RAW, WHATSAPP_BASE_URL } from "@/lib/whatsapp";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#102B22] text-[#FAF6EF] pt-20 pb-12 border-t border-[#B89A65]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Newsletter & Maison Banner */}
        <div className="pb-14 border-b border-[#B89A65]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#B89A65] block mb-2">
              THE MAISON GIFTING GAZETTE
            </span>
            <h3
              className="font-serif text-3xl sm:text-4xl text-[#FAF6EF] font-normal leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Moments Worth Gifting
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#F2E8D8]/80 font-light leading-relaxed max-w-lg">
              Receive previews of limited harvest releases, seasonal festive box curations, and corporate gifting privileges.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#183D30] border border-[#B89A65]/40 flex items-center gap-3 text-xs text-[#F2E8D8]">
                <Check className="w-5 h-5 text-[#B89A65]" />
                <span>You have been subscribed to our seasonal harvest gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your personal or business email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-[#B89A65]/40 text-xs text-[#FAF6EF] placeholder-[#F2E8D8]/60 focus:outline-none focus:border-[#B89A65]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#B89A65] hover:bg-[#a58957] text-[#102B22] text-xs uppercase tracking-widest font-semibold transition-all shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 text-xs">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#183D30] flex items-center justify-center text-[#FAF6EF] font-serif text-sm font-semibold border border-[#B89A65]/40">
                PN
              </div>
              <span
                className="font-serif text-xl tracking-[0.18em] uppercase text-[#FAF6EF]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                PREMIUM NUTS
              </span>
            </div>
            <p className="text-[#F2E8D8]/75 text-xs leading-relaxed max-w-sm mb-6 font-light">
              Purveyors of handcrafted luxury magnetic-closure dry fruits and nuts gift hampers.
              We believe a thoughtful gift should express beauty, care, and extraordinary taste.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#183D30] hover:bg-[#102B22] text-[#FAF6EF] text-xs border border-[#B89A65]/40 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#B89A65]" />
                <span>WhatsApp: {WHATSAPP_PHONE_RAW}</span>
              </a>
            </div>
          </div>

          {/* Maison Links */}
          <div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#B89A65] mb-4 font-normal">
              Maison
            </h4>
            <ul className="space-y-2.5 text-[#F2E8D8]/80 font-light">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-hamper" className="hover:text-white transition-colors">
                  Our Hamper
                </Link>
              </li>
              <li>
                <Link href="/corporate-gifting" className="hover:text-white transition-colors">
                  Corporate Gifting
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Gifting & Sizes */}
          <div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#B89A65] mb-4 font-normal">
              Hamper Sizes
            </h4>
            <ul className="space-y-2.5 text-[#F2E8D8]/80 font-light">
              <li>
                <Link href="/our-hamper" className="hover:text-white transition-colors">
                  Small Hamper (₹499)
                </Link>
              </li>
              <li>
                <Link href="/our-hamper" className="hover:text-white transition-colors">
                  Medium Hamper (₹699)
                </Link>
              </li>
              <li>
                <Link href="/our-hamper" className="hover:text-white transition-colors">
                  Large Hamper (₹999)
                </Link>
              </li>
              <li>
                <Link href="/corporate-gifting" className="hover:text-white transition-colors">
                  Bulk Corporate Hampers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#B89A65] mb-4 font-normal">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-[#F2E8D8]/80 font-light">
              <li>
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Ordering
                </a>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Hamper FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 border-t border-[#B89A65]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F2E8D8]/60 gap-4">
          <p>© 2026 PREMIUM NUTS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Currency: INR (₹)</span>
            <span>Handcrafted Magnetic Closure Hampers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
