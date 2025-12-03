import SponsorCardCarousel from "../animations/SponsorCardCarousel";
import Container from "../ui/Container";
import { SchoolIcon, MailIcon, CalendarIcon } from "../ui/Icons";

export default function Footer() {

  return (
    <footer className="mt-20 border-t border-indigo-500/10 backdrop-blur-md">
      <Container size="xl" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Nease Astronomy Club
            </h3>
            <p className="text-indigo-200/60 text-sm leading-relaxed max-w-xs">
              Inspiring curiosity and exploration of the cosmos through community learning, observation nights, and active engagement.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-indigo-200/60 text-sm">
              <li>
                <a href="/" className="hover:text-pink-300 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span> Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-pink-300 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span> About Us
                </a>
              </li>
              <li>
                <a href="/connect" className="hover:text-pink-300 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span> Get Involved
                </a>
              </li>
              <li>
                <a href="/sponsors" className="hover:text-pink-300 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span> Sponsors
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">Contact Info</h4>
            <ul className="space-y-4 text-indigo-200/60 text-sm">
              <li className="flex items-start gap-3">
                <SchoolIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Allen D. Nease High School<br/>Ponte Vedra, FL</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <a href="mailto:astronomy@nease.edu" className="hover:text-white transition-colors">astronomy@nease.edu</a>
              </li>
              <li className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Meetings: Excel A in M104<br/>[Monthly Events?]</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-500/10 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Sponsors
            </h3>
            <p className="text-indigo-300/40 text-xs uppercase tracking-widest">Fueling our Mission</p>
          </div>
          
          <div className="mb-8">
            <SponsorCardCarousel />
          </div>
          
          <p className="text-center text-indigo-300/40 text-xs">
            Interested in becoming a sponsor? <a href="/sponsors" className="text-indigo-300 hover:text-white underline transition-colors">Learn more here</a>
          </p>
        </div>

        <div className="border-t border-indigo-500/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-indigo-300/30 text-xs">
          <p>&copy; {new Date().getFullYear()} Nease Astronomy Club. All rights reserved.</p>
          <p>Designed & Built by Jaxon Perez</p>
        </div>
      </Container>
    </footer>
  );
}
