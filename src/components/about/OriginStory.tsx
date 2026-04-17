"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "We started 925 League in the summer of 2023 because the Tuesday night pickup at our local gym kept falling apart. Half the regulars stopped showing up. The rotation was broken. People stopped texting the group chat. One Saturday after an argument about whose team had just won, a few of us sat on the bleachers and decided we would rather book the gym ourselves and get real teams together than keep fighting about it.",
  "The first season of what became the MBL was four teams of seven players, six weeks, one gym in downtown Manhattan. We lost a little money on refs. We filmed the games on a phone. We printed jerseys ourselves. By the end of the final, we had a waiting list of sixteen more players who wanted in. We ran another season. Then another. The demand kept growing. People asked whether we could run the same thing in Los Angeles and Chicago. We did.",
  "Now we are three cities and 312 players. It is still the same idea. Book the gym, get real teams, film the games, keep the league running. The difference is that we do it on purpose now.",
];

export default function OriginStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } });

      if (imgRef.current) {
        tl.fromTo(imgRef.current, { clipPath: "inset(100% 0 0 0)", scale: 1.06 }, {
          clipPath: "inset(0% 0 0 0)", scale: 1, duration: 0.9, ease: "power3.out",
        }, 0);
      }

      const paras = storyRef.current?.querySelectorAll(".story-para");
      if (paras) {
        tl.fromTo(paras, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power3.out",
        }, 0.3);
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        {/* Left — numeral + portrait */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <span
            className="font-fraunces font-normal text-[#9BA0A6] text-[clamp(80px,10vw,160px)] leading-none select-none"
            style={{ WebkitTextStroke: "1.5px #9BA0A6", WebkitTextFillColor: "transparent" }}
          >
            02
          </span>
          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-sm"
            style={{ aspectRatio: "4/5", clipPath: "inset(100% 0 0 0)" }}
          >
            <Image
              src="https://images.pexels.com/photos/11831851/pexels-photo-11831851.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Basketball game in a gym"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-[rgba(11,12,14,0.35)]" />
            <div className="absolute bottom-6 left-6">
              <p className="font-jetbrains text-[#F1EAE0] text-[11px] tracking-[0.12em]">NEW YORK · SUMMER 2023</p>
            </div>
          </div>
        </div>

        {/* Right — story */}
        <div ref={storyRef} className="md:col-span-7 flex flex-col gap-6 md:pt-8">
          <p className="eyebrow">THE ORIGIN</p>
          {paragraphs.map((para, pi) => (
            <p
              key={pi}
              className="story-para font-fraunces font-normal text-[#F1EAE0] leading-[1.7]"
              style={{ fontSize: "clamp(17px,1.4vw,22px)", opacity: 0 }}
            >
              {pi === 0 ? (
                <>
                  <span
                    className="float-left font-fraunces font-bold text-[#E4572E] mr-2 leading-[0.85]"
                    style={{ fontSize: "clamp(72px,8vw,96px)", lineHeight: 0.9 }}
                  >
                    W
                  </span>
                  {para.slice(1)}
                </>
              ) : para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
