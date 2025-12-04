import Container from "../components/ui/Container";
import Card from "../components/ui/Card";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements - Engineering Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0a2a20] transform skew-x-12 translate-x-1/4 pointer-events-none border-l border-[#d4af37]/10"></div>
      
      {/* Blueprint Lines */}
      <div className="absolute top-32 left-0 w-full h-px bg-[#d4af37]/20 pointer-events-none"></div>
      <div className="absolute bottom-32 left-0 w-full h-px bg-[#d4af37]/20 pointer-events-none"></div>
      <div className="absolute top-0 left-12 w-px h-full bg-[#d4af37]/10 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 right-12 w-px h-full bg-[#d4af37]/10 pointer-events-none hidden md:block"></div>

      <Container size="lg" className="relative z-10">
        <div className="text-center mb-16 relative">
          {/* Technical Markers */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-[10px] text-[#d4af37]/40 font-mono tracking-[0.5em]">
            SEC-01 // OVERVIEW
          </div>
          
          <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#0a2a20]">
            System Information // About Us
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
            TEAM <span className="text-transparent text-stroke">ORIGIN</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-light border-l-2 border-[#d4af37] pl-4 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-4 bg-[#0a2a20]/50 backdrop-blur-sm p-4 rounded-r-lg md:rounded-lg">
            More than just a racing club — we are a collective of innovators, engineers, and problem solvers pushing the boundaries of electric mobility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card variant="cyber" className="h-full bg-[#0a2a20] border-[#d4af37]/30 relative overflow-hidden">
            {/* Blueprint Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#d4af37]/50"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#d4af37]/50"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d4af37]/50"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4af37]/50"></div>

            <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/20 pb-2">
              <h2 className="text-xl font-bold text-[#d4af37] uppercase tracking-wider">Identity</h2>
              <span className="text-xs font-mono text-white/40">ID_CODE: NEASE_01</span>
            </div>
            <p className="text-white/80 leading-relaxed mb-4 font-mono text-sm">
              The Nease Electrathon Club is a student-led organization dedicated to the design, construction, and racing of electric vehicles. 
              We bring together students from diverse backgrounds to collaborate on complex engineering challenges.
            </p>
            <p className="text-white/80 leading-relaxed font-mono text-sm">
              Our team operates like a professional racing outfit, with specialized roles in mechanical engineering, electrical systems, 
              project management, and media relations.
            </p>
          </Card>

          <Card variant="cyber" className="h-full bg-[#0a2a20] border-[#d4af37]/30 relative overflow-hidden">
             {/* Blueprint Corner Accents */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#d4af37]/50"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#d4af37]/50"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d4af37]/50"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4af37]/50"></div>

            <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/20 pb-2">
              <h2 className="text-xl font-bold text-[#d4af37] uppercase tracking-wider">Directives</h2>
              <span className="text-xs font-mono text-white/40">PRIORITY: ALPHA</span>
            </div>
            <p className="text-white/80 leading-relaxed mb-4 font-mono text-sm">
              To inspire the next generation of STEM leaders by providing hands-on experience in sustainable transportation technology.
            </p>
            <ul className="space-y-3 mt-6">
              {[
                "Promote energy efficiency and green technology",
                "Develop practical engineering and fabrication skills",
                "Foster teamwork and leadership capabilities",
                "Compete at the highest level of high school racing"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <span className="text-[#d4af37] mt-1 font-mono group-hover:translate-x-1 transition-transform">{">>"}</span>
                  <span className="text-white/80 text-sm font-mono group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#0f3d2e] opacity-20 blur-lg"></div>
          <Card variant="tech" className="p-8 md:p-12 text-center relative bg-[#0a2a20] border-[#d4af37]/40">
            <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">Initiate Sequence</h2>
            <h3 className="text-[#d4af37] font-mono text-sm mb-8">JOIN_THE_TEAM.EXE</h3>
            
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8 font-light">
              We meet weekly to work on projects, learn new skills, and prepare for competitions. 
              Whether you're interested in welding, coding, driving, or marketing, there's a place for you on our team.
            </p>
            
            <div className="inline-block p-6 bg-[#0f3d2e] border border-[#d4af37]/30 clip-corner-br relative overflow-hidden group hover:border-[#d4af37] transition-colors">
              <div className="absolute top-0 left-0 w-full h-full bg-[#d4af37]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <p className="text-[#d4af37] font-bold text-lg uppercase tracking-widest mb-1">Sync Coordinates</p>
              <p className="text-white font-mono text-xl">Thursdays</p>
              <p className="text-white/50 font-mono text-sm mt-2">After School - Panther Hall 10</p>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}

