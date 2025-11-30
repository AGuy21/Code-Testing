import GetSponsorData from "../../utils/GetSponsorData";
import SponsorCard from "../SponsorCard";
import type { SponsorItem } from "../../constants/types/SponsorItem";

function SponsorCardCarousel() {
  const sponsorData = GetSponsorData();
  return (
    <div>
      {sponsorData.length === 0 ? (
        <div> Do you want to be sponsor #1?</div>
        ) : (
        <div className="w-full mx-auto overflow-hidden">
          <div className="relative overflow-hidden">
            <div className="flex gap-6 pb-6 animate-scroll-x" style={{ padding: '1rem 0', width: 'max-content' }}>
              {sponsorData.map((sponsor: SponsorItem, index: number) => (
                <div className="w-[260px] shrink-0" key={`s-${index}`}>
                  <SponsorCard
                    name={sponsor.name || (sponsor as SponsorItem).name}
                    logoUrl={sponsor.image}
                    website={sponsor.link}
                    tier={(sponsor.tier as SponsorItem['tier'])}
                    date={(sponsor.date as string) || (sponsor as SponsorItem).date}
                  />
                </div>
              ))}
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SponsorCardCarousel;
