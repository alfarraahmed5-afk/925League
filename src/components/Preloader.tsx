"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"line" | "wordmark" | "hold" | "exit">("line");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTimeout(() => { setVisible(false); onComplete(); }, 300);
      return;
    }

    const t1 = setTimeout(() => setPhase("wordmark"), 120);
    const t2 = setTimeout(() => setPhase("hold"), 720);
    const t3 = setTimeout(() => setPhase("exit"), 900);
    const t4 = setTimeout(() => { setVisible(false); onComplete(); }, 1320);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const glyphs = ["9", "2", "5", " ", "|", " ", "L", "E", "A", "G", "U", "E"];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "#0B0C0E" }}
        >
          {/* Top half */}
          <motion.div
            className="absolute inset-0 origin-top"
            style={{ background: "#0B0C0E", clipPath: "inset(0 0 50% 0)" }}
            animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1], delay: 0 }}
          />
          {/* Bottom half */}
          <motion.div
            className="absolute inset-0 origin-bottom"
            style={{ background: "#0B0C0E", clipPath: "inset(50% 0 0 0)" }}
            animate={phase === "exit" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1], delay: 0 }}
          />

          {/* Center line */}
          <motion.div
            className="absolute"
            style={{ top: "50%", left: 0, right: 0, height: "1px", background: "rgba(241,234,224,0.4)" }}
            initial={{ scaleX: 0 }}
            animate={phase !== "exit" && phase !== "line" ? { scaleX: 1 } : phase === "line" ? { scaleX: 0 } : { scaleX: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Wordmark */}
          <div className="relative z-10 flex gap-0 overflow-hidden">
            {glyphs.map((g, i) => (
              <motion.span
                key={i}
                className="font-inter font-medium text-[#F1EAE0]"
                style={{ fontSize: 20, letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={
                  (phase === "wordmark" || phase === "hold")
                    ? { opacity: 1, filter: "blur(0px)" }
                    : phase === "exit"
                    ? { opacity: 0, filter: "blur(10px)" }
                    : { opacity: 0, filter: "blur(10px)" }
                }
                transition={{ duration: 0.3, delay: phase === "wordmark" ? i * 0.04 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                {g}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
