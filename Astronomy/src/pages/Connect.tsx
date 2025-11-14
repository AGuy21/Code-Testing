import Card from '../components/Card';
import Container from '../components/Container';

export default function Connect() {
  return (
    <Container size="md" className="py-12 space-y-8">
      <h1 className="pb-4 text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
        Connect Page
      </h1>

      <Card variant="bordered" className="text-center">
        <p className="text-xl text-indigo-100/90 mb-6 tracking-[0.06em]">
          Join us!
        </p>
        <p className="text-indigo-200/70 tracking-[0.04em]">
          We cool
        </p>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent tracking-[0.08em]">Additional Information</h3>
        <p className="text-indigo-200/70 text-center tracking-[0.04em]">
          We need sponsers fr
        </p>
      </Card>
    </Container>
  );
}
