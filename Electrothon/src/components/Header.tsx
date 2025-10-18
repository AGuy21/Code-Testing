import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { headerItems } from '../constants/data/headerItems'

interface HomeProps {
  SelectedPage?: string
}

export default function Header({ SelectedPage }: HomeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <header className="w-full bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center font-bold text-[#0f3d2e]">E</div>
          <div>
            <div className="text-lg font-semibold text-[#d4af37]">Electrothon</div>
            <div className="text-xs text-white/70">Nease High School</div>
          </div>
        </div>

        <nav className="flex gap-4 items-center">
          {headerItems.map((item, index) => {
            const to = item.route === '/home' ? '/' : item.route
            return (
              <NavLink
                key={item.title}
                to={to}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={({ isActive }) => {
                  let base = 'px-3 py-2 rounded-md text-sm md:text-base transition-all duration-200 transform inline-block'

                  if (hoveredIndex !== null) {
                    if (hoveredIndex === index) {
                      base += ' -translate-y-1 scale-105 text-[#0f3d2e] bg-[#d4af37] font-semibold border-b-4 border-[#d4af37]'
                    } else {
                      base += ' scale-95 text-white/40'
                    }
                  } else {
                    if (isActive || SelectedPage === item.title) {
                      base += ' text-[#0f3d2e] bg-[#d4af37] font-semibold border-b-4 border-[#d4af37]'
                    } else {
                      base += ' text-white/90 hover:-translate-y-1 hover:scale-105 hover:text-white hover:bg-white/5'
                    }
                  }

                  return base
                }}
              >
                {item.title}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

