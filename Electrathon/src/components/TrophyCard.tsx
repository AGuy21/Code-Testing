import type { Trophy } from '../constants/types/Trophy';

interface TrophyCardProps {
  trophy: Trophy;
}

export default function TrophyCard({ trophy }: TrophyCardProps) {
  const getCategoryIcon = () => {
    switch (trophy.category) {
      case 'competition':
        return '🏆';
      case 'achievement':
        return '⭐';
      case 'recognition':
        return '🎖️';
      default:
        return '🏅';
    }
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{getCategoryIcon()}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-[#d4af37] text-lg">{trophy.title}</h4>
          <p className="text-sm text-white/60 mt-1">{trophy.year}</p>
          <p className="mt-2 text-sm text-white/80">{trophy.description}</p>
        </div>
      </div>
    </div>
  );
}
