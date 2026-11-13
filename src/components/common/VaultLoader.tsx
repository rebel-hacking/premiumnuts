"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function VaultLoader() {
  const [status, setStatus] = useState<"initial" | "opening" | "hidden">("initial");

  useEffect(() => {
    // Respect user's accessibility preferences
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setStatus("hidden");
      return;
    }

    // Lock scrolling while vault sequence is active
    document.body.style.overflow = "hidden";

    // Step 1: Start opening sequence after brief mount tick
    const startTimer = setTimeout(() => {
      setStatus("opening");
    }, 100);

    // Step 2: Unlock scrolling once doors have swung open (1.9s)
    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 1900);

    // Step 3: Complete hide & cleanup after 2.15s
    const endTimer = setTimeout(() => {
      setStatus("hidden");
    }, 2150);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(unlockTimer);
      clearTimeout(endTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (status === "hidden") {
    return null;
  }

  return (
    <div
      id="vault"
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none ${
        status === "opening" ? "opening" : ""
      }`}
      style={{
        perspective: "1200px",
        background: "#38101B",
      }}
    >
      {/* Left Vault Door */}
      <div
        className="door door-left absolute top-0 bottom-0 left-0 w-1/2 border-r border-[#F5ECDD]/15"
        style={{
          background: "linear-gradient(135deg, #702D3C 0%, #38101B 65%)",
          transformOrigin: "left center",
          willChange: "transform",
        }}
      />

      {/* Right Vault Door */}
      <div
        className="door door-right absolute top-0 bottom-0 right-0 w-1/2 border-l border-[#F5ECDD]/15"
        style={{
          background: "linear-gradient(225deg, #702D3C 0%, #38101B 65%)",
          transformOrigin: "right center",
          willChange: "transform",
        }}
      />

      {/* Center Golden Wax Seal */}
      <div
        id="seal"
        className="relative z-10 w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-[#E8C77A] shadow-[0_0_40px_rgba(0,0,0,0.6)]"
      >
        <Image
          src="/images/vault-seal.jpg"
          alt="The Nut Reserve Vault Seal"
          fill
          priority
          sizes="150px"
          className="object-cover scale-[1.55] translate-y-[4%]"
        />

        {/* Dynamic Fracture / Crack SVG */}
        <svg
          id="seal-crack-svg"
          viewBox="0 0 150 150"
          fill="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            id="seal-crack"
            d="M20 75 L58 68 L52 90 L80 56 L72 94 L114 45 L100 84 L134 75"
            stroke="#38101B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

