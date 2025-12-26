import SectionHeader from '../ui/SectionHeader'
import DonationItem from './DonationItem'
import SponsorItem from './SponsorItem'
import Button from '../ui/Button'
import qrCode from '../../assets/images/QR code electrathon.png'
import type { Donator } from '../../constants/types/Donator'
import type { Sponsor } from '../../constants/types/Sponsor'

interface DonationsSectionProps {
  donators: Donator[]
  sponsors: Sponsor[]
}

export default function DonationsSection({ donators, sponsors }: DonationsSectionProps) {
  return (
    <div className="border-t border-[#d4af37]/20 pt-16 mb-16">
      <SectionHeader title="Other Ways to Support" subtitle="DONATIONS & PARTNERS" />
      
      <div className="text-center mb-12">
        <p className="text-xl text-white/90 font-light italic">
          "Financial donations and donations in kind are also greatly appreciated."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Recent Donations */}
        <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 relative">
          <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-3">
            <span className="text-[#d4af37]">🎁</span> Recent Support
          </h3>
          <p className="text-white/60 text-sm mb-6 font-light">
            Thank you to our community for their generous contributions.
          </p>
          <div className="space-y-4 mb-8">
            {donators.map((donation, index) => (
              <DonationItem key={donation.id || index} donation={donation} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-2 rounded-lg">
              <img src={qrCode} alt="Amazon Wishlist QR Code" className="w-32 h-32 object-contain" />
            </div>
            <Button href="https://a.co/4fRGXMh" className="w-full bg-[#d4af37] text-black font-bold hover:bg-white">
              View Full Wishlist
            </Button>
          </div>
        </div>

        {/* Beneficiaries / Current Sponsors */}
        <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 relative">
          <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-3">
            <span className="text-[#d4af37]">🤝</span> Our Sponsors
          </h3>
          <p className="text-white/60 text-sm mb-6 font-light">
            We are proud to be supported by these amazing organizations and individuals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sponsors.length > 0 ? (
              sponsors.map((sponsor, index) => (
                <SponsorItem key={sponsor.id || index} sponsor={sponsor} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 border border-dashed border-[#d4af37]/20 rounded-lg">
                <p className="text-white/40 italic">No sponsors listed yet. Be the first!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
