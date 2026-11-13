"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_BASE_URL } from "@/lib/whatsapp";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemCount, openCartDrawer } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Hamper", href: "/our-hamper" },
    { label: "Corporate Gifting", href: "/corporate-gifting" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FAF6EF]/95 backdrop-blur-md shadow-xs py-3.5 border-b border-[#F2E8D8]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Left: Brand Wordmark Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-left group">
          <div className="w-8 h-8 rounded-full bg-[#702D3C] flex items-center justify-center text-[#FAF6EF] font-serif text-sm font-semibold tracking-tighter shadow-xs group-hover:bg-[#4A1523] transition-colors border border-[#B89A65]/40">
            PN
          </div>
          <div className="flex flex-col">
            <span
              className="font-serif text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase text-[#702D3C] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              PREMIUM NUTS
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#777065] font-medium mt-0.5">
              Luxury Gifting House
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs lg:text-[13px] tracking-[0.14em] uppercase font-medium transition-colors relative group py-1 ${
                  isActive ? "text-[#702D3C] font-semibold" : "text-[#29251F]/80 hover:text-[#702D3C]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#702D3C] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick WhatsApp Link */}
          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B89A65]/40 hover:border-[#702D3C] text-[#702D3C] text-xs font-medium bg-white/70 transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#702D3C]" />
            <span>WhatsApp Us</span>
          </a>

          {/* Cart Icon with Live Indicator */}
          <button
            type="button"
            onClick={openCartDrawer}
            aria-label="Open Cart"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#29251F] hover:text-[#702D3C] hover:bg-black/5 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#702D3C] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <Link
            href="/our-hamper"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs"
          >
            <span>Explore Hamper</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#29251F] hover:bg-black/5"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EF] border-b border-[#F2E8D8] px-6 py-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-sm font-serif tracking-[0.15em] uppercase font-semibold text-[#702D3C] py-2 border-b border-[#F2E8D8]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href="/our-hamper"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#702D3C] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold text-center"
              >
                Curate Hamper (₹499+)
              </Link>
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-[#B89A65] text-[#702D3C] text-xs uppercase tracking-widest font-semibold text-center flex items-center justify-center gap-2 bg-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 7829267846</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Scroll Progress Hairline */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#702D3C] via-[#B89A65] to-[#4A1523] pointer-events-none"
      />
    </header>
  );
}
