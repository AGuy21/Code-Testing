import GetSponsorData from "../../utils/GetSponsorData";
import SponsorCard from "../SponsorCard";
import type { SponsorItem } from "../../constants/types/SponsorItem";
function SponsorCardCarousel() {
  const sponsorData = GetSponsorData();
  const count = sponsorData.length;
  const isMarquee = sponsorData.length >= 4; //TODO make this reactive
  const speedSec = Math.max(18, 40 - count * 2);

  return (
    <>
    <div>
      {sponsorData.length === 0 ? (<></>) : isMarquee ? (
        <div className="w-full mx-auto overflow-hidden relative">
          <div className="relative overflow-hidden">
            <div className="carousel-fade left" />
            <div className="carousel-fade right" />
            <div
              className="flex gap-6 pb-6 animate-scroll-x"
              style={{
                padding: "1rem 0",
                width: "max-content",
                animationDuration: `${speedSec}s`,
                WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 72px, black calc(100% - 72px), transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent 0px, black 72px, black calc(100% - 72px), transparent 100%)',
              }}
            >
              {sponsorData.map((sponsor: SponsorItem, index: number) => (
                <div className="w-[260px] shrink-0" key={`s-${index}`}>
                  <SponsorCard
                    name={
                      (sponsor as SponsorItem).name ??
                      (sponsor as unknown as { title?: string }).title
                    }
                    logoUrl={sponsor.image}
                    website={sponsor.link}
                    tier={sponsor.tier}
                    date={
                      sponsor.date
                    }
                  />
                </div>
              ))}
              {sponsorData.map((sponsor: SponsorItem, index: number) => (
                <div className="w-[260px] shrink-0" key={`s2-${index}`}>
                  <SponsorCard
                    name={
                      (sponsor as SponsorItem).name ??
                      (sponsor as unknown as { title?: string }).title
                    }
                    logoUrl={sponsor.image}
                    website={sponsor.link}
                    tier={sponsor.tier}
                    date={
                      sponsor.date
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : count === 1 ? (
        <div className="w-full flex justify-center">
          <div className="w-[320px]">
            <SponsorCard
              name={sponsorData[0]?.name}
              logoUrl={sponsorData[0]?.image}
              website={sponsorData[0]?.link}
              tier={sponsorData[0]?.tier}
              date={sponsorData[0]?.date}
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 justify-center" style={{ gridTemplateColumns: `repeat(${Math.min(count, 4)}, minmax(220px, 1fr))`}}>
          {sponsorData.map((sponsor: SponsorItem, index: number) => (
            <SponsorCard
              key={`sgrid-${index}`}
              name={
                sponsor.name ?? (sponsor as unknown as { title?: string }).title
              }
              logoUrl={sponsor.image}
              website={sponsor.link}
              tier={sponsor.tier}
              date={sponsor.date}
            />
          ))}
        </div>
      )}
    </div>
    <style>{`
      @keyframes scroll-x {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll-x {
        animation: scroll-x 30s linear infinite;
      }
      .carousel-fade {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 72px;
        pointer-events: none;
        z-index: 50;
      }
      .carousel-fade.left {
        left: 0;
        background: linear-gradient(90deg, var(--color-background), transparent);
      }
      .carousel-fade.right {
        right: 0;
        background: linear-gradient(270deg, var(--color-background), transparent);
      }
    `}</style>
    </>
  );
}

export default SponsorCardCarousel;
