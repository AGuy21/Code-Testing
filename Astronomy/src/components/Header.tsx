import { NavLink } from "react-router-dom";
import { useState } from "react";
import { headerItems } from "../constants/data/headerItems";
import { Colors } from "../constants/colors";
import NavButton from "./HeaderButton";
import ParticleExplosion from "./animations/ParticleExplosion";

interface HeaderProps {
  SelectedPage?: string;
}

export default function Header({ SelectedPage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="w-full bg-linear-to-b from-black/50 via-indigo-950/20 to-transparent backdrop-blur-lg border-b border-indigo-400/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 2xl:px-8 py-8">
        <div className="flex flex-col items-center gap-8">
          <p className="text-sm tracking-[0.3em] uppercase text-indigo-300/70 font-light">
            Nease High School
          </p>

          <nav className="hidden sm:flex gap-6 items-center justify-center">
            {headerItems.map((item) => {
              const to = item.route === "/home" ? "/" : item.route;
              const isHovered = hoveredItem === item.title;
              
              return (
                <div key={item.title} className="relative">
                  <NavButton
                    to={to}
                    isPageActive={SelectedPage === item.title}
                    onHover={(hovered) => setHoveredItem(hovered ? item.title : null)}
                  >
                    {item.title}
                  </NavButton>
                  {!(SelectedPage === item.title) && isHovered ? <ParticleExplosion /> : null}
                </div>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden p-3 rounded-lg hover:bg-indigo-400/10 transition-all border border-indigo-400/30"
            style={{ boxShadow: `0 0 10px ${Colors.primary}20` }}
          >
            <svg className="w-6 h-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t border-indigo-400/30 bg-black/60 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            {headerItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.route === "/home" ? "/" : item.route}
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`block px-6 py-3 rounded-lg text-base font-medium tracking-[0.15em] transition-all text-center ${
                      isActive ? '' : 'text-indigo-200/90 hover:bg-indigo-400/10 border border-indigo-400/20'
                    }`}
                    style={isActive ? { backgroundColor: Colors.primary, color: Colors.background, boxShadow: `0 0 20px ${Colors.primary}60` } : {}}
                  >
                    {item.title}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </header>
  );
}
