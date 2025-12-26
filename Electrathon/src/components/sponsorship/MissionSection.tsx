import Container from '../ui/Container'

export default function MissionSection() {
  return (
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
    </Container>
  )
}
