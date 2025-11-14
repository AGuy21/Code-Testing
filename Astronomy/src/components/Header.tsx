import { NavLink } from "react-router-dom";
import { useState } from "react";
import { headerItems } from "../constants/data/headerItems";
import { Colors } from "../constants/colors";

interface HeaderProps {
  SelectedPage?: string;
}

export default function Header({ SelectedPage }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 2xl:px-8 py-5">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide" style={{ color: Colors.primary }}>
              Astronomy Club
            </h1>
            <p className="text-xs text-white/50 mt-1">Nease Highschool</p>
          </div>

          <nav className="hidden sm:flex gap-3 items-center justify-center">
            {headerItems.map((item) => {
              const to = item.route === "/home" ? "/" : item.route;
              const isPageActive = SelectedPage === item.title;
              return (
                <NavLink
                  key={item.title}
                  to={to}
                  className={({ isActive }) => 
                    `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive || isPageActive 
                        ? '' 
                        : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                    }`
                  }
                  style={({ isActive }) => 
                    isActive || isPageActive
                      ? { 
                          backgroundColor: Colors.primary, 
                          color: Colors.background,
                          boxShadow: `0 10px 15px -3px ${Colors.primary}66`
                        }
                      : {}
                  }
                >
                  {item.title}
                </NavLink>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            {headerItems.map((item) => {
              const to = item.route === "/home" ? "/" : item.route;
              return (
                <NavLink
                  key={item.title}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-center ${
                      isActive ? '' : 'text-white/80 hover:bg-white/10'
                    }`
                  }
                  style={({ isActive }) => 
                    isActive
                      ? { backgroundColor: Colors.primary, color: Colors.background }
                      : {}
                  }
                >
                  {item.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
