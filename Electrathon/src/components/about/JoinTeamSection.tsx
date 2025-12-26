import SectionHeader from '../ui/SectionHeader'

export default function JoinTeamSection() {
  return (
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
            <p className="text-white font-mono text-2xl">Thursdays 3-4PM</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#d4af37]/30"></div>
          <div className="text-center md:text-left">
            <p className="text-[#d4af37] font-bold text-sm uppercase tracking-widest mb-1">Location</p>
            <p className="text-white font-mono text-xl">Panther Hall 210</p>
          </div>
        </div>
      </div>
    </div>
  )
}
