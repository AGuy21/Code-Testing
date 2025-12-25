import insta from '../assets/images/Instagram-Logo.png'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'

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
              <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4">
                <Button 
                  href="mailto:John.Beale@stjohns.k12.fl.us" 
                  variant="outline"
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black clip-corner-br"
                >
                  Contact Mr. Beale
                </Button>
                <Button 
                  to="/sponsorship" 
                  variant="primary"
                  className="bg-[#d4af37] text-black font-bold hover:bg-white clip-corner-br"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-[#d4af37]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Contact Information</h3>
              <div className="space-y-4 text-white/80 font-light">
                <div>
                  <p className="font-bold text-[#d4af37]">John Beale</p>
                  <a href="mailto:John.Beale@stjohns.k12.fl.us" className="hover:text-[#d4af37] transition-colors">John.Beale@stjohns.k12.fl.us</a>
                  <p className="text-sm mt-1">904-547-8300 from 7:30-9:00 AM on weekdays</p>
                </div>
                <div className="pt-4 border-t border-[#d4af37]/10">
                  <p>Allen D. Nease Senior High School</p>
                  <p>Stellar Academy of Engineering</p>
                  <p>Transportation Technology Club</p>
                </div>
              </div>
            </div>
            
            <div className="text-left md:text-right">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">School Address</h3>
              <div className="space-y-2 text-white/80 font-light">
                <p className="font-bold text-lg">ALLEN D. NEASE HIGH SCHOOL</p>
                <p>10550 Ray Road</p>
                <p>Ponte Vedra, FL 32081</p>
                <div className="pt-2 mt-2 border-t border-[#d4af37]/10 inline-block text-left md:text-right">
                  <p>O 904-547-8300</p>
                  <p>F 904-547-8305</p>
                  <a href="https://www-nhs.stjohns.k12.fl.us" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline block mt-1">
                    www-nhs.stjohns.k12.fl.us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

