import TechBorder from '../ui/TechBorder'
import { teamEthos } from '../../constants/data/sponsorshipData'

export default function EthosSection() {
  return (
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
  )
}
