"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface WalnutScrollytellingProps {
  onExploreHamper?: () => void;
}

const TOTAL_FRAMES = 196;

export default function WalnutScrollytelling({
  onExploreHamper,
}: WalnutScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  // RAF frame animation state
  const targetFrameRef = useRef(0);
  const currentRenderedFrameRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Path helper
  const getFrameUrl = useCallback((index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `/sequence/ezgif-frame-${frameNumber}.jpg`;
  }, []);

  // Preload frames progressively
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    let loadedCount = 0;

    // Load first frame immediately to render initial view
    const initialImg = new Image();
    initialImg.src = getFrameUrl(0);
    initialImg.onload = () => {
      imagesRef.current[0] = initialImg;
      loadedCount++;
      setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      drawFrame(0);
    };

    // Load remaining frames in batches
    const preloadAll = async () => {
      const priorityIndices: number[] = [];
      for (let i = 5; i < TOTAL_FRAMES; i += 10) {
        priorityIndices.push(i);
      }

      const loadBatch = (indices: number[]): Promise<void[]> => {
        return Promise.all(
          indices.map(
            (idx) =>
              new Promise<void>((resolve) => {
                if (imagesRef.current[idx]) {
                  resolve();
                  return;
                }
                const img = new Image();
                img.src = getFrameUrl(idx);
                img.onload = () => {
                  imagesRef.current[idx] = img;
                  loadedCount++;
                  setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                  resolve();
                };
                img.onerror = () => {
                  resolve();
                };
              })
          )
        );
      };

      await loadBatch(priorityIndices);

      const remainingIndices: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!imagesRef.current[i]) {
          remainingIndices.push(i);
        }
      }

      const chunkSize = 15;
      for (let i = 0; i < remainingIndices.length; i += chunkSize) {
        const chunk = remainingIndices.slice(i, i + chunkSize);
        await loadBatch(chunk);
      }

      setIsLoaded(true);
    };

    preloadAll();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [getFrameUrl]);

  // Responsive Canvas Drawing with high DPI and exact background match
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    if (!img) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]) {
          img = imagesRef.current[frameIdx - offset];
          break;
        }
        if (frameIdx + offset < TOTAL_FRAMES && imagesRef.current[frameIdx + offset]) {
          img = imagesRef.current[frameIdx + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Exact sequence background fill: #FEFEFE seamlessly matches camera backdrop
    ctx.fillStyle = "#FEFEFE";
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const isMobile = rect.width < 768;
    const isTablet = rect.width >= 768 && rect.width < 1024;

    const naturalW = 1920;
    const naturalH = 1080;
    const scaleFactor = isMobile ? 1.35 : isTablet ? 1.15 : 1.08;
    const scale = Math.min(rect.width / naturalW, rect.height / naturalH) * scaleFactor;

    const drawW = naturalW * scale;
    const drawH = naturalH * scale;
    const drawX = (rect.width - drawW) / 2;
    const drawY = (rect.height - drawH) / 2 + (isMobile ? -15 : 0);

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Smooth lerp frame loop
  useEffect(() => {
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        const next = current + diff * 0.35;
        currentRenderedFrameRef.current = next;
        const roundedFrame = Math.round(next);
        const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, roundedFrame));
        drawFrame(clampedFrame);
        setActiveFrameIndex(clampedFrame);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentRenderedFrameRef.current));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Scroll listener mapped to frame sequence
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollDistance = containerHeight - windowHeight;

      if (scrollDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));

      setScrollProgress(progress);
      const mappedFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
      targetFrameRef.current = mappedFrame;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Part 4.2: Carefully written premium gifting headlines across the 5 progress stages
  const getPhaseInfo = () => {
    if (scrollProgress < 0.20) {
      return {
        phase: 1,
        eyebrow: "PREMIUM NUTS & DRY FRUITS",
        headline: "The Art of Thoughtful Gifting.",
        supporting:
          "Thoughtfully curated premium nuts and dry fruits, beautifully presented in a luxury gift hamper for life's most meaningful moments.",
      };
    } else if (scrollProgress < 0.42) {
      return {
        phase: 2,
        eyebrow: "NATURAL CRAFTSMANSHIP",
        headline: "Nature's Finest, Beautifully Presented.",
        supporting:
          "Every remarkable detail is a reminder that true luxury begins with nature's purest harvests.",
      };
    } else if (scrollProgress < 0.68) {
      return {
        phase: 3,
        eyebrow: "SIX BESPOKE VARIETIES",
        headline: "A Gift Worth Remembering.",
        supporting:
          "Choose any six gourmet varieties from our thirteen world-class harvests, presented in our royal magnetic closure box.",
      };
    } else if (scrollProgress < 0.88) {
      return {
        phase: 4,
        eyebrow: "CELEBRATE WITH DISTINCTION",
        headline: "Make Every Occasion Extraordinary.",
        supporting:
          "From intimate personal milestones to grand corporate celebrations, give something truly exceptional.",
      };
    } else {
      return {
        phase: 5,
        eyebrow: "SIGNATURE PRESENTATION",
        headline: "A Little Box of Extraordinary Goodness.",
        supporting:
          "Hand-selected royal walnuts, jumbo cashews, imperial almonds, and mountain dry fruits sealed in satin gold compartments.",
      };
    }
  };

  const phaseInfo = getPhaseInfo();

  const handleCtaClick = () => {
    if (onExploreHamper) {
      onExploreHamper();
    } else {
      const el = document.getElementById("hamper");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#FEFEFE] text-[#29251F]"
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#FEFEFE]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Ambient Warm Blend at transition edge */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background:
              scrollProgress > 0.85
                ? `radial-gradient(circle at center, rgba(254,254,254,0.1) 0%, rgba(250,246,239,${Math.min(
                    1,
                    (scrollProgress - 0.85) * 6
                  )}) 100%)`
                : "transparent",
          }}
        />

        {/* Loading Pill */}
        {!isLoaded && loadingProgress < 100 && (
          <div className="absolute top-24 right-8 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#F2E8D8] text-xs font-medium text-[#777065] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#702D3C] animate-ping" />
            <span>Loading experience {loadingProgress}%</span>
          </div>
        )}

        {/* Editorial Story Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-full flex flex-col justify-between py-24 sm:py-28 pointer-events-none">
          {/* Top Brand Tag */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#702D3C]" />
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#702D3C]/85">
                {phaseInfo.eyebrow}
              </span>
            </div>

            {/* Subtle progress bar */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#F2E8D8] text-[11px] text-[#777065]">
              <span>GIFT HAMPER RITUAL</span>
              <span className="text-[#B89A65]">✦</span>
              <span className="font-mono text-[#702D3C] font-semibold">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>

          {/* Dynamic Headline Block */}
          <div className="w-full max-w-3xl mt-4 sm:mt-8 mb-auto md:my-auto text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseInfo.phase}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                <h1
                  className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-[#702D3C] leading-[1.1] mb-2 sm:mb-5 drop-shadow-xs"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {phaseInfo.headline}
                </h1>
                <p className="font-sans text-sm sm:text-base lg:text-xl text-[#29251F]/85 font-light leading-relaxed max-w-xl">
                  {phaseInfo.supporting}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Fixed Single CTA & Milestone Dots */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
            <Link
              href="/our-hamper"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#702D3C] hover:bg-[#4A1523] text-[#FAF6EF] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group border border-[#702D3C]"
            >
              <span>EXPLORE OUR HAMPER</span>
              <ArrowRight className="w-4 h-4 text-[#B89A65] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Subtle Phase Indicators */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => {
                const isActive = phaseInfo.phase === num;
                return (
                  <div
                    key={num}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-8 bg-[#702D3C]" : "w-2 bg-[#F2E8D8] hover:bg-[#B89A65]"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Smooth Fade into Brand Background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF6EF] via-[#FAF6EF]/40 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
