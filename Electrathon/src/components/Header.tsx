import { NavLink } from "react-router-dom";
import { useState } from "react";
import { headerItems } from "../constants/data/headerItems";
import logo from "../assets/images/Electrothon.png";

interface HomeProps {
  SelectedPage?: string;
}

export default function Header({ SelectedPage }: HomeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white/5 flex items-center justify-center ring-1 ring-white/10">
            <img
              src={logo}
              alt="Electrothon logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold text-[#d4af37]">
              Electrathon
            </div>
            <div className="text-xs text-white/70">Nease High School</div>
          </div>
        </div>

        {/* Desktop nav */}

        <nav className="hidden sm:flex gap-4 items-center">
          {headerItems.map((item, index) => {
            const to = item.route === "/home" ? "/" : item.route;
            return (
              <NavLink
                key={item.title}
                to={to}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={({ isActive }) => {
                  let base =
                    "px-3 py-2 rounded-md text-sm md:text-base transition-all duration-200 transform inline-block";

                  if (hoveredIndex !== null) {
                    if (hoveredIndex === index) {
                      base +=
                        " -translate-y-1 scale-105 text-[#0f3d2e] bg-[#d4af37] font-semibold border-b-4 border-[#d4af37]";
                    } else {
                      base += " scale-95 text-white/40";
                    }
                  } else {
                    if (isActive || SelectedPage === item.title) {
                      base +=
                        " text-[#0f3d2e] bg-[#d4af37] font-semibold border-b-4 border-[#d4af37]";
                    } else {
                      base +=
                        " text-white/90 hover:-translate-y-1 hover:scale-105 hover:text-white hover:bg-white/5";
                    }
                  }
                  return base;
                }}
              >
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md ring-1 ring-white/10 bg-white/3"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}

      {open && (
        <div className="sm:hidden mobile-menu-backdrop px-4 py-3 border-t border-white/5">
          <div className="flex flex-col gap-2">
            {headerItems.map((item) => {
              const to = item.route === "/home" ? "/" : item.route;
              return (
                <NavLink
                  key={item.title}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded text-sm ${
                      isActive
                        ? "bg-[#d4af37] text-[#0f3d2e] font-semibold"
                        : "text-white/90 hover:bg-white/5"
                    }`
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
