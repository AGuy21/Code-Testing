import SponsorShowcase from "../components/sponsors/SponsorShowcase";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import { RocketIcon, TelescopeIcon, UsersIcon, DollarSignIcon } from "../components/ui/Icons";

export default function Sponsors() {
  return (
    <Container size="xl">
      {/* Hero Section */}
      <div className="mb-16 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-sm">
          Our Sponsors
        </h1>
        <p className="text-lg md:text-xl text-indigo-200/80 max-w-3xl mb-8 leading-relaxed">
          Partner with the Nease Astronomy Club to inspire the next generation
          of astronomers and scientists. Your support directly impacts our
          members' growth, events, and community reach.
        </p>
      </div>

      {/* Current Sponsors */}
      <div className="mb-24">
        <SponsorShowcase />
      </div>

      {/* Why Sponsor Section */}
      <div className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Why Sponsor Nease Astronomy Club?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="gradient" className="h-full">
            <div className="mb-4">
              <RocketIcon className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-pink-300">
              Impact & Reach
            </h3>
            <p className="text-indigo-200/80 leading-relaxed">
              Our club reaches hundreds of students annually through events,
              presentations, and community outreach programs. Your partnership
              directly supports STEM education and inspires future scientists.
            </p>
          </Card>
          
          <Card variant="gradient" className="h-full">
            <div className="mb-4">
              <TelescopeIcon className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-blue-300">
              Brand Visibility
            </h3>
            <p className="text-indigo-200/80 leading-relaxed">
              Gain prominent placement on our website, social media channels,
              and at our signature events. Connect with engaged students and
              families passionate about science.
            </p>
          </Card>
          
          <Card variant="gradient" className="h-full">
            <div className="mb-4">
              <UsersIcon className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-emerald-300">
              Community Leadership
            </h3>
            <p className="text-indigo-200/80 leading-relaxed">
              Position your company as a champion of education and innovation in
              the Ponte Vedra community. Build lasting relationships with future
              leaders and innovators.
            </p>
          </Card>
          
          <Card variant="gradient" className="h-full">
            <div className="mb-4">
              <DollarSignIcon className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-amber-300">
              Tax Benefits
            </h3>
            <p className="text-indigo-200/80 leading-relaxed">
              Our club is backed by the school, making donations tax-deductible.
              Invest in education while supporting your bottom line.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md mb-12">
        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl -z-10" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Ready to Make an Impact?
        </h2>
        <p className="text-lg text-indigo-200/80 mb-10 max-w-2xl mx-auto">
          Contact us to discuss partnership opportunities tailored to your
          organization's goals and budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:astronomy@nease.edu"
            className="px-8 py-4 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 inline-block"
          >
            Become a Sponsor
          </a>
          <button className="px-8 py-4 border border-indigo-400/50 bg-indigo-950/30 text-indigo-200 hover:text-white hover:bg-indigo-900/50 hover:border-indigo-300 font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm">
            Download Sponsor Pack
          </button>
        </div>
      </div>
    </Container>
  );
}
