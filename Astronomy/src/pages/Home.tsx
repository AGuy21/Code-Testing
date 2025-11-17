import Button from "../components/Button";
import Container from "../components/Container";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="py-12 space-y-16">
      <Container size="md" className="text-center">
        <h1 className="pb-4 text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight">
          Nease Astronomy Club
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200/90 mb-4 tracking-[0.05em] font-light">
          Exploring the Universe Together
        </p>
        <p className="text-lg text-indigo-300/70 mb-8 max-w-2xl mx-auto">
          Join us in discovering the wonders of space, from distant galaxies to our own solar system
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button to="/about">Learn More</Button>
          <Button to="/connect" variant="outline">
            Get Involved
          </Button>
        </div>
      </Container>

      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="gradient" className="text-center">
            <div className="text-4xl mb-3">🔭</div>
            <h3 className="text-xl font-bold mb-2 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              [Example One]
            </h3>
            <p className="text-indigo-200/80 text-sm">
              [Description One]
            </p>
          </Card>

          <Card variant="gradient" className="text-center">
            <div className="text-4xl mb-3">🌌</div>
            <h3 className="text-xl font-bold mb-2 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              [Example Two]
            </h3>
            <p className="text-indigo-200/80 text-sm">
              [Description Two]
            </p>
          </Card>

          <Card variant="gradient" className="text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold mb-2 bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              [Example Three]
            </h3>
            <p className="text-indigo-200/80 text-sm">
              [Description Three]
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
