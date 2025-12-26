import { Link } from "react-router-dom";
import Container from ".././ui/Container";
import { useEffect, useState } from "react";
import { fetchSponsors } from "../../utils/fetchUtils";
import { getTierFromAmount } from "../../utils/sponsorshipUtils";
import type { Sponsor } from "../../constants/types/Sponsor";

export default function Footer() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const loadSponsors = async () => {
      const data = await fetchSponsors();
      setSponsors(data);
    };
    loadSponsors();
  }, []);

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
                  href="mailto:John.Beale@stjohns.k12.fl.us"
                  className="hover:text-white transition-colors font-mono text-xs"
                >
                  John.Beale@stjohns.k12.fl.us
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] mt-1">📅</span>
                <span className="font-light">
                  Meetings: Thursdays 4-5PM
                  <br />
                  <span className="text-white/40 text-xs font-mono">Panther Hall 210</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sponsors Section */}
        {sponsors.length > 0 && (
          <div className="border-t border-[#d4af37]/10 pt-8 mt-8 mb-8">
            <p className="text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-4 text-center">
              Proudly Sponsored By
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
              {sponsors.map((sponsor, index) => {
                const tier = getTierFromAmount(sponsor.dollars);
                const tierName = tier?.name || "Bronze";
                
                let styleClass = "text-[#cd7f32] text-xs font-medium opacity-60 hover:opacity-100"; // Bronze/Default
                
                if (tierName === "Platinum") {
                  styleClass = "text-[#00b4d8] text-lg font-black tracking-wide drop-shadow-[0_0_10px_rgba(0,180,216,0.6)] opacity-100 hover:scale-105";
                } else if (tierName === "Gold") {
                  styleClass = "text-[#d4af37] text-base font-bold tracking-wide opacity-100 hover:scale-105 drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]";
                } else if (tierName === "Silver") {
                  styleClass = "text-[#c0c0c0] text-sm font-semibold opacity-80 hover:opacity-100";
                }

                const content = (
                  <span className={`${styleClass} transition-all duration-300 uppercase tracking-wider`}>
                    {sponsor.name}
                  </span>
                );

                return sponsor.link ? (
                  <a 
                    key={index} 
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
