import SectionHeader from '../ui/SectionHeader'
import SponsorCard from '../SponsorCard'
import { sponsorshipTiers } from '../../constants/data/sponsorshipData'

export default function SponsorshipTiersSection() {
  return (
    <div className="mb-24">
      <SectionHeader title="Sponsorship Tiers" subtitle="CHOOSE YOUR LEVEL" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sponsorshipTiers.map((tier, index) => (
          <SponsorCard key={index} tier={tier} />
        ))}
      </div>
    </div>
  )
}
