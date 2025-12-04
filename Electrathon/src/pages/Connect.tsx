import insta from '../assets/images/Instagram-Logo.png'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Connect() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f3d2e]/20 to-transparent pointer-events-none"></div>

      <Container size="lg" className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#d4af37]/5">
            Communication Uplink
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
            ESTABLISH <span className="text-transparent text-stroke">CONNECTION</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
            Follow our journey, support our team, or transmit a message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card variant="cyber" className="text-center p-8 md:p-12 flex flex-col items-center justify-center h-full group">
            <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
              <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              <img src={insta} alt="Instagram" className="w-12 h-12 object-contain invert relative z-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Visual Feed</h2>
            <p className="text-[#d4af37] font-mono text-xs mb-6">STATUS: ONLINE</p>
            <p className="text-white/60 mb-8 max-w-sm font-light">
              Check out our latest race photos, build updates, and team announcements on Instagram.
            </p>
            <Button 
              href="https://www.instagram.com/neaseelectrathon/" 
              className="w-full sm:w-auto bg-[#d4af37] text-black font-bold hover:bg-white clip-corner-br"
            >
              Access Feed
            </Button>
          </Card>

          <Card variant="cyber" className="text-center p-8 md:p-12 flex flex-col items-center justify-center h-full group">
            <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
              <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              <span className="text-4xl relative z-10">🤝</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Alliance</h2>
            <p className="text-[#d4af37] font-mono text-xs mb-6">STATUS: OPEN FOR PARTNERSHIP</p>
            <p className="text-white/60 mb-8 max-w-sm font-light">
              Interested in sponsoring Electrathon? We welcome support from local businesses and community partners.
            </p>
            <Button 
              href="mailto:NHSelectrothon@gmail.com" 
              variant="outline"
              className="w-full sm:w-auto border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black clip-corner-br"
            >
              Initiate Protocol
            </Button>
          </Card>
        </div>

        <div className="mt-12">
          <Card variant="tech" className="p-8 text-center border border-white/10 bg-black/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-[#d4af37] mb-2 uppercase tracking-widest">Direct Line</h3>
            <p className="text-white/50 mb-4 font-mono text-sm">Have a question about the club or how to join?</p>
            <a 
              href="mailto:NHSelectrothon@gmail.com" 
              className="text-2xl md:text-3xl font-black text-white hover:text-[#d4af37] transition-colors tracking-tight"
            >
              NHSelectrothon@gmail.com
            </a>
          </Card>
        </div>
      </Container>
    </div>
  )
}

