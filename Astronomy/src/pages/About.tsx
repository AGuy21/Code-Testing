import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import SectionPanel from "../components/ui/SectionPanel";
import { TelescopeIcon, CalendarIcon, StarIcon, MapPinIcon } from "../components/ui/Icons";

export default function About() {
  return (
    <Container size="lg" className="py-12 space-y-16">
      {/* Hero Section */}
      <div className="relative text-center mb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        <h1 className="pb-4 text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
          About Our Club
        </h1>
        <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto font-light tracking-wide">
          Cultivating the next generation of astronomers.
        </p>
      </div>

      {/* Mission Section */}
      <SectionPanel 
        title={<span className="text-indigo-300">Our Mission</span>}
        subtitle={<span className="text-indigo-300/60">Why we do what we do</span>}
        className="bg-linear-to-br from-indigo-950/40 to-purple-900/20 border-indigo-500/20"
      >
        <p className="text-lg md:text-xl text-indigo-100/90 leading-relaxed tracking-[0.02em] max-w-4xl mx-auto text-center">
          The Nease Astronomy Club brings together students passionate about space exploration and celestial discovery. 
          Through community outreach, observation nights, and educational events, we aim to ignite curiosity about the cosmos 
          and provide a supportive environment for aspiring astronomers to learn and grow.
        </p>
      </SectionPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="gradient" className="h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <TelescopeIcon className="w-6 h-6 text-indigo-300" />
            </div>
            <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              What We Do
            </h3>
          </div>
          <ul className="space-y-4">
            {[
              "[Item 1]",
              "[Item 2]",
              "[Item 3]",
              "[Item 4]",
              "[Item 5]",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-indigo-200/80">
                <StarIcon className="w-4 h-4 text-pink-400 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="gradient" className="h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              When We Meet
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/10">
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Regular Meetings</h4>
              <p className="text-indigo-300/80 flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-indigo-400" />
                <span>Excel A in Room M104</span>
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/10">
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">[Special Events]</h4>
              <p className="text-indigo-300/80">
                [Volatile?]
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="text-center bg-linear-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 border-indigo-500/20 p-10">
        <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          All Experience Levels Welcome
        </h3>
        <p className="text-lg text-indigo-200/80 max-w-3xl mx-auto">
          Whether you're a seasoned astronomer with your own telescope or just someone who enjoys looking up at the night sky, 
          there's a place for you in our club! We provide all necessary equipment and guidance.
        </p>
      </Card>
    </Container>
  );
}
