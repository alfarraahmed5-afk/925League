import SponsorsOpener from "@/components/sponsors/SponsorsOpener";
import WhoPlays from "@/components/sponsors/WhoPlays";
import Packages from "@/components/sponsors/Packages";
import Partners from "@/components/sponsors/Partners";
import SponsorsContact from "@/components/sponsors/SponsorsContact";

export const metadata = {
  title: "Partners — 925 League",
  description: "Partner with a league that reaches 300 working professionals weekly in New York, Los Angeles, and Chicago.",
};

export default function SponsorsPage() {
  return (
    <>
      <SponsorsOpener />
      <WhoPlays />
      <Packages />
      <Partners />
      <SponsorsContact />
    </>
  );
}
