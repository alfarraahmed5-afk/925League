"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AudioToggle from "./AudioToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/leagues/mbl", label: "Leagues" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 200 && y > lastScroll.current);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center px-8"
        style={{
          background: scrolled ? "rgba(11,12,14,0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
          borderBottom: "1px solid rgba(241,234,224,0.08)",
        }}
        animate={{ y: hidden && !menuOpen ? -72 : 0 }}
        transition={{ duration: hidden ? 0.26 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-0 shrink-0">
          <span className="font-inter font-medium text-[#F1EAE0] text-[20px] tracking-[-0.02em]">
            925 | LEAGUE
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10 ml-auto mr-10">
          {links.map(({ href, label }) => (
            <NavLink key={href} href={href} active={pathname === href}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/leagues/mbl#signup"
          className="hidden md:flex pill pill-primary text-[12px] shrink-0"
          style={{ height: 36 }}
        >
          JOIN THE SPRING SEASON
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col pt-[72px] px-8 pb-12"
            style={{ background: "#0B0C0E" }}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col gap-6 mt-10">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    className="font-fraunces text-[36px] text-[#F1EAE0] leading-none"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/leagues/mbl#signup"
                className="pill pill-primary w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                JOIN THE SPRING SEASON
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-inter text-[12px] text-[#9BA0A6] tracking-[0.12em] uppercase">
                Ambient Audio
              </span>
              <AudioToggle compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`nav-underline font-inter font-medium text-[15px] tracking-[0.02em] uppercase text-[#F1EAE0] ${active ? "active" : ""}`}
    >
      {children}
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        stroke="#F1EAE0" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { y1: 12, y2: 12, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }}
        style={{ originX: 12, originY: 6 }}
        transition={{ duration: 0.3 }}
      />
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        stroke="#F1EAE0" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        stroke="#F1EAE0" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { y1: 12, y2: 12, rotate: -45 } : { y1: 18, y2: 18, rotate: 0 }}
        style={{ originX: 12, originY: 18 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}
