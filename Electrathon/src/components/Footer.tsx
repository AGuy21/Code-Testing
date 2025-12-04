import { Link } from "react-router-dom";
import Container from "./ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-[#d4af37]/20 bg-[#0a2a20] relative overflow-hidden pt-16">
      {/* Engineering accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      
      {/* Gradient blend from body */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0f3d2e] to-transparent opacity-20 pointer-events-none"></div>

      <Container size="xl" className="pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="inline-block px-2 py-1 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-mono uppercase tracking-widest bg-[#d4af37]/5 mb-2">
              Nease HS
            </div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              Nease <span className="text-[#d4af37]">Electrathon</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-light">
              Designing, building, and racing the future of electric mobility.
              Join us in pushing the boundaries of efficiency and engineering.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 text-[#d4af37] uppercase tracking-widest font-mono">
              Quick Links
            </h4>
            <ul className="space-y-3 text-white/60 text-sm font-mono">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span>
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/connect"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span>
                  Connect
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 text-[#d4af37] uppercase tracking-widest font-mono">
              Contact Info
            </h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] mt-1">📍</span>
                <span className="font-light">
                  Allen D. Nease High School
                  <br />
                  Ponte Vedra, FL
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#d4af37]">✉️</span>
                <a
                  href="mailto:Mr.Beale@nease.edu"
                  className="hover:text-white transition-colors font-mono text-xs"
                >
                  Mr.Beale@nease.edu
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] mt-1">📅</span>
                <span className="font-light">
                  Meetings: Thursdays
                  <br />
                  <span className="text-white/40 text-xs font-mono">Panther Hall 10</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4af37]/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-mono">
          <p>
            &copy; {new Date().getFullYear()} Nease Electrathon Club. All rights
            reserved.
          </p>
          <p>Designed & Built by Jaxon Perez</p>
        </div>
      </Container>
    </footer>
  );
}
