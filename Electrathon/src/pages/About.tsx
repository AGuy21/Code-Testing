import Container from "../components/ui/Container";
import { sponsorshipTiers, teamEthos } from "../constants/data/sponsorshipData";
import SectionHeader from "../components/ui/SectionHeader";
import TechBorder from "../components/ui/TechBorder";
import SponsorCard from "../components/SponsorCard";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements - Engineering Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0a2a20] transform skew-x-12 translate-x-1/4 pointer-events-none border-l border-[#d4af37]/10"></div>
      
      {/* Blueprint Lines */}
      <div className="absolute top-32 left-0 w-full h-px bg-[#d4af37]/20 pointer-events-none"></div>
      <div className="absolute bottom-32 left-0 w-full h-px bg-[#d4af37]/20 pointer-events-none"></div>
      <div className="absolute top-0 left-12 w-px h-full bg-[#d4af37]/10 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 right-12 w-px h-full bg-[#d4af37]/10 pointer-events-none hidden md:block"></div>

      <Container size="lg" className="relative z-10">
        <div className="text-center mb-24 relative">
          {/* Technical Markers */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-[10px] text-[#d4af37]/40 font-mono tracking-[0.5em]">
            SECTION 01 // OVERVIEW
          </div>
          
          <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#0a2a20]">
            Team Information // About Us
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
            TEAM <span className="text-transparent text-stroke">ORIGIN</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-light border-l-2 border-[#d4af37] pl-4 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-4 bg-[#0a2a20]/50 backdrop-blur-sm p-4 rounded-r-lg md:rounded-lg">
            More than just a racing club — we are a collective of innovators, engineers, and problem solvers pushing the boundaries of electric mobility.
          </p>
        </div>

        <div className="space-y-24">
          {/* Identity Section */}
          <TechBorder side="left">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">Identity</h2>
              <div className="h-px flex-grow bg-[#d4af37]/20"></div>
              <span className="text-xs font-mono text-[#d4af37] border border-[#d4af37]/30 px-2 py-1">ESTABLISHED TEAM</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-white/80 leading-relaxed font-mono text-sm">
                {teamEthos.founding}
              </p>
              <p className="text-white/80 leading-relaxed font-mono text-sm">
                {teamEthos.model}
              </p>
            </div>
          </TechBorder>

          {/* Mission & Ethos Section */}
          <TechBorder side="right">
            <div className="flex items-center gap-4 mb-6 flex-row-reverse">
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">Our Ethos</h2>
              <div className="h-px flex-grow bg-[#d4af37]/20"></div>
              <span className="text-xs font-mono text-[#d4af37] border border-[#d4af37]/30 px-2 py-1">CORE VALUES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="order-2 md:order-1">
                <p className="text-white/80 leading-relaxed font-mono text-sm text-right">
                  {teamEthos.ethos}
                </p>
              </div>
              <div className="order-1 md:order-2">
                 <ul className="space-y-4 inline-block text-right">
                  {[
                    "Student-Led Engineering",
                    "Sustainable Innovation",
                    "Competitive Excellence",
                    "Community Impact"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-end gap-3 group">
                      <span className="text-white/80 text-sm font-mono group-hover:text-white transition-colors">{item}</span>
                      <span className="text-[#d4af37] mt-1 font-mono group-hover:-translate-x-1 transition-transform">{"<<"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TechBorder>
        </div>

        {/* Sponsorship Section Removed - Moved to Sponsorship Page */}


        <div className="mt-24 relative border-t border-[#d4af37]/20 pt-16">
          <div className="text-center">
            <SectionHeader title="Join the Team" subtitle="BECOME A MEMBER" className="mb-8" />
            
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12 font-light">
              We meet weekly to work on projects, learn new skills, and prepare for competitions. 
              Whether you're interested in welding, coding, driving, or marketing, there's a place for you on our team.
            </p>
            
            <div className="inline-flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border border-[#d4af37]/30 bg-[#0a2a20]/50 p-8 md:px-16 clip-corner-br">
              <div className="text-center md:text-left">
                <p className="text-[#d4af37] font-bold text-sm uppercase tracking-widest mb-1">Meeting Times</p>
                <p className="text-white font-mono text-2xl">Thursdays</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-[#d4af37]/30"></div>
              <div className="text-center md:text-left">
                <p className="text-[#d4af37] font-bold text-sm uppercase tracking-widest mb-1">Location</p>
                <p className="text-white font-mono text-xl">Panther Hall 10</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

