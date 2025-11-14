import Button from "../components/Button";
import Container from "../components/Container";

export default function Home() {

  return (
    <div className="py-12 space-y-12">
      <Container size="md" className="text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
          Nease Astronomy Club
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8">Home Page</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button to="/about">About</Button>
          <Button to="/connect" variant="outline">
            Connect
          </Button>
        </div>
      </Container>
    </div>
  );
}
