import GetSponsorData from "../../utils/GetSponsorData";
import SponsorCard from "../SponsorCard";

function SponsorCardCarousel() {
  const sponsorData = GetSponsorData();
  return (
    <div>
      {sponsorData.length === 0 ? (
        <div> Do you want to be sponsor #1?</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mb-8 max-w-4xl mx-auto">
          <div className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)]">
            {sponsorData.map((sponsor, index) => (
              <SponsorCard
                key={index}
                name={sponsor.name}
                logoUrl={sponsor.image}
                website={sponsor.link}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SponsorCardCarousel;
