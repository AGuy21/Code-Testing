import { useEffect, useState } from 'react'
import TrophyCard from '../components/TrophyCard'
import ImageShowcase from '../components/ImageShowcase'
import StatCard from '../components/StatCard'
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
    <div className="py-16 text-white">
      <Container size="xl">
        {/* Title Section */}
        <section className="text-center mb-24 max-w-5xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#d4af37]/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Nease <span className="text-[#d4af37]">Electrathon</span> Club
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            Building the future of electric vehicle technology through hands-on engineering, 
            competitive racing, and innovative design.
          </p>
          <p className="mt-8 text-sm text-[#d4af37]/60 uppercase tracking-widest font-semibold">
            Proudly sponsored by Supermarket Solutions
          </p>
        </section>

        {/* What is Electrathon */}
        <section className="mb-24">
          <Card variant="racing" className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] mb-6">About Electrathon</h2>
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                Electrathon is a competitive electric vehicle racing program where students design, build, 
                and race electric cars. Our club combines engineering, problem-solving, 
                and teamwork to create vehicles that compete at regional and possibly national events.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <Card variant="default" className="hover:-translate-y-1">
                <h3 className="font-semibold text-[#d4af37] text-xl mb-3">Engineering & Design</h3>
                <p className="text-white/80 leading-relaxed">
                  Learn CAD, electronics, and mechanical engineering through real-world, hands-on vehicle development.
                </p>
              </Card>
              <Card variant="default" className="hover:-translate-y-1">
                <h3 className="font-semibold text-[#d4af37] text-xl mb-3">Competitive Racing</h3>
                <p className="text-white/80 leading-relaxed">
                  Compete at iconic venues against teams in the region and opposing schools.
                </p>
              </Card>
              <Card variant="default" className="hover:-translate-y-1">
                <h3 className="font-semibold text-[#d4af37] text-xl mb-3">Hands-On Learning</h3>
                <p className="text-white/80 leading-relaxed">
                  Develop practical skills in design, electrical systems, mechanical work, and project management.
                </p>
              </Card>
            </div>
          </Card>
        </section>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
          <Button to="/about" size="lg">
            Learn More About Us
          </Button>
          <Button to="/events" variant="outline" size="lg">
            View Upcoming Events
          </Button>
        </div>

        {/* Club Success Stats */}
        <section className="mb-24">
          <Card variant="gradient" className="p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              <StatCard value={stats.competitions.toString()} label="Competitions" icon="🏁" />
              <StatCard value={stats.members.toString()} label="Members" icon="👥" />
              <StatCard value={stats.projects.toString()} label="Projects" icon="⚙️" />
              <StatCard value={stats.years.toString()} label="Years Active" icon="📅" />
            </div>
          </Card>
        </section>

        {/* Image Showcase */}
        <section className="mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] mb-8 pl-4 border-l-4 border-[#d4af37]">Our Team in Action</h2>
          <ImageShowcase
            image1Url="/path/to/daytona-race.jpg"
            image1Alt="Electrathon race at Daytona"
            image1Caption="Racing at Daytona"
            image2Url="/path/to/engineering-work.jpg"
            image2Alt="Students working on the vehicle"
            image2Caption="Engineering and design work"
          />
        </section>

        {/* Trophies and Accomplishments */}
        <section className="mb-12">
          <Card variant="checkered" className="p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] mb-8 text-center">Accomplishments</h2>
            {loading ? (
              <div className="text-center text-white/60 py-12">Loading accomplishments...</div>
            ) : trophies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {trophies.map((trophy) => (
                  <TrophyCard key={trophy.id} trophy={trophy} />
                ))}
              </div>
            ) : (
              <div className="text-center text-white/60 py-12">
                No accomplishments to display yet.
              </div>
            )}
          </Card>
        </section>
      </Container>
    </div>
  )
}

