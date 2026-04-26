import Button from '../ui/Button'

export default function SponsorshipContactSection() {
  return (
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
          Want to support our student team? We welcome local businesses, parents, and community partners who want to help us build skills and race stronger.
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
  )
}
