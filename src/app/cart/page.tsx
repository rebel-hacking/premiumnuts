"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { buildOrderWhatsAppUrl, WHATSAPP_PHONE_RAW } from "@/lib/whatsapp";
import { CustomerDetails } from "@/types";
import { Trash2, Plus, Minus, Gift, MessageCircle, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    originalTotal,
    totalSavings,
    totalItemCount,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    deliveryInstructions: "",
    giftMessage: "",
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.address || !customer.city || !customer.pincode) {
      alert("Please enter all required delivery details.");
      return;
    }

    const url = buildOrderWhatsAppUrl(cart, customer);
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#29251F] selection:bg-[#702D3C] selection:text-[#FAF6EF]">
      <Navbar />

      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#702D3C] block mb-2">
              YOUR GIFTING ORDER
            </span>
            <h1
              className="font-serif text-3xl sm:text-5xl text-[#702D3C] font-normal tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Shopping Bag & WhatsApp Checkout
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-[#F2E8D8] p-10 max-w-xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#F2E8D8] text-[#702D3C] flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8" />
              </div>
              <h2
                className="font-serif text-3xl text-[#702D3C] font-normal mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Your Gifting Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#777065] max-w-sm mx-auto mb-8 font-light">
                Discover our signature magnetic closure gift box and choose any six gourmet dry fruits and nuts.
              </p>
              <Link
                href="/our-hamper"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#702D3C] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold shadow-md"
              >
                <span>Curate A Hamper Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Line Items */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F2E8D8] text-xs font-semibold text-[#702D3C]">
                  <span>SELECTED HAMPERS ({totalItemCount})</span>
                  <span>PRICE</span>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-[#F2E8D8] shadow-xs flex flex-col sm:flex-row gap-5 items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className="font-serif text-2xl text-[#702D3C] font-normal"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {item.size.name} Hamper
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF6EF] border border-[#F2E8D8] text-[#702D3C] font-semibold">
                          {item.size.approxWeight}
                        </span>
                      </div>
                      <p className="text-xs text-[#702D3C] font-medium mb-3">
                        Royal Burgundy Magnetic Closure Keepsake Box
                      </p>

                      {/* 6 Selected Varieties */}
                      <div className="p-3 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] mb-4">
                        <span className="text-[11px] font-semibold text-[#702D3C] uppercase tracking-wider block mb-1.5">
                          Selected 6 Varieties:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs text-[#777065]">
                          {item.selectedIngredients.map((ing, i) => (
                            <span key={ing.id} className="truncate">
                              {i + 1}. {ing.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#F2E8D8] rounded-full bg-[#FAF6EF]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-[#777065] hover:text-[#702D3C]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#702D3C]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-[#777065] hover:text-[#702D3C]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-[#777065] hover:text-[#702D3C] flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="sm:text-right shrink-0">
                      <span className="text-xs text-[#777065] line-through block">
                        ₹{item.unitOriginalPrice * item.quantity}
                      </span>
                      <span className="font-serif text-2xl font-semibold text-[#702D3C]">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      <span className="text-[10px] text-[#702D3C] font-semibold block uppercase">
                        Save ₹{(item.unitOriginalPrice - item.unitPrice) * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Customer Details & WhatsApp Checkout */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#B89A65]/40 shadow-xl space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#702D3C] block mb-1">
                    ORDER FINALIZATION
                  </span>
                  <h2
                    className="font-serif text-2xl sm:text-3xl text-[#702D3C] font-normal"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Recipient & Delivery Details
                  </h2>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Recipient or buyer full name"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      Complete Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Flat/House no., Floor, Street address"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Delhi, Bangalore"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                        PIN Code *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="6 digits"
                        value={customer.pincode}
                        onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      Handwritten Gift Card Message (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Special words to be written on the wax-sealed card..."
                      value={customer.giftMessage}
                      onChange={(e) => setCustomer({ ...customer, giftMessage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Preferred dispatch date or gate instructions..."
                      value={customer.deliveryInstructions}
                      onChange={(e) =>
                        setCustomer({ ...customer, deliveryInstructions: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>

                  {/* Summary Breakdown */}
                  <div className="pt-4 border-t border-[#F2E8D8] space-y-2 text-xs">
                    <div className="flex justify-between text-[#777065]">
                      <span>Original List Total:</span>
                      <span className="line-through">₹{originalTotal}</span>
                    </div>
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-[#702D3C] font-semibold">
                        <span>Celebration Savings:</span>
                        <span>- ₹{totalSavings}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#777065]">
                      <span>White-Glove Shipping:</span>
                      <span className="text-[#702D3C] font-semibold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-[#702D3C] pt-2 border-t border-[#F2E8D8] text-base font-semibold">
                      <span>Total Payable:</span>
                      <span className="font-serif text-2xl font-bold">₹{subtotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#B89A65]" />
                    <span>Place Order via WhatsApp ({WHATSAPP_PHONE_RAW})</span>
                  </button>

                  <p className="text-[11px] text-[#777065] text-center leading-normal">
                    Your order details will be shared with us through WhatsApp. We will contact you
                    to confirm availability and payment.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

