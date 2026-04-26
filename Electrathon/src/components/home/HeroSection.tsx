import Container from '../ui/Container'
import Button from '../ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0f3d2e] z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[#0a2a20] transform skew-x-12 translate-x-1/4 z-0 border-l-4 border-[#d4af37]/20"></div>
      
      <Container size="xl" className="relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block px-4 py-1 mb-6 border border-[#d4af37] text-[#d4af37] text-sm font-mono tracking-widest uppercase bg-[#d4af37]/10 clip-corner-br">
            Engineering Excellence // Ready to Race
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 leading-none">
            NEASE <br />
            <span className="text-transparent text-stroke hover:text-[#d4af37] transition-colors duration-300">ELECTRATHON</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-10 font-light border-l-4 border-[#d4af37] pl-6">
            A student-run club where we design, build, and race electric endurance cars while learning real skills together. <br />
            <span className="text-[#d4af37] font-semibold">Build. Learn. Race. Repeat.</span>
          </p>
          <div className="flex flex-wrap gap-6">
            <Button to="/about" size="lg" className="clip-corner-br bg-[#d4af37] text-black font-bold hover:bg-white hover:text-black transition-all">
              Learn More
            </Button>
            <Button to="/events" variant="outline" size="lg" className="clip-corner-br border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10">
              Race Schedule
            </Button>
          </div>
        </div>
      </Container>

      {/* Decorative "Track" Line */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  )
}
