import Card from "../components/Card";
import Container from "../components/Container";

export default function About() {
  return (
    <Container size="md" className="py-12 space-y-10">
      <div className="text-center">
        <h1 className="pb-4 text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          About Our Club
        </h1>
        <p className="text-lg text-indigo-200/80 max-w-2xl mx-auto">
          Cultivating the next generation of astronomers.
        </p>
      </div>

      <Card variant="bordered">
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Our Mission
        </h2>
        <p className="text-lg text-indigo-100/90 leading-relaxed tracking-[0.02em]">
          The Nease Astronomy Club brings together students passionate about space exploration and celestial discovery. 
          With community outreach, we aim to ignite curiosity about the cosmos. 
          Bringing together aspiring astronomers with a supportive environment for learning and exploration.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold mb-3 bg-linear-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            What We Do
          </h3>
          <ul className="text-indigo-200/80 space-y-2 list-disc list-inside">
            <li>Weekly Discussions</li>
            <li>Competitions in the Astronomy Feild</li>
            <li>[TBD]</li>
            <li>[TBD]</li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-3 bg-linear-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            When We Meet
          </h3>
          <p className="text-indigo-200/80 mb-3">
            Every Excel A in M104
          </p>
          <p className="text-indigo-300/70 text-sm">
            Special night observation sessions scheduled monthly during new moon phases
          </p>
        </Card>
      </div>

      <Card variant="gradient" className="text-center">
        <h3 className="text-xl font-bold mb-3 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          All Experience Levels Welcome
        </h3>
        <p className="text-indigo-200/80">
          Whether you're a seasoned astronomer or just curious about the night sky, there's a place for you in our club!
        </p>
      </Card>
    </Container>
  );
}
