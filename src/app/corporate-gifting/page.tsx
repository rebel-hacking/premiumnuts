"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CorporateEnquiry } from "@/types";
import { buildCorporateWhatsAppUrl, WHATSAPP_PHONE_RAW } from "@/lib/whatsapp";
import { Building2, Sparkles, Check, MessageCircle, ArrowRight, ShieldCheck, Gift } from "lucide-react";

export default function CorporateGiftingPage() {
  const [enquiry, setEnquiry] = useState<CorporateEnquiry>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    estimatedHampers: "26–50",
    preferredSize: "Medium (₹699)",
    occasion: "Festive Client Appreciation",
    deliveryDate: "",
    customBranding: true,
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiry.fullName || !enquiry.companyName || !enquiry.phone) {
      alert("Please enter your name, company, and phone number.");
      return;
    }

    const url = buildCorporateWhatsAppUrl(enquiry);
    setSubmitted(true);
    window.open(url, "_blank");
  };

  const corporatePillars = [
    {
      title: "Employee Appreciation",
      desc: "Reward team dedication, annual milestones, and festival greetings with a wellness-focused luxury keepsake.",
      image: "/images/hamper/signature-hamper-main.jpg",
    },
    {
      title: "Client & Executive Gifting",
      desc: "Strengthen high-value relationships with bespoke hampers hot-stamped with your organization's foil insignia.",
      image: "/images/corporate/corporate-hampers-grid.jpg",
    },
    {
      title: "Conferences & Annual Summits",
      desc: "Delight VIP guests, keynote speakers, and summit delegates with memorable gourmet boxes.",
      image: "/images/lifestyle/hamper-lifestyle.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#702D3C] selection:text-[#FAF6EF]">
      <Navbar />
      <CartDrawer />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-[#4A1523] text-[#FAF6EF] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(184,154,101,0.2),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B89A65]/15 border border-[#B89A65]/30 text-[#B89A65] text-xs uppercase tracking-[0.25em] font-semibold mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>CORPORATE & ENTERPRISE CONCIERGE</span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-6xl text-[#FAF6EF] font-normal tracking-tight leading-[1.08] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Thoughtful Gifting. Stronger Connections.
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#F2E8D8]/85 font-light leading-relaxed mb-8 max-w-2xl">
              Make every business relationship memorable with thoughtfully presented premium nuts and
              dry fruits gift hampers. Designed for enterprise volume with white-glove bespoke branding.
            </p>

            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#B89A65] hover:bg-[#a58957] text-[#4A1523] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-xl"
            >
              <span>REQUEST A BULK QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Pillars Showcase */}
      <section className="py-20 sm:py-28 bg-[#FAF6EF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#702D3C] block mb-2">
              BESPOKE APPRECIATION
            </span>
            <h2
              className="font-serif text-3xl sm:text-4xl text-[#702D3C] font-normal"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Tailored for Every Enterprise Milestone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporatePillars.map((pillar, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white border border-[#F2E8D8] shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F2E8D8]">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-serif text-2xl text-[#702D3C] font-normal mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#777065] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Quote Form Section */}
      <section id="quote-form" className="py-20 sm:py-28 bg-[#F2E8D8] border-t border-[#B89A65]/30">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#B89A65]/40 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#702D3C] block mb-2">
                BULK ENQUIRY FORM
              </span>
              <h2
                className="font-serif text-3xl sm:text-4xl text-[#702D3C] font-normal"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Request Custom Bulk Pricing
              </h2>
              <p className="text-xs text-[#777065] mt-1">
                Contact us for customised bulk pricing. Complete the brief below to chat directly with our Corporate Concierge on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your full name"
                    value={enquiry.fullName}
                    onChange={(e) => setEnquiry({ ...enquiry, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Company / Organization *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Reliance, Tata, Startup Corp"
                    value={enquiry.companyName}
                    onChange={(e) => setEnquiry({ ...enquiry, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="corporate@company.com"
                    value={enquiry.email}
                    onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Quantity Required
                  </label>
                  <select
                    value={enquiry.estimatedHampers}
                    onChange={(e) => setEnquiry({ ...enquiry, estimatedHampers: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  >
                    <option value="10–25">10–25 Hampers</option>
                    <option value="26–50">26–50 Hampers</option>
                    <option value="51–100">51–100 Hampers</option>
                    <option value="101–250">101–250 Hampers</option>
                    <option value="251–500">251–500 Hampers</option>
                    <option value="500+">500+ Hampers (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Preferred Hamper Size
                  </label>
                  <select
                    value={enquiry.preferredSize}
                    onChange={(e) => setEnquiry({ ...enquiry, preferredSize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  >
                    <option value="Small (₹499)">Small (₹499)</option>
                    <option value="Medium (₹699)">Medium (₹699 - Most Popular)</option>
                    <option value="Large (₹999)">Large (₹999 - Grand)</option>
                    <option value="Mixed Assortment">Mixed Assortment of Sizes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Target Delivery Date
                  </label>
                  <input
                    type="date"
                    value={enquiry.deliveryDate}
                    onChange={(e) => setEnquiry({ ...enquiry, deliveryDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                  Occasion / Gifting Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diwali Festivities, Annual Summit, Client Welcome"
                  value={enquiry.occasion}
                  onChange={(e) => setEnquiry({ ...enquiry, occasion: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8]">
                <label className="flex items-center gap-2.5 text-xs text-[#702D3C] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enquiry.customBranding}
                    onChange={(e) => setEnquiry({ ...enquiry, customBranding: e.target.checked })}
                    className="rounded border-[#B89A65] text-[#702D3C] focus:ring-0"
                  />
                  <span>Require company logo hot-stamping on royal burgundy sleeves & cards</span>
                </label>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#777065] mb-1">
                  Additional Notes or Specific Delivery Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about multi-city shipments, custom card messaging, or specific ingredient preferences..."
                  value={enquiry.notes}
                  onChange={(e) => setEnquiry({ ...enquiry, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#B89A65]" />
                <span>Submit Bulk Enquiry to WhatsApp ({WHATSAPP_PHONE_RAW})</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

