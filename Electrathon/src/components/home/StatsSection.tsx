import Container from '../ui/Container'
import type { Stats } from '../../constants/types/Stats'

interface StatsSectionProps {
  stats: Stats
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-24 bg-[#0f3d2e] relative overflow-hidden border-t border-[#d4af37]/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <Container size="xl" className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#d4af37]/30 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Team Statistics</h2>
            <p className="text-[#d4af37] font-mono text-sm mt-1">Status: <span className="animate-pulse">ACTIVE</span></p>
          </div>
          <div className="font-mono text-xs text-[#d4af37]/60 mt-4 md:mt-0 border border-[#d4af37]/30 px-2 py-1 rounded">
            NEASE HS ELECTRATHON
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{stats.competitions}</div>
            <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Races Run</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{stats.members}</div>
            <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Active Crew</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{stats.projects}</div>
            <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Vehicles Built</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{stats.years}</div>
            <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Years Dominating</div>
          </div>
        </div>
      </Container>
    </section>
  )
}
