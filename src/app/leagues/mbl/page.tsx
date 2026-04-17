import MBLOpener from "@/components/mbl/MBLOpener";
import WhatMBLIs from "@/components/mbl/WhatMBLIs";
import SeasonJourney from "@/components/mbl/SeasonJourney";
import ScheduleBlock from "@/components/mbl/ScheduleBlock";
import FormatRules from "@/components/mbl/FormatRules";
import FeeSection from "@/components/mbl/FeeSection";
import TeamsGrid from "@/components/mbl/TeamsGrid";
import MBLSignup from "@/components/mbl/MBLSignup";

export const metadata = {
  title: "The MBL — 925 League",
  description: "Eight teams. Twelve weeks. One trophy. The 9-to-5 Basketball League for working professionals.",
};

export default function MBLPage() {
  return (
    <>
      <MBLOpener />
      <WhatMBLIs />
      <SeasonJourney />
      <ScheduleBlock />
      <FormatRules />
      <FeeSection />
      <TeamsGrid />
      <MBLSignup />
    </>
  );
}
