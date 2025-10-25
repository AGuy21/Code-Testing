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
    <div className="p-5 bg-white/5 rounded-lg border border-white/10 hover:border-[#d4af37]/40 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-[#d4af37]/10 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-[#d4af37] text-base flex-1">{trophy.title}</h4>
        {getCategoryBadge()}
      </div>
      <p className="text-xs text-white/50 mb-3">{trophy.year}</p>
      <p className="text-sm text-white/80 leading-relaxed">{trophy.description}</p>
    </div>
  );
}
