"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "925_audio_enabled";

export default function AudioToggle({ compact = false }: { compact?: boolean }) {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") setEnabled(true);
  }, []);

  const toggle = async () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, String(next));
    const { playAmbient, stopAmbient } = await import("@/lib/audio");
    if (next) playAmbient();
    else stopAmbient();
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 select-none"
      aria-label={enabled ? "Disable ambient audio" : "Enable ambient audio"}
    >
      {/* VU bars or flat line */}
      <div className="flex items-center gap-[3px] h-4 w-5">
        {enabled ? (
          [0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-[#F1EAE0]"
              animate={{ height: ["6px", "14px", "4px", "10px", "6px"] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))
        ) : (
          <div className="w-full h-[1px] bg-[#F1EAE0]" />
        )}
      </div>

      {!compact && (
        <span className="font-inter font-semibold text-[11px] tracking-[0.12em] uppercase text-[#F1EAE0]">
          AMBIENT AUDIO: {enabled ? "ON" : "OFF"}
        </span>
      )}
    </button>
  );
}
