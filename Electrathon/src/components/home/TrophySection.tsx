import Container from '../ui/Container'
import TrophyCard from './TrophyCard'
import type { Trophy } from '../../constants/types/Trophy'

interface TrophySectionProps {
  trophies: Trophy[]
  loading: boolean
}

export default function TrophySection({ trophies, loading }: TrophySectionProps) {
  return (
    <section className="py-24 bg-[#0f3d2e] relative border-t border-[#d4af37]/20">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0a2a20] to-transparent"></div>
      <Container size="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-4 uppercase tracking-widest">Hall of Fame</h2>
          <div className="w-32 h-1 bg-[#d4af37] mx-auto relative">
            <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-white/50"></div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white/60 py-12 font-mono">Loading Data...</div>
        ) : trophies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trophies.map((trophy) => (
              <TrophyCard key={trophy.id} trophy={trophy} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/60 py-12 font-mono border border-[#d4af37]/20 rounded-lg bg-[#0a2a20]/50">
            <p>🏆 Competition results coming soon</p>
          </div>
        )}
      </Container>
    </section>
  )
}
