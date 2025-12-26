import { useEffect, useState } from "react";
import { fetchSponsors } from "../utils/fetchUtils";
import { getTierFromAmount } from "../utils/sponsorshipUtils";
import type { Sponsor } from "../constants/types/Sponsor";

export default function SponsorMarquee() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const loadSponsors = async () => {
      const data = await fetchSponsors();
      setSponsors(data);
    };
    loadSponsors();
  }, []);

  // If no sponsors, don't show anything or show placeholder? 
  // The previous code showed "Your Name Could Be Here"
  
  const renderSponsors = () => (
    <div className="flex items-end gap-12 px-4 pb-1">
      <span className="text-white/30 font-mono uppercase tracking-widest text-[10px] mb-0.5">Proudly Sponsored By.</span>
      {sponsors.length > 0 ? (
        sponsors.map((sponsor, index) => {
          const tier = getTierFromAmount(sponsor.dollars);
          const tierName = tier?.name || "Bronze";
          
          let styleClass = "text-white/40 text-xs font-medium"; // Default/Bronze - small gray
          
          if (tierName === "Platinum") {
            styleClass = "text-[#00b4d8] text-base font-black tracking-wide drop-shadow-[0_0_10px_rgba(0,180,216,0.6)] opacity-100";
          } else if (tierName === "Gold") {
            styleClass = "text-[#d4af37] text-xs font-bold tracking-wide opacity-100";
          } else if (tierName === "Silver") {
            styleClass = "text-[#c0c0c0] text-xs font-semibold opacity-80";
          }

          const content = (
            <span className={`${styleClass} transition-all hover:scale-110 cursor-default`}>
              {sponsor.name}
            </span>
          );

          return (
            <div key={`s-${index}`}>
              {sponsor.link ? (
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })
      ) : (
        <span className="text-white/20 italic text-xs">Your Name Could Be Here</span>
      )}
    </div>
  );

  return (
    <div className="w-full overflow-hidden bg-[#0a2a20]/90 border-t border-[#d4af37]/10 py-2 backdrop-blur-sm flex items-center justify-center h-10">
      <div className="flex whitespace-nowrap animate-marquee hover:pause-on-hover items-center">
        {renderSponsors()}
        {renderSponsors()}
        {renderSponsors()}
        {renderSponsors()}
      </div>
    </div>
  );
}
