import type { Sponsor } from "../constants/types/Sponsor";
import { getTierFromAmount } from "../utils/sponsorshipUtils";

export default function SponsorItem({ sponsor }: { sponsor: Sponsor }) {
  const tier = getTierFromAmount(sponsor.dollars);
  const accentColor = tier?.color || "#d4af37"; // Default to gold if no tier found

  const CardContent = () => (
    <>
      {/* Dynamic hover border using a pseudo-element or just inline style on hover is tricky in React without CSS-in-JS or Tailwind arbitrary values. 
          Let's use a style tag for the specific instance or just apply the color to the border directly on hover via a wrapper or inline style logic.
          Actually, simpler: apply the color to the border directly and use opacity.
      */}
      <div 
        className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ borderColor: accentColor }}
      />

      <div className="w-full aspect-video flex items-center justify-center overflow-hidden rounded-lg bg-white/5 p-2">
        {sponsor.image ? (
          <img 
            src={sponsor.image} 
            alt={sponsor.name} 
            className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110" 
          />
        ) : (
          <span className="text-4xl">🤝</span>
        )}
      </div>
      <div className="text-center relative z-10">
        <h4 className="text-white font-bold text-lg transition-colors" style={{ color: 'white' }}>
          <span className="group-hover:text-[var(--accent-color)]" style={{ '--accent-color': accentColor } as React.CSSProperties}>
            {sponsor.name}
          </span>
        </h4>
        {tier && (
          <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: accentColor }}>
            {tier.name} Sponsor
          </p>
        )}
        <p className="text-white/40 text-xs mt-1 font-mono">{sponsor.date}</p>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span 
          className="text-black text-xs font-bold px-2 py-1 rounded-full"
          style={{ backgroundColor: accentColor }}
        >
          ${sponsor.dollars}
        </span>
      </div>
    </>
  );

  if (sponsor.link) {
    return (
      <a 
        href={sponsor.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] block"
        style={{ 
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div 
      className="group relative bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      style={{ 
        borderColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <CardContent />
    </div>
  );
}
