import React from 'react'

export default function EventsHeader() {
  return (
    <div className="text-center mb-16">
      <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#d4af37]/5">
        Season Schedule
      </div>
      <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
        RACE <span className="text-transparent text-stroke">SCHEDULE</span>
      </h1>
      <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
        Join us at our next deployment. Race days, workshops, and community demonstrations.
      </p>
    </div>
  )
}