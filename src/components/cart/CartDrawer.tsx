"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { buildOrderWhatsAppUrl } from "@/lib/whatsapp";
import { CustomerDetails } from "@/types";
import { X, Trash2, Plus, Minus, Gift, MessageCircle, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    originalTotal,
    totalSavings,
    totalItemCount,
  } = useCart();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    deliveryInstructions: "",
    giftMessage: "",
  });

  if (!isCartDrawerOpen) return null;

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.address || !customer.city || !customer.pincode) {
      alert("Please fill in the required delivery details.");
      return;
    }

    const url = buildOrderWhatsAppUrl(cart, customer);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-[#FAF6EF] text-[#29251F] shadow-2xl flex flex-col justify-between border-l border-[#F2E8D8]">
          {/* Header */}
          <div className="p-5 border-b border-[#F2E8D8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span
                className="font-serif text-2xl text-[#702D3C] font-normal"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Gifting Bag
              </span>
              <span className="text-xs text-[#777065] font-medium">
                ({totalItemCount} {totalItemCount === 1 ? "hamper" : "hampers"})
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              aria-label="Close cart"
              className="w-8 h-8 rounded-full bg-[#F2E8D8]/70 hover:bg-[#F2E8D8] flex items-center justify-center text-[#29251F] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F2E8D8]">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-14 h-14 rounded-full bg-[#F2E8D8] flex items-center justify-center mx-auto text-[#702D3C] mb-4">
                  <Gift className="w-6 h-6" />
                </div>
                <h4
                  className="font-serif text-2xl text-[#702D3C] mb-2 font-normal"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#777065] max-w-xs mx-auto mb-6">
                  Curate our signature magnetic closure gift box with your choice of six gourmet varieties.
                </p>
                <Link
                  href="/our-hamper"
                  onClick={closeCartDrawer}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#702D3C] text-[#FAF6EF] text-xs uppercase tracking-wider font-semibold"
                >
                  <span>Explore Our Hamper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : !showCheckoutForm ? (
              // Items View
              <div className="space-y-4 pt-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-[#F2E8D8] shadow-xs flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-lg text-[#702D3C] font-normal">
                            {item.size.name} Hamper
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2E8D8] text-[#702D3C] font-semibold">
                            {item.size.approxWeight}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#702D3C] font-medium block">
                          Magnetic Closure Luxury Box
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#777065] hover:text-[#702D3C] transition-colors p-1"
                        title="Remove hamper"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 6 Selected Ingredients List */}
                    <div className="p-2.5 rounded-xl bg-[#FAF6EF] border border-[#F2E8D8]/70 text-[11px]">
                      <span className="text-[#702D3C] font-semibold block mb-1">
                        Selected 6 Varieties:
                      </span>
                      <div className="grid grid-cols-2 gap-1 text-[#777065]">
                        {item.selectedIngredients.map((ing, i) => (
                          <span key={ing.id} className="truncate">
                            {i + 1}. {ing.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Quantity Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F2E8D8]">
                      <div className="flex items-center border border-[#F2E8D8] rounded-full bg-[#FAF6EF]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-[#777065] hover:text-[#702D3C]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#702D3C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-[#777065] hover:text-[#702D3C]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-[#777065] line-through mr-1.5">
                          ₹{item.unitOriginalPrice * item.quantity}
                        </span>
                        <span className="font-serif text-lg font-semibold text-[#702D3C]">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Customer Details Checkout Form
              <form id="whatsapp-order-form" onSubmit={handleWhatsAppCheckout} className="space-y-3 py-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#F2E8D8]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#702D3C]">
                    Delivery Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="text-[11px] text-[#702D3C] underline font-medium"
                  >
                    Back to Items
                  </button>
                </div>

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
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
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
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Complete Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Flat/House no., Building, Street address"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                      PIN Code *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 400001"
                      value={customer.pincode}
                      onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Personalized Gift Message (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Message to be hand-written on luxury gift card..."
                    value={customer.giftMessage}
                    onChange={(e) => setCustomer({ ...customer, giftMessage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777065] mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Specific delivery date or gate instructions..."
                    value={customer.deliveryInstructions}
                    onChange={(e) =>
                      setCustomer({ ...customer, deliveryInstructions: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#F2E8D8] text-xs focus:outline-none focus:border-[#702D3C]"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Footer & WhatsApp Checkout Pathway */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#F2E8D8] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#777065]">
                  <span>Subtotal ({totalItemCount} hampers):</span>
                  <span className="font-serif text-sm font-semibold text-[#29251F]">
                    ₹{subtotal}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#702D3C] font-medium">
                    <span>Celebration Discount:</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#777065]">
                  <span>Shipping:</span>
                  <span className="text-[#702D3C] font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#702D3C] pt-2 border-t border-[#F2E8D8] font-semibold text-sm">
                  <span>Total Payable:</span>
                  <span className="font-serif text-xl">₹{subtotal}</span>
                </div>
              </div>

              {!showCheckoutForm ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/cart"
                    onClick={closeCartDrawer}
                    className="py-3 px-4 rounded-full border border-[#702D3C] text-[#702D3C] text-xs font-semibold uppercase tracking-wider text-center transition-colors hover:bg-[#FAF6EF]"
                  >
                    View Bag
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(true)}
                    className="py-3 px-4 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs font-semibold uppercase tracking-wider text-center transition-all shadow-xs"
                  >
                    Proceed (WhatsApp)
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  form="whatsapp-order-form"
                  className="w-full py-3.5 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#B89A65]" />
                  <span>Send Order to WhatsApp (7829267846)</span>
                </button>
              )}

              {/* Mandatory Requirement Part 11.3 */}
              <p className="text-[10px] text-[#777065] text-center leading-normal">
                Your order details will be shared with us through WhatsApp. We will contact you to
                confirm availability and payment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
