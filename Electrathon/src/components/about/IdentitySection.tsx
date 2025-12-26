import TechBorder from '../ui/TechBorder'
import { teamEthos } from '../../constants/data/sponsorshipData'

export default function IdentitySection() {
  return (
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
  )
}
