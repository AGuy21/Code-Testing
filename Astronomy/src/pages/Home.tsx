import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import { SparklesIcon, TelescopeIcon, GalaxyIcon, RocketIcon } from "../components/ui/Icons";

export default function Home() {
  return (
    <div className="py-12 space-y-24">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        
        <Container size="md" className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md animate-float">
            <SparklesIcon className="w-4 h-4 text-indigo-300" />
            <span className="text-indigo-200 text-sm font-medium tracking-wide">
              Welcome to the Cosmos
            </span>
          </div>
          
          <h1 className="pb-4 text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-2xl">
            Nease Astronomy Club
          </h1>
          
          <p className="text-2xl md:text-3xl text-indigo-200/90 mb-6 tracking-[0.05em] font-light">
            Exploring the Universe Together
          </p>
          
          <p className="text-lg text-indigo-300/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join us in discovering the wonders of space, from distant galaxies to our own solar system. 
            We are a community of students passionate about science, technology, and the stars.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button to="/about">Learn More</Button>
            <Button to="/connect" variant="outline">
              Get Involved
            </Button>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="gradient" className="text-center h-full transform hover:-translate-y-2 transition-transform duration-300">
            <div className="mb-6 bg-indigo-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <TelescopeIcon className="w-10 h-10 text-indigo-300" />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              [Idea 1]
            </h3>
            <p className="text-indigo-200/80 leading-relaxed">
              [Idea 1]
            </p>
          </Card>

          <Card variant="gradient" className="text-center h-full transform hover:-translate-y-2 transition-transform duration-300">
            <div className="mb-6 bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <GalaxyIcon className="w-10 h-10 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
              [Idea 2]
            </h3>
            <p className="text-indigo-200/80 leading-relaxed">
              [Idea 2]
            </p>
          </Card>

          <Card variant="gradient" className="text-center h-full transform hover:-translate-y-2 transition-transform duration-300">
            <div className="mb-6 bg-pink-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <RocketIcon className="w-10 h-10 text-pink-300" />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-pink-300 to-orange-400 bg-clip-text text-transparent">
              Student Projects
            </h3>
            <p className="text-indigo-200/80 leading-relaxed">
              [Projects?]
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
