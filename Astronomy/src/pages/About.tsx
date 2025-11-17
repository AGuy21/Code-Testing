import Card from "../components/Card";
import Container from "../components/Container";

export default function About() {
  return (
    <Container size="md" className="py-12 space-y-8">
      <h1 className="pb-4 text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
        About Page
      </h1>

      <Card variant="bordered">
        <p className="text-lg text-indigo-100/90 leading-relaxed mb-4 tracking-[0.05em]">
          Astronomy Club is used for seeing he stars
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold mb-3 bg-linear-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent tracking-[0.08em]">
            Stars
          </h3>
          <p className="text-indigo-200/80 tracking-[0.04em]">
            DSgtars are in th esky
          </p>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-3 bg-linear-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent tracking-[0.08em]">
            Planets
          </h3>
          <p className="text-indigo-200/80 tracking-[0.04em]">
            random text for template commit
          </p>
        </Card>
      </div>
    </Container>
  );
}
