import HomeOpener from "@/components/home/Opener";
import NumberedPremise from "@/components/home/NumberedPremise";
import FeaturedLeague from "@/components/home/FeaturedLeague";
import OpenRunsCallout from "@/components/home/OpenRunsCallout";
import ByTheNumbers from "@/components/home/ByTheNumbers";
import Voices from "@/components/home/Voices";
import CitiesStrip from "@/components/home/CitiesStrip";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <HomeOpener />
      <NumberedPremise />
      <FeaturedLeague />
      <OpenRunsCallout />
      <ByTheNumbers />
      <Voices />
      <CitiesStrip />
      <ClosingCTA />
    </>
  );
}
