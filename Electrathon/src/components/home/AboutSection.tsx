import Container from '../ui/Container'
import TeamRoleCard from './TeamRoleCard'
import PhaseItem from './PhaseItem'

export default function AboutSection() {
  return (
    <section className="py-24 bg-[#0a2a20] relative border-t border-[#d4af37]/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-block px-2 py-1 mb-4 border-l-2 border-[#d4af37] text-[#d4af37] text-xs font-mono uppercase tracking-widest bg-[#d4af37]/5">
              Team Structure
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white uppercase tracking-tight">
              The Team <br />
              <span className="text-[#d4af37] text-2xl md:text-3xl normal-case opacity-90 font-mono">Behind the Machine</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed font-light">
              We’re a team of students who meet after school to build an electric race car, learn new skills, and prepare for races together. It’s about hands-on work, good teamwork, and having fun while doing it.
            </p>
            <div className="space-y-4">
              <TeamRoleCard 
                icon="🛠️" 
                title="Build & Learn" 
                subtitle="Hands-on fabrication and wiring" 
              />
              <TeamRoleCard 
                icon="📅" 
                title="Plan & Prep" 
                subtitle="Practice days, events, and teamwork" 
              />
              <TeamRoleCard 
                icon="⚡" 
                title="Improve Every Week" 
                subtitle="Make the car better with every meet" 
              />
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <PhaseItem 
                phase="PHASE 01" 
                title="Engineering" 
                description="Master industry-standard tools and techniques. From welding to wiring, you build it all." 
              />
              <PhaseItem 
                phase="PHASE 02" 
                title="Competition" 
                description="Face off against top teams across the state. Strategy and improvement are key to victory." 
              />
              <PhaseItem 
                phase="PHASE 03" 
                title="Innovation" 
                description="Solve real-world problems with creative solutions. Push the boundaries of what's possible." 
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
