import Container from '../ui/Container'

export default function MissionSection() {
  return (
    <Container size="lg" className="relative z-10">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
          BECOME A <span className="text-transparent text-stroke">SPONSOR</span>
        </h1>

        <div className="max-w-4xl mx-auto space-y-6 text-left md:text-center bg-[#0a2a20]/50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#d4af37]/20">
          <p className="text-lg text-white/90 font-light leading-relaxed">
            We’re the Allen D. Nease Electrathon club: a student-led group that designs, builds, and races electric endurance cars while learning real technical skills.
          </p>
          <p className="text-white/80 font-light leading-relaxed">
            Since 2020, our club has grown into a place where students learn welding, wiring, fabrication, and event preparation. This season we’re aiming for more races, better car performance, and stronger community support across St. Johns County.
          </p>
          <p className="text-[#d4af37] font-mono text-sm pt-4 border-t border-[#d4af37]/20">
            Sponsorship opportunities currently available. Sponsorship is for 1 calendar year from the start date. Current sponsor has first right of refusal for renewal the following year.
          </p>
        </div>
      </div>
    </Container>
  )
}
