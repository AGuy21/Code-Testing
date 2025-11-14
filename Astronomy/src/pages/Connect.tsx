import Card from '../components/Card';
import Container from '../components/Container';
import { Colors } from '../constants/colors';

export default function Connect() {
  return (
    <Container size="md" className="py-12 space-y-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
        Connect Page
      </h1>

      <Card variant="bordered" className="text-center">
        <p className="text-xl text-white/90 mb-6">
          Join us!
        </p>
        <p className="text-white/70">
          We cool
        </p>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 text-center" style={{ color: Colors.primary }}>Additional Information</h3>
        <p className="text-white/70 text-center">
          We need sponsers fr
        </p>
      </Card>
    </Container>
  );
}
