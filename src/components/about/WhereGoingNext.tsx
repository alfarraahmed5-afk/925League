"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhereGoingNext() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const words = ref.current!.querySelectorAll(".word");
      gsap.fromTo(words, { opacity: 0, filter: "blur(10px)" }, {
        opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const sentence = "This is a basketball community that schedules itself around a full-time job. We are going to keep making it.";

  return (
    <section ref={ref} className="bg-[#F1EAE0] py-24 px-8 md:px-16 flex items-center justify-center min-h-[480px]">
      <p className="font-fraunces font-medium italic text-[#0B0C0E] text-center text-[clamp(22px,3.5vw,52px)] leading-[1.3] max-w-[760px]">
        {sentence.split(" ").map((word, i, arr) => (
          <Fragment key={i}>
            <span className="word inline-block" style={{ opacity: 0 }}>{word}</span>
            {i < arr.length - 1 && " "}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
