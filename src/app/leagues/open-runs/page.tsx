import OpenRunsOpener from "@/components/openruns/OpenRunsOpener";
import WhatOpenRun from "@/components/openruns/WhatOpenRun";
import HowItGoes from "@/components/openruns/HowItGoes";
import HouseRules from "@/components/openruns/HouseRules";
import NextSaturday from "@/components/openruns/NextSaturday";

export const metadata = {
  title: "Open Runs — 925 League",
  description: "Drop-in basketball every Saturday. No roster, no season, no commitment. Pay at the door and run.",
};

export default function OpenRunsPage() {
  return (
    <>
      <OpenRunsOpener />
      <WhatOpenRun />
      <HowItGoes />
      <HouseRules />
      <NextSaturday />
    </>
  );
}
