"use client";

import { useEffect, useRef } from "react";

interface LuxuryAmbienceProps {
  isPlaying: boolean;
}

export default function LuxuryAmbience({ isPlaying }: LuxuryAmbienceProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        // Fade in softly to an ambient whisper (0.015)
        gain.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 3);
        gain.connect(ctx.destination);
        gainNodeRef.current = gain;

        // Warm fundamental tone (C3 warm wood resonance)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(130.81, ctx.currentTime);
        osc1.connect(gain);
        osc1.start();
        osc1Ref.current = osc1;

        // Soft fifth harmonic shimmer (G3)
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(196.0, ctx.currentTime);
        osc2.connect(gain);
        osc2.start();
        osc2Ref.current = osc2;
      } catch {
        // Fallback silently if audio context is blocked
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          const ctx = audioCtxRef.current;
          gainNodeRef.current.gain.exponentialRampToValueAtTime(
            0.0001,
            ctx.currentTime + 1
          );
          setTimeout(() => {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            ctx.close();
            audioCtxRef.current = null;
          }, 1100);
        } catch {
          // ignore
        }
      }
    }

    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, [isPlaying]);

  return null;
}

