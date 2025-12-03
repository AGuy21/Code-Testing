import SponsorShowcase from "../components/SponsorShowcase";
import Container from "../components/Container";

export default function Sponsors() {
  return (
    <Container size="xl">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight">
          Our Sponsors
        </h1>
        <p className="text-lg md:text-xl text-indigo-200/80 max-w-3xl mb-8">
          Partner with the Nease Astronomy Club to inspire the next generation
          of astronomers and scientists. Your support directly impacts our
          members' growth, events, and community reach.
        </p>
      </div>

      {/* Current Sponsors */}
      <div className="mb-20">
        <SponsorShowcase />
      </div>

      {/* Why Sponsor Section */}
      <div className="mb-20 bg-indigo-950/30 rounded-2xl p-12 border border-indigo-400/20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-100">
          Why Sponsor Nease Astronomy Club?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-pink-400 mb-3">
              Impact & Reach
            </h3>
            <p className="text-indigo-200/80">
              Our club reaches hundreds of students annually through events,
              presentations, and community outreach programs. Your partnership
              directly supports STEM education and inspires future scientists.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-400 mb-3">
              Brand Visibility
            </h3>
            <p className="text-indigo-200/80">
              Gain prominent placement on our website, social media channels,
              and at our signature events. Connect with engaged students and
              families passionate about science.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-400 mb-3">
              Community Leadership
            </h3>
            <p className="text-indigo-200/80">
              Position your company as a champion of education and innovation in
              the Ponte Vedra community. Build lasting relationships with future
              leaders and innovators.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-400 mb-3">
              Tax Benefits
            </h3>
            <p className="text-indigo-200/80">
              Our club is backed by the school, making donations tax-deductible.
              Invest in education while supporting your bottom line.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-100">
          Ready to Make an Impact?
        </h2>
        <p className="text-lg text-indigo-200/80 mb-8 max-w-2xl mx-auto">
          Contact us to discuss partnership opportunities tailored to your
          organization's goals and budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:astronomy@nease.edu"
            className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Become a Sponsor
          </a>
          <button className="px-8 py-3 border-2 border-indigo-400 text-indigo-300 hover:text-indigo-100 hover:border-indigo-300 font-semibold rounded-lg transition-all duration-300">
            Download Sponsor Pack
          </button>
        </div>
      </div>
    </Container>
  );
}
