import { useEffect, useState } from 'react'
import TrophyCard from '../components/TrophyCard'
import ImageShowcase from '../components/ImageShowcase'
import { fetchTrophiesAndStats, type Stats, type Trophy } from '../constants/data/statsData'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Home() {
  const [trophies, setTrophies] = useState<Trophy[]>([])
  const [stats, setStats] = useState<Stats>({ competitions: 0, members: 0, projects: 0, years: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTrophiesAndStats()
      setTrophies(data.trophies)
      setStats(data.stats)
      setLoading(false)
    }

    loadData()
  }, [])
  
  return (
    <div className="text-white overflow-hidden">
      {/* Hero Section - Full Width with Skew */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#0f3d2e] z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[#0a2a20] transform skew-x-12 translate-x-1/4 z-0 border-l-4 border-[#d4af37]/20"></div>
        
        <Container size="xl" className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1 mb-6 border border-[#d4af37] text-[#d4af37] text-sm font-mono tracking-widest uppercase bg-[#d4af37]/10 clip-corner-br">
              System Online // Ready to Race
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 leading-none">
              NEASE <br />
              <span className="text-transparent text-stroke hover:text-[#d4af37] transition-colors duration-300">ELECTRATHON</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-10 font-light border-l-4 border-[#d4af37] pl-6">
              Pushing the limits of electric vehicle engineering. <br />
              <span className="text-[#d4af37] font-semibold">Design. Build. Race. Win.</span>
            </p>
            <div className="flex flex-wrap gap-6">
              <Button to="/about" size="lg" className="clip-corner-br bg-[#d4af37] text-black font-bold hover:bg-white hover:text-black transition-all">
                Initialize Mission
              </Button>
              <Button to="/events" variant="outline" size="lg" className="clip-corner-br border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10">
                Race Schedule
              </Button>
            </div>
          </div>
        </Container>

        {/* Decorative "Track" Line */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>

      {/* About Section - Dark Tech Vibe */}
      <section className="py-24 bg-[#0a2a20] relative border-t border-[#d4af37]/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-block px-2 py-1 mb-4 border-l-2 border-[#d4af37] text-[#d4af37] text-xs font-mono uppercase tracking-widest bg-[#d4af37]/5">
                System Architecture
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white uppercase tracking-tight">
                The Machine <br />
                <span className="text-[#d4af37] text-2xl md:text-3xl normal-case opacity-90 font-mono">Behind the Mission</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed font-light">
                Electrathon isn't just a club. It's a high-performance engineering team. We combine mechanical precision, electrical mastery, and strategic planning to dominate the track.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#0f3d2e] border border-[#d4af37]/20 clip-corner-br hover:border-[#d4af37] transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📐</span>
                  <div>
                    <h4 className="font-bold text-white font-mono uppercase text-sm">Precision Engineering</h4>
                    <p className="text-xs text-[#d4af37]/70">CAD Design & Fabrication</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#0f3d2e] border border-[#d4af37]/20 clip-corner-br hover:border-[#d4af37] transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">⚡</span>
                  <div>
                    <h4 className="font-bold text-white font-mono uppercase text-sm">Power Systems</h4>
                    <p className="text-xs text-[#d4af37]/70">Advanced Battery Tech</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#0f3d2e] border border-[#d4af37]/20 clip-corner-br hover:border-[#d4af37] transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">🏎️</span>
                  <div>
                    <h4 className="font-bold text-white font-mono uppercase text-sm">Race Strategy</h4>
                    <p className="text-xs text-[#d4af37]/70">Data-Driven Performance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="cyber" className="h-full bg-[#0f3d2e] border-[#d4af37]/30">
                  <h3 className="text-[#d4af37] font-mono text-xs mb-2 border-b border-[#d4af37]/20 pb-1 inline-block">MODULE 01</h3>
                  <h4 className="text-xl font-bold mb-4 text-white">Engineering</h4>
                  <p className="text-white/70 text-sm font-light">
                    Master industry-standard tools and techniques. From welding to wiring, you build it all.
                  </p>
                </Card>
                <Card variant="cyber" className="h-full md:translate-y-12 bg-[#0f3d2e] border-[#d4af37]/30">
                  <h3 className="text-[#d4af37] font-mono text-xs mb-2 border-b border-[#d4af37]/20 pb-1 inline-block">MODULE 02</h3>
                  <h4 className="text-xl font-bold mb-4 text-white">Competition</h4>
                  <p className="text-white/70 text-sm font-light">
                    Face off against top teams across the state. Strategy and endurance are key to victory.
                  </p>
                </Card>
                <Card variant="cyber" className="h-full bg-[#0f3d2e] border-[#d4af37]/30">
                  <h3 className="text-[#d4af37] font-mono text-xs mb-2 border-b border-[#d4af37]/20 pb-1 inline-block">MODULE 03</h3>
                  <h4 className="text-xl font-bold mb-4 text-white">Innovation</h4>
                  <p className="text-white/70 text-sm font-light">
                    Solve real-world problems with creative solutions. Push the boundaries of what's possible.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section - Telemetry Dashboard */}
      <section className="py-24 bg-[#0f3d2e] relative overflow-hidden border-t border-[#d4af37]/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <Container size="xl" className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#d4af37]/30 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Live Telemetry</h2>
              <p className="text-[#d4af37] font-mono text-sm mt-1">System Status: <span className="animate-pulse">OPTIMAL</span></p>
            </div>
            <div className="font-mono text-xs text-[#d4af37]/60 mt-4 md:mt-0 border border-[#d4af37]/30 px-2 py-1 rounded">
              DATA_STREAM_ID: 8849-ALPHA
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card variant="tech" className="text-center py-8 bg-[#0a2a20] border-[#d4af37]/20">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 glitch-hover">{stats.competitions}</div>
              <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Races Run</div>
            </Card>
            <Card variant="tech" className="text-center py-8 bg-[#0a2a20] border-[#d4af37]/20">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 glitch-hover">{stats.members}</div>
              <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Active Crew</div>
            </Card>
            <Card variant="tech" className="text-center py-8 bg-[#0a2a20] border-[#d4af37]/20">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 glitch-hover">{stats.projects}</div>
              <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Vehicles Built</div>
            </Card>
            <Card variant="tech" className="text-center py-8 bg-[#0a2a20] border-[#d4af37]/20">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 glitch-hover">{stats.years}</div>
              <div className="text-[#d4af37] text-xs uppercase tracking-widest font-mono">Years Dominating</div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Image Showcase - Skewed Gallery */}
      <section className="py-24 bg-[#0a2a20] border-t border-[#d4af37]/20">
        <Container size="xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center uppercase italic">
            Track <span className="text-[#d4af37]">Highlights</span>
          </h2>
          <div className="transform -skew-x-3">
            <ImageShowcase
              image1Url="/path/to/daytona-race.jpg"
              image1Alt="Electrathon race at Daytona"
              image1Caption="Racing at Daytona"
              image2Url="/path/to/engineering-work.jpg"
              image2Alt="Students working on the vehicle"
              image2Caption="Engineering and design work"
            />
          </div>
        </Container>
      </section>

      {/* Trophies - Podium Style */}
      <section className="py-24 bg-[#0f3d2e] relative border-t border-[#d4af37]/20">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0a2a20] to-transparent"></div>
        <Container size="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-4 uppercase tracking-widest">Hall of Fame</h2>
            <div className="w-32 h-1 bg-[#d4af37] mx-auto relative">
              <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-white/50"></div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-white/60 py-12 font-mono">LOADING_TROPHY_DATA...</div>
          ) : trophies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trophies.map((trophy) => (
                <TrophyCard key={trophy.id} trophy={trophy} />
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60 py-12 font-mono border border-white/10 rounded">
              NO_DATA_FOUND
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}


