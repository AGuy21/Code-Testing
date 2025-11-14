import Card from '../components/Card';
import Container from '../components/Container';
import { Colors } from '../constants/colors';

export default function About() {
  return (
    <Container size="md" className="py-12 space-y-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
        About Page
      </h1>

      <Card variant="bordered">
        <p className="text-lg text-white/90 leading-relaxed mb-4">
          Astronomy Club is used for seeing he stars
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold mb-3" style={{ color: Colors.primary }}>Stars</h3>
          <p className="text-white/80">
            DSgtars are in th esky
          </p>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-3" style={{ color: Colors.primary }}>Planets</h3>
          <p className="text-white/80">
            random text for template commit
          </p>
        </Card>

      </div>
    </Container>
  );
}
