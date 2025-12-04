import insta from '../assets/images/Instagram-Logo.png'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import WishlistItem from '../components/WishlistItem'
import { wishlistItems, beneficiaries } from '../constants/data/wishlistData'

export default function Connect() {
  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f3d2e]/20 to-transparent pointer-events-none"></div>

      <Container size="lg" className="relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#d4af37]/5">
            Contact Us
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
            ESTABLISH <span className="text-transparent text-stroke">CONNECTION</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
            Follow our journey, support our team, or transmit a message.
          </p>
        </div>

        <div className="space-y-24">
          {/* Instagram Section */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="w-48 h-48 bg-[#d4af37]/10 rounded-full flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
                <img src={insta} alt="Instagram" className="w-24 h-24 object-contain invert relative z-10" />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">Instagram</h2>
              <p className="text-[#d4af37] font-mono text-xs mb-6">FOLLOW US</p>
              <p className="text-white/60 mb-8 max-w-sm mx-auto md:mx-0 font-light">
                Check out our latest race photos, build updates, and team announcements on Instagram.
              </p>
              <Button 
                href="https://www.instagram.com/neaseelectrathon/" 
                className="bg-[#d4af37] text-black font-bold hover:bg-white clip-corner-br"
              >
                View Profile
              </Button>
            </div>
          </div>

          {/* Sponsorship Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="w-48 h-48 bg-[#d4af37]/10 rounded-full flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
                <span className="text-6xl relative z-10">🤝</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right">
              <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">Sponsorships</h2>
              <p className="text-[#d4af37] font-mono text-xs mb-6">PARTNER WITH US</p>
              <p className="text-white/60 mb-8 max-w-sm mx-auto md:ml-auto md:mr-0 font-light">
                Interested in sponsoring Electrathon? We welcome support from local businesses and community partners.
              </p>
              <Button 
                href="mailto:Mr.Beale@nease.edu" 
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black clip-corner-br"
              >
                Contact Mr. Beale
              </Button>
            </div>
          </div>

          {/* Fundraising & Wishlist Section */}
          <div className="border-t border-[#d4af37]/20 pt-16">
            <SectionHeader title="Support The Team" subtitle="FUNDRAISING & DONATIONS" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Amazon Wishlist */}
              <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 relative">
                <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                  <span className="text-[#d4af37]">📦</span> Amazon Wishlist
                </h3>
                <p className="text-white/60 text-sm mb-6 font-light">
                  Directly support our build by purchasing tools and equipment we need for the season.
                </p>
                <div className="space-y-4 mb-8">
                  {wishlistItems.map((item, index) => (
                    <WishlistItem key={index} item={item} />
                  ))}
                </div>
                <Button href="#" className="w-full bg-[#d4af37] text-black font-bold hover:bg-white">
                  View Full Wishlist
                </Button>
              </div>

              {/* Beneficiaries */}
              <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 relative">
                <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                  <span className="text-[#d4af37]">❤️</span> Our Supporters
                </h3>
                <p className="text-white/60 text-sm mb-6 font-light">
                  A special thank you to the individuals and organizations that keep us racing.
                </p>
                <ul className="grid grid-cols-1 gap-3">
                  {beneficiaries.map((name, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80 font-mono text-sm p-3 bg-[#0f3d2e] border border-white/5">
                      <span className="text-[#d4af37]">★</span> {name}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-[#d4af37]/5 border border-[#d4af37]/20 text-center">
                  <p className="text-[#d4af37] text-xs font-mono mb-2">WANT TO SEE YOUR NAME HERE?</p>
                  <a href="mailto:Mr.Beale@nease.edu" className="text-white underline hover:text-[#d4af37] transition-colors text-sm">
                    Become a Benefactor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-[#d4af37]/10 text-center">
          <h3 className="text-xl font-bold text-[#d4af37] mb-2 uppercase tracking-widest">Direct Contact</h3>
          <p className="text-white/50 mb-4 font-mono text-sm">For official inquiries, please contact Mr. Beale</p>
          <a 
            href="mailto:Mr.Beale@nease.edu" 
            className="text-2xl md:text-4xl font-black text-white hover:text-[#d4af37] transition-colors tracking-tight"
          >
            Mr.Beale@nease.edu
          </a>
        </div>
      </Container>
    </div>
  )
}

