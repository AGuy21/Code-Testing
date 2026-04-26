import Container from "../components/ui/Container";
import IntroSection from "../components/about/IntroSection";
import IdentitySection from "../components/about/IdentitySection";
import EthosSection from "../components/about/EthosSection";
import JoinTeamSection from "../components/about/JoinTeamSection";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white pt-32 pb-16 relative overflow-hidden">

      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0a2a20] transform skew-x-12 translate-x-1/4 pointer-events-none border-l border-[#d4af37]/10"></div>
      
      <div className="absolute top-32 left-0 w-full h-px bg-[#d4af37]/20 pointer-events-none"></div>
      <div className="absolute bottom-32 left-0 w-full h-px bg-[#d4af37]/20 pointer-events-none"></div>
      <div className="absolute top-0 left-12 w-px h-full bg-[#d4af37]/10 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 right-12 w-px h-full bg-[#d4af37]/10 pointer-events-none hidden md:block"></div>

      <Container size="lg" className="relative z-10">
        <IntroSection />

        <div className="space-y-24">
          <IdentitySection />
          <EthosSection />
        </div>

        <JoinTeamSection />
      </Container>
    </div>
  );
}

