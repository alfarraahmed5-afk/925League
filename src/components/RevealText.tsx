"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  delay?: number;
  triggerStart?: string;
  byWord?: boolean;
}

export default function RevealText({
  text,
  tag: Tag = "h2",
  className = "",
  stagger = 0.04,
  delay = 0,
  triggerStart = "top 80%",
  byWord = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: byWord ? 20 : 28, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          once: true,
        },
      }
    );
  }, [stagger, delay, triggerStart, byWord]);

  const units = byWord ? text.split(" ") : text.split("");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={`overflow-hidden ${className}`}>
      {units.map((unit, i) => (
        <span key={i} className="reveal-item inline-block" style={{ opacity: 0 }}>
          {unit}
          {byWord && i < units.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
