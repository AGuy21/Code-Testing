import insta from '../../assets/images/Instagram-Logo.png'
import Button from '../ui/Button'

export default function InstagramSection() {
  return (
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
  )
}
