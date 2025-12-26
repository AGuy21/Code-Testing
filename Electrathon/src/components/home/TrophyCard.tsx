import type { Trophy } from '../../constants/types/Trophy';

interface TrophyCardProps {
  trophy: Trophy;
}

export default function TrophyCard({ trophy }: TrophyCardProps) {
  const getCategoryBadge = () => {
    switch (trophy.category) {
      case 'competition':
        return <span className="text-[10px] px-2 py-0.5 bg-[#d4af37] text-black font-bold uppercase tracking-wider">Competition</span>;
      case 'achievement':
        return <span className="text-[10px] px-2 py-0.5 bg-blue-500 text-black font-bold uppercase tracking-wider">Achievement</span>;
      case 'recognition':
        return <span className="text-[10px] px-2 py-0.5 bg-purple-500 text-black font-bold uppercase tracking-wider">Recognition</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 pb-8 pr-8 bg-[#0f3d2e] border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 group relative overflow-hidden clip-corner-br shadow-lg shadow-black/20">
      {/* Tech decoration */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#d4af37]/10 to-transparent pointer-events-none"></div>
      
      <div className="flex items-start justify-between mb-4 relative z-10 gap-4">
        <h4 className="font-bold text-white text-lg flex-1 uppercase tracking-tight group-hover:text-[#d4af37] transition-colors leading-tight">{trophy.title}</h4>
        <div className="flex-shrink-0">
          {getCategoryBadge()}
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4 border-b border-[#d4af37]/20 pb-2">
        <span className="text-[#d4af37] text-xs font-mono uppercase">Year //</span>
        <span className="text-white/80 text-xs font-mono">{trophy.year}</span>
      </div>
      <p className="text-sm text-white/80 leading-relaxed relative z-10 font-light">
        {trophy.description}
      </p>
    </div>
  );
}
