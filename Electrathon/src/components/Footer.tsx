import { Link } from "react-router-dom";
import Container from "./ui/Container";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-[#d4af37]/30 bg-[#0a2a20] relative overflow-hidden">
      {/* Racing stripe accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#dc2626] to-[#d4af37] opacity-50"></div>

      <Container size="xl" className="py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#d4af37]">
              Nease Electrathon
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Designing, building, and racing the future of electric mobility.
              Join us in pushing the boundaries of efficiency and engineering.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>{" "}
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>{" "}
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/connect"
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>{" "}
                  Connect
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">
              Contact Info
            </h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37]">📍</span>
                <span>
                  Allen D. Nease High School
                  <br />
                  Ponte Vedra, FL
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#d4af37]">✉️</span>
                <a
                  href="mailto:electrathon@nease.edu"
                  className="hover:text-white transition-colors"
                >
                  electrathon@nease.edu
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37]">📅</span>
                <span>
                  Meetings: Tuesdays & Thursdays
                  <br />
                  Room M104
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
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
