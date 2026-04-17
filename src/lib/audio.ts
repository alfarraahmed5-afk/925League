"use client";

let howlInstance: typeof import("howler").Howl | null = null;
let ambientHowl: InstanceType<typeof import("howler").Howl> | null = null;

export async function getHowl() {
  if (howlInstance) return howlInstance;
  const { Howl } = await import("howler");
  howlInstance = Howl;
  return Howl;
}

export async function playAmbient() {
  const Howl = await getHowl();
  if (!ambientHowl) {
    ambientHowl = new Howl({
      src: ["/audio/ambient-bed.mp3"],
      loop: true,
      volume: 0,
      html5: true,
    });
  }
  if (!ambientHowl.playing()) {
    ambientHowl.play();
    ambientHowl.fade(0, 0.25, 1400);
  }
}

export async function stopAmbient() {
  if (ambientHowl && ambientHowl.playing()) {
    ambientHowl.fade(ambientHowl.volume(), 0, 800);
    setTimeout(() => ambientHowl?.pause(), 800);
  }
}

export async function playSound(src: string, volume = 0.15) {
  try {
    const Howl = await getHowl();
    const h = new Howl({ src: [src], volume });
    h.play();
  } catch {}
}
