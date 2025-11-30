import GetSponsorData from '../../utils/GetSponsorData';
import SponsorCard from '../SponsorCard';

function SponsorCardCarousel() {
    const sponsorData = GetSponsorData();
  return (
    <div>
      {sponsorData.length === 0 ? (
        <div> Do you want to be sponsor #1?</div>
      ) : (
        <div className="flex overflow-x-auto space-x-4 py-4">
          {sponsorData.map((sponsor, index) => (
            <SponsorCard key={index} name={sponsor.name} logoUrl={sponsor.image} website={sponsor.link} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SponsorCardCarousel
