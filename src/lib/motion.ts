export const ease = {
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
  soft: [0.4, 0, 0.2, 1] as [number, number, number, number],
  settle: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export const dur = {
  xs: 0.12,
  s: 0.28,
  m: 0.56,
  l: 0.9,
  xl: 1.32,
};

export const stag = {
  tight: 0.04,
  base: 0.08,
  wide: 0.16,
  heavy: 0.24,
};

export const revealRise = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: dur.m, ease: ease.standard } },
};

export const revealWord = (delay = 0) => ({
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: dur.l, ease: ease.standard, delay },
  },
});

export const containerStagger = (stagger = stag.base, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: dur.m, ease: ease.soft, delay } },
});

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: dur.m, ease: ease.standard, delay },
  },
});
