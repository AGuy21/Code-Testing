import Button from "../components/Button";
import Container from "../components/Container";

export default function Home() {

  return (
    <div className="py-12 space-y-12">
      <Container size="md" className="text-center">
        <h1 className="pb-4 text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight">
          Nease Astronomy Club
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200/80 mb-8 tracking-[0.08em]">Home Page</p>
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
