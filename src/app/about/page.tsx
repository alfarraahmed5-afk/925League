import AboutOpener from "@/components/about/AboutOpener";
import OriginStory from "@/components/about/OriginStory";
import WhatWeBelieve from "@/components/about/WhatWeBelieve";
import TheTeam from "@/components/about/TheTeam";
import WhereGoingNext from "@/components/about/WhereGoingNext";
import ComePlay from "@/components/about/ComePlay";

export const metadata = {
  title: "About — 925 League",
  description: "We started because we wanted somewhere to play. Everything after was figuring that out.",
};

export default function AboutPage() {
  return (
    <>
      <AboutOpener />
      <OriginStory />
      <WhatWeBelieve />
      <TheTeam />
      <WhereGoingNext />
      <ComePlay />
    </>
  );
}
