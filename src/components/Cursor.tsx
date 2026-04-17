"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorLabel = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      ring.style.width = cursorLabel ? "80px" : "48px";
      ring.style.height = cursorLabel ? "80px" : "48px";
      ring.style.opacity = "0.3";
      dot.style.width = "4px";
      dot.style.height = "4px";

      if (cursorLabel && label) {
        label.textContent = cursorLabel;
        label.style.opacity = "1";
      }
    };

    const onLeaveInteractive = () => {
      ring.style.width = "12px";
      ring.style.height = "12px";
      ring.style.opacity = "1";
      dot.style.width = "8px";
      dot.style.height = "8px";
      if (label) { label.textContent = ""; label.style.opacity = "0"; }
    };

    const onEnterText = () => {
      ring.style.opacity = "0";
    };
    const onLeaveText = () => {
      ring.style.opacity = "1";
    };

    document.querySelectorAll("a, button, [role=button], label, select, [tabindex]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive as EventListener);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    document.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", onEnterText);
      el.addEventListener("mouseleave", onLeaveText);
    });

    let raf: number;
    function animate() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) ring.style.transform = `translate3d(${ringX - 24}px, ${ringY - 24}px, 0)`;
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-[#F1EAE0]"
        style={{ width: 12, height: 12, transition: "width 220ms, height 220ms, opacity 220ms" }}
        aria-hidden
      >
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center font-inter text-[11px] font-medium text-[#F1EAE0] tracking-[0.1em] uppercase opacity-0"
          style={{ transition: "opacity 220ms" }}
        />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#F1EAE0]"
        style={{ width: 8, height: 8, transition: "width 120ms, height 120ms" }}
        aria-hidden
      />
    </>
  );
}
