export default function IntroSection() {
  return (
    <div className="text-center mb-24 relative">
      {/* Technical Markers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-[10px] text-[#d4af37]/40 font-mono tracking-[0.5em]">
        SECTION 01 // OVERVIEW
      </div>
      
      <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#0a2a20]">
        Team Information // About Us
      </div>
      <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
        TEAM <span className="text-transparent text-stroke">ORIGIN</span>
      </h1>
      <p className="text-xl text-white/70 max-w-3xl mx-auto font-light border-l-2 border-[#d4af37] pl-4 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-4 bg-[#0a2a20]/50 backdrop-blur-sm p-4 rounded-r-lg md:rounded-lg">
        More than just a racing club — we are a collective of innovators, engineers, and problem solvers pushing the boundaries of electric mobility.
      </p>
    </div>
  )
}
