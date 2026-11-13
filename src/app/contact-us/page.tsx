"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, Building2 } from "lucide-react";
import { WHATSAPP_PHONE_RAW, WHATSAPP_BASE_URL } from "@/lib/whatsapp";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Personal Gifting Query",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Direct WhatsApp message integration option or feedback
    const message = `Hello PREMIUM NUTS!\n\nSubject: ${formData.subject}\nFrom: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`;
    const url = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#702D3C] selection:text-[#FAF6EF]">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-[#4A1523] text-[#FAF6EF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B89A65] block mb-3">
            CLIENT CONCIERGE
          </span>
          <h1
            className="font-serif text-4xl sm:text-6xl text-[#FAF6EF] font-normal tracking-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            We Are Here to Assist You
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#F2E8D8]/85 font-light max-w-lg mx-auto">
            Have questions regarding custom 6-variety selection, bulk corporate requirements, or bespoke packaging? Reach out directly.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 sm:py-28 bg-[#FAF6EF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-[#F2E8D8] shadow-sm space-y-6">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#702D3C] block">
                  INSTANT COMMUNICATION
                </span>

                {/* WhatsApp Channel */}
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[#702D3C] text-[#FAF6EF] flex items-center gap-4 hover:bg-[#4A1523] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#B89A65]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#B89A65] block font-semibold">
                      Primary Channel
                    </span>
                    <span className="font-serif text-xl font-normal group-hover:text-white">
                      WhatsApp: {WHATSAPP_PHONE_RAW}
                    </span>
                    <span className="text-[11px] text-[#F2E8D8]/70 block mt-0.5">
                      Fastest response for order placement & queries
                    </span>
                  </div>
                </a>

                <div className="space-y-4 pt-2 text-xs text-[#777065]">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#702D3C] mt-0.5" />
                    <div>
                      <strong className="text-[#29251F] block">Telephone Helpline</strong>
                      <span>+91 {WHATSAPP_PHONE_RAW} (Mon–Sat, 10 AM – 7 PM IST)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#702D3C] mt-0.5" />
                    <div>
                      <strong className="text-[#29251F] block">Email Concierge</strong>
                      <span>concierge@premiumnuts.in</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#702D3C] mt-0.5" />
                    <div>
                      <strong className="text-[#29251F] block">Atelier & Distribution</strong>
                      <span>All-India Climate-Controlled Express Courier</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corporate Shortcut */}
              <div className="p-6 rounded-3xl bg-[#F2E8D8] border border-[#B89A65]/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#702D3C]" />
                  <div>
                    <h4 className="font-serif text-lg text-[#702D3C] font-normal">
                      Planning 25+ Hampers?
                    </h4>
                    <span className="text-[11px] text-[#777065]">
                      Use our dedicated bulk enterprise concierge.
                    </span>
                  </div>
                </div>
                <Link
                  href="/corporate-gifting"
                  className="px-4 py-2 rounded-full bg-[#702D3C] text-[#FAF6EF] text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap hover:bg-[#4A1523]"
                >
                  Bulk Quote
                </Link>
              </div>
            </div>

            {/* Direct Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#F2E8D8] shadow-sm">
              <h2
                className="font-serif text-2xl sm:text-3xl text-[#702D3C] font-normal mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Send Us a Message
              </h2>
              <p className="text-xs text-[#777065] mb-6">
                Fill out the form below to message our customer care team on WhatsApp with your query pre-filled.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#702D3C]/10 border border-[#702D3C]/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#702D3C] mx-auto" />
                  <h3 className="font-serif text-2xl text-[#702D3C]">Enquiry Connected</h3>
                  <p className="text-xs text-[#777065] max-w-sm mx-auto">
                    Your inquiry has been routed to our WhatsApp representative. We look forward to assisting you promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                      >
                        <option value="Personal Gifting Query">Personal Gifting Query</option>
                        <option value="Ingredient Availability">Ingredient Availability</option>
                        <option value="Corporate Bulk Enquiry">Corporate Bulk Enquiry</option>
                        <option value="Custom Delivery Timeline">Custom Delivery Timeline</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we assist your gifting plans today?..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#B89A65]" />
                    <span>Send Query to WhatsApp ({WHATSAPP_PHONE_RAW})</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

