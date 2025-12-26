import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { fetchDonators, fetchSponsors } from "../utils/fetchUtils";
import type { Donator } from "../constants/types/Donator";
import type { Sponsor } from "../constants/types/Sponsor";
import CircuitBackground from "../components/animations/CircuitBackground";
import MissionSection from "../components/sponsorship/MissionSection";
import SponsorshipTiersSection from "../components/sponsorship/SponsorshipTiersSection";
import InfoSheetSection from "../components/sponsorship/InfoSheetSection";
import DonationsSection from "../components/sponsorship/DonationsSection";

export default function Sponsorship() {
  const [donators, setDonators] = useState<Donator[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [donatorsData, sponsorsData] = await Promise.all([
        fetchDonators(),
        fetchSponsors()
      ]);
      setDonators(donatorsData);
      setSponsors(sponsorsData);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white pt-32 pb-16 relative overflow-hidden">
      <CircuitBackground />

      <MissionSection />

      <Container size="lg" className="relative z-10">
        <SponsorshipTiersSection />
        <InfoSheetSection />
        <DonationsSection donators={donators} sponsors={sponsors} />

        {/* Contact CTA */}
        <div className="mb-16 text-center">
           <p className="text-white/60 text-sm mb-4">
             Want to see your name here?
           </p>
           <Button to="/connect" variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
             Contact Us
           </Button>
        </div>
      </Container>
    </div>
  );
}
