"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CartItem } from "@/types";
import { X, Check, ShieldCheck, Lock, CreditCard, Sparkles, Truck, Gift, ArrowRight } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  giftWrap: boolean;
  giftMessage: string;
  onOrderComplete: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  giftWrap,
  giftMessage,
  onOrderComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");

  // Form State
  const [formData, setFormData] = useState({
    recipientName: "Eleanor Davenport",
    address: "742 Evergreen Terrace, Suite 1400",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    country: "United States",
    email: "eleanor.davenport@residence.com",
    deliveryDate: "Immediate Priority Dispatch",
    cardNumber: "•••• •••• •••• 4242",
    cardExp: "12/28",
    cardCvc: "888",
  });

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, it) => acc + it.selectedOption.price * it.quantity,
    0
  );
  const shipping = subtotal >= 100 ? 0 : 12;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");

    // Luxury celebratory gold and forest green confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#183C2D", "#B69A68", "#641F35", "#E8DDC8"],
      });
    } catch {
      // ignore
    }
  };

  const handleDone = () => {
    onOrderComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F8F5ED] text-[#29251F] rounded-2xl shadow-2xl border border-[#E8DDC8] p-6 sm:p-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#E8DDC8]/60 hover:bg-[#E8DDC8] flex items-center justify-center text-[#29251F] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "confirmed" ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-[#183C2D]/10 text-[#183C2D] flex items-center justify-center mx-auto mb-5 border border-[#183C2D]/20">
              <Check className="w-10 h-10" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C9A80] block mb-1">
              RESERVATION ACQUIRED
            </span>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#183C2D] font-normal tracking-tight mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Order Placed with Distinction
            </h2>

            <p className="text-sm text-[#777065] max-w-md mx-auto mb-6 leading-relaxed">
              Your bespoke harvest order <strong>#PN-2026-9482</strong> is now being hand-assembled in
              our climate-controlled atelier. A tracking itinerary has been sent to{" "}
              <span className="text-[#183C2D] font-medium">{formData.email}</span>.
            </p>

            {/* Order Summary Mini Card */}
            <div className="p-5 rounded-xl bg-white border border-[#E8DDC8] max-w-md mx-auto text-left mb-8 space-y-2 text-xs">
              <div className="flex justify-between text-[#777065]">
                <span>Recipient:</span>
                <span className="font-medium text-[#29251F]">{formData.recipientName}</span>
              </div>
              <div className="flex justify-between text-[#777065]">
                <span>Destination:</span>
                <span className="font-medium text-[#29251F] truncate max-w-[200px]">
                  {formData.city}, {formData.state}
                </span>
              </div>
              <div className="flex justify-between text-[#777065]">
                <span>Presentation:</span>
                <span className="font-medium text-[#183C2D]">
                  {giftWrap ? "Luxury Ribbon & Wax Seal Sleeve" : "Standard Atelier Packaging"}
                </span>
              </div>
              {giftMessage && (
                <div className="pt-2 border-t border-[#E8DDC8]/60 text-[11px] italic text-[#641F35]">
                  &ldquo;{giftMessage}&rdquo;
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#E8DDC8] font-semibold text-sm text-[#183C2D]">
                <span>Total Paid:</span>
                <span className="font-serif text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="px-8 py-3.5 rounded-full bg-[#183C2D] hover:bg-[#102D23] text-[#F8F5ED] text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
            >
              Return to Boutique
            </button>
          </div>
        ) : step === "details" ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#183C2D] text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C9A80]">
                DELIVERY & RECIPIENT
              </span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl text-[#183C2D] font-normal mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Where Shall We Dispatch Your Harvest?
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep("payment");
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) =>
                      setFormData({ ...formData, recipientName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Notification Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                  Street Address *
                </label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    State / Region *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Postal Code *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                </div>
              </div>

              {/* Delivery method preview */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DDC8] flex items-center justify-between text-xs mt-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#183C2D]" />
                  <div>
                    <span className="font-medium text-[#183C2D] block">
                      Climate-Preserved Express Delivery
                    </span>
                    <span className="text-[11px] text-[#777065]">
                      Hermetic vacuum-sealed dispatched in insulated rigid carton
                    </span>
                  </div>
                </div>
                <span className="font-semibold text-[#183C2D]">
                  {shipping === 0 ? "Complimentary" : "$12.00"}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs uppercase tracking-wider text-[#777065] hover:text-[#183C2D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#183C2D] hover:bg-[#102D23] text-[#F8F5ED] text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#183C2D] text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C9A80]">
                PAYMENT ARCHITECTURE
              </span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl text-[#183C2D] font-normal mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Complete Reservation
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Order total recap */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DDC8] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#777065]">
                  <span>Items ({items.length}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#777065]">
                  <span>White-Glove Courier:</span>
                  <span>{shipping === 0 ? "Complimentary" : "$12.00"}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8DDC8] text-sm font-semibold text-[#183C2D]">
                  <span>Total Due:</span>
                  <span className="font-serif text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Card Inputs */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                  <CreditCard className="w-4 h-4 text-[#8C9A80] absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    value={formData.cardExp}
                    onChange={(e) =>
                      setFormData({ ...formData, cardExp: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Security Code
                  </label>
                  <input
                    type="password"
                    value={formData.cardCvc}
                    onChange={(e) =>
                      setFormData({ ...formData, cardCvc: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E8DDC8] text-xs focus:outline-none focus:border-[#183C2D]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-2 text-[11px] text-[#777065]">
                <Lock className="w-3.5 h-3.5 text-[#183C2D]" />
                <span>256-Bit Encrypted High-Security Checkout Pathway</span>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-xs uppercase tracking-wider text-[#777065] hover:text-[#183C2D]"
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#183C2D] hover:bg-[#102D23] text-[#F8F5ED] text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize ${total.toFixed(2)}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

