import type { Trophy } from '../constants/data/statsData';

interface TrophyCardProps {
  trophy: Trophy;
}

export default function TrophyCard({ trophy }: TrophyCardProps) {
  const getCategoryBadge = () => {
    switch (trophy.category) {
      case 'competition':
        return <span className="text-xs px-2.5 py-1 bg-[#d4af37]/20 text-[#d4af37] rounded-full font-medium border border-[#d4af37]/30">Competition</span>;
      case 'achievement':
        return <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full font-medium border border-blue-400/30">Achievement</span>;
      case 'recognition':
        return <span className="text-xs px-2.5 py-1 bg-purple-500/20 text-purple-400 rounded-full font-medium border border-purple-400/30">Recognition</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-5 bg-white/5 rounded-lg border-2 border-white/10 border-l-4 border-l-[#d4af37] hover:border-[#d4af37]/60 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-[#d4af37]/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Subtle racing stripe gradient in background */}
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#d4af37]/5 to-transparent pointer-events-none"></div>
      
      <div className="flex items-start justify-between mb-3 relative z-10">
        <h4 className="font-semibold text-[#d4af37] text-base flex-1">{trophy.title}</h4>
        {getCategoryBadge()}
      </div>
      <p className="text-xs text-white/50 mb-3 relative z-10">{trophy.year}</p>
      <p className="text-sm text-white/80 leading-relaxed relative z-10">{trophy.description}</p>
    </div>
  );
}
