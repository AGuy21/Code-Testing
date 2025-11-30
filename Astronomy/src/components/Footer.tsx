import SponsorCardCarousel from "./animations/SponsorCardCarousel";
import Container from "./Container";

export default function Footer() {

  return (
    <footer className="mt-20 border-t border-indigo-400/20 bg-linear-to-b from-transparent to-black/30 backdrop-blur-sm">
      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Nease Astronomy Club
            </h3>
            <p className="text-indigo-200/70 text-sm leading-relaxed">
              Inspiring curiosity and exploration of the cosmos through community learning and active engagement.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-indigo-200">Quick Links</h4>
            <ul className="space-y-2 text-indigo-200/70 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-indigo-300 transition-colors">About</a>
              </li>
              <li>
                <a href="/connect" className="hover:text-indigo-300 transition-colors">Connect</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-indigo-200">Contact</h4>
            <ul className="space-y-2 text-indigo-200/70 text-sm">
              <li>Allen D. Nease High School</li>
              <li>Email: astronomy@nease.edu</li>
              <li>Meetings: Excel B, during school, in M104</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-400/20 pt-8">
          <h3 className="text-center text-xl font-bold mb-6 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Sponsors
          </h3>
          <SponsorCardCarousel />
          <p className="text-center text-indigo-300/60 text-xs">
            Interested in becoming a sponsor? <a href="/connect" className="underline hover:text-indigo-300 transition-colors">Contact us</a>
          </p>
        </div>

        <div className="border-t border-indigo-400/20 pt-6 mt-8 text-center text-indigo-300/50 text-sm">
          <p>&copy; {2025} Nease Astronomy Club. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
