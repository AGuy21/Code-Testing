import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import SponsorCard from "../components/SponsorCard";
import Button from "../components/ui/Button";
import DonationItem from "../components/DonationItem";
import SponsorItem from "../components/SponsorItem";
import { sponsorshipTiers } from "../constants/data/sponsorshipData";
import { fetchDonators } from "../constants/data/donatorItems";
import { fetchSponsors } from "../constants/data/sponsorItems";
import type { Donator } from "../constants/types/Donator";
import type { Sponsor } from "../constants/types/Sponsor";
import sponsorshipPdf from "../assets/Electrathon Sponsorship info sheet.pdf";
import qrCode from "../assets/images/QR code electrathon.png";
import CircuitBackground from "../components/animations/CircuitBackground";

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

      <Container size="lg" className="relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#0a2a20]">
            Support Our Team
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
            BECOME A <span className="text-transparent text-stroke">SPONSOR</span>
          </h1>

          <div className="max-w-4xl mx-auto space-y-6 text-left md:text-center bg-[#0a2a20]/50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#d4af37]/20">
            <p className="text-lg text-white/90 font-light leading-relaxed">
              Allen D Nease Electrathon is a team that competes in electric car endurance racing consisting of passionate drivers and crew members from St Johns County.
            </p>
            <p className="text-white/80 font-light leading-relaxed">
              Founded in 2020 our mission is to foster knowledge and hands on experience in motorsports and electric vehicles for students of Allen D Nease High School. This year we aim to compete in at least 3 more races and at least 4 in the next season as well as promoting the growth of Electrathon in St Johns county where we have encouraged the growth of two other teams and Northeast Florida where opportunities we have created have helped to inspire teams in Duval and other counties as well.
            </p>
            <p className="text-[#d4af37] font-mono text-sm pt-4 border-t border-[#d4af37]/20">
              Sponsorship opportunities currently available. Sponsorship is for 1 calendar year from the start date. Current sponsor has first right of refusal for renewal the following year.
            </p>
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mb-24">
          <SectionHeader title="Sponsorship Tiers" subtitle="CHOOSE YOUR LEVEL" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <SponsorCard key={index} tier={tier} />
            ))}
          </div>
        </div>

        {/* Info Sheet Download */}
        <div className="mb-24">
          <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 rounded-lg text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 uppercase">Sponsorship Info</h3>
            <p className="text-white/70 mb-6">
              Download our detailed sponsorship information sheet to learn more about how you can support the team and the benefits of each tier.
            </p>
            <Button 
              href={sponsorshipPdf} 
              download="Electrathon Sponsorship Info Sheet.pdf"
              className="bg-[#d4af37] text-black font-bold hover:bg-white w-full md:w-auto text-center"
            >
              Download Info Sheet (PDF)
            </Button>
          </div>
        </div>

        {/* Wishlist & Beneficiaries */}
        <div className="border-t border-[#d4af37]/20 pt-16 mb-16">
          <SectionHeader title="Other Ways to Support" subtitle="DONATIONS & PARTNERS" />
          
          <div className="text-center mb-12">
            <p className="text-xl text-white/90 font-light italic">
              "Financial donations and donations in kind are also greatly appreciated."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Recent Donations */}
            <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 relative">
              <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                <span className="text-[#d4af37]">🎁</span> Recent Support
              </h3>
              <p className="text-white/60 text-sm mb-6 font-light">
                Thank you to our community for their generous contributions.
              </p>
              <div className="space-y-4 mb-8">
                {donators.map((donation, index) => (
                  <DonationItem key={donation.id || index} donation={donation} />
                ))}
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-2 rounded-lg">
                  <img src={qrCode} alt="Amazon Wishlist QR Code" className="w-32 h-32 object-contain" />
                </div>
                <Button href="https://a.co/4fRGXMh" className="w-full bg-[#d4af37] text-black font-bold hover:bg-white">
                  View Full Wishlist
                </Button>
              </div>
            </div>

            {/* Beneficiaries / Current Sponsors */}
            <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 relative">
              <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                <span className="text-[#d4af37]">🤝</span> Our Sponsors
              </h3>
              <p className="text-white/60 text-sm mb-6 font-light">
                We are proud to be supported by these amazing organizations and individuals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sponsors.length > 0 ? (
                  sponsors.map((sponsor, index) => (
                    <SponsorItem key={sponsor.id || index} sponsor={sponsor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 border border-dashed border-[#d4af37]/20 rounded-lg">
                    <p className="text-white/40 italic">No sponsors listed yet. Be the first!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
