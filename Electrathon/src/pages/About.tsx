import Container from "../components/ui/Container";
import Card from "../components/ui/Card";

export default function About() {
  return (
    <div className="pt-32 pb-16 text-white">
      <Container size="lg">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="text-[#d4af37]">Electrathon</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            More than just a racing club — we are a team of innovators, engineers, and problem solvers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card variant="racing" className="h-full">
            <h2 className="text-2xl font-bold text-[#d4af37] mb-4">Who We Are</h2>
            <p className="text-white/85 leading-relaxed mb-4">
              The Nease Electrathon Club is a student-led organization dedicated to the design, construction, and racing of electric vehicles. 
              We bring together students from diverse backgrounds to collaborate on complex engineering challenges.
            </p>
            <p className="text-white/85 leading-relaxed">
              Our team operates like a professional racing outfit, with specialized roles in mechanical engineering, electrical systems, 
              project management, and media relations.
            </p>
          </Card>

          <Card variant="checkered" className="h-full">
            <h2 className="text-2xl font-bold text-[#d4af37] mb-4">Our Mission</h2>
            <p className="text-white/85 leading-relaxed mb-4">
              To inspire the next generation of STEM leaders by providing hands-on experience in sustainable transportation technology.
            </p>
            <ul className="space-y-3 mt-6">
              {[
                "Promote energy efficiency and green technology",
                "Develop practical engineering and fabrication skills",
                "Foster teamwork and leadership capabilities",
                "Compete at the highest level of high school racing"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#d4af37] mt-1">➜</span>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card variant="gradient" className="p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-[#d4af37] mb-6">Join The Team</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
            We meet weekly to work on projects, learn new skills, and prepare for competitions. 
            Whether you're interested in welding, coding, driving, or marketing, there's a place for you on our team.
          </p>
          <div className="inline-block p-4 rounded-lg bg-white/5 border border-[#d4af37]/30">
            <p className="text-[#d4af37] font-semibold text-lg">Meeting Times</p>
            <p className="text-white/90">Tuesdays & Thursdays • 4:00 PM - 5:30 PM</p>
            <p className="text-white/70 text-sm mt-1">Room M104 (Engineering Lab)</p>
          </div>
        </Card>
      </Container>
    </div>
  );
}

