"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Curtain in */}
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          style={{ background: "#0B0C0E" }}
          initial={{ y: "-100%" }}
          animate={{ y: ["-100%", "0%", "0%", "100%"] }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 0.5, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.span
            className="font-inter font-medium text-[#F1EAE0] text-[20px] tracking-[-0.02em]"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8, times: [0.2, 0.35, 0.55, 0.75] }}
          >
            925 | LEAGUE
          </motion.span>
        </motion.div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
