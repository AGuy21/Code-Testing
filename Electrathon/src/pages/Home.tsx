import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TrophyCard from '../components/TrophyCard'
import ImageShowcase from '../components/ImageShowcase'
import StatCard from '../components/StatCard'
import { fetchTrophiesAndStats, type Stats, type Trophy } from '../constants/data/statsData'

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
      <div className="racing-container">
        {/* Title Section */}
        <section className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">Nease Electrathon Club</h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Building the future of electric vehicle technology through hands-on engineering, 
            competitive racing, and innovative design.
          </p>
          <p className="mt-6 text-sm text-white/40">
            Proudly sponsored by Supermarket Solutions
          </p>
        </section>

        {/* What is Electrathon */}
        <section className="mb-16 bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-10 border-2 border-[#d4af37]/20 racing-border max-w-6xl mx-auto hover:border-[#d4af37]/40 transition-all duration-300">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] mb-6">About Electrathon</h2>
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-8">
            Electrathon is a competitive electric vehicle racing program where students design, build, 
            and race ultra-efficient electric cars. Our club combines engineering, problem-solving, 
            and teamwork to create vehicles that compete at regional and national events.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 border-l-4 border-l-[#d4af37] hover:border-[#d4af37]/50 hover:bg-white/10 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-semibold text-[#d4af37] text-lg mb-3">Engineering & Design</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Learn CAD, electronics, and mechanical engineering through real-world vehicle development.
              </p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 border-l-4 border-l-[#d4af37] hover:border-[#d4af37]/50 hover:bg-white/10 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-semibold text-[#d4af37] text-lg mb-3">Competitive Racing</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Compete at iconic venues like Daytona International Speedway against teams nationwide.
              </p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 border-l-4 border-l-[#d4af37] hover:border-[#d4af37]/50 hover:bg-white/10 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-semibold text-[#d4af37] text-lg mb-3">Hands-On Learning</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Develop practical skills in fabrication, electrical systems, and project management.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 max-w-3xl mx-auto">
          <a 
            href="#/about" 
            className="px-8 py-3 rounded-lg bg-[#d4af37] text-[#0f3d2e] font-semibold hover:bg-[#c29d2f] transition-all duration-300 text-center shadow-lg shadow-[#d4af37]/30 hover:shadow-xl hover:shadow-[#d4af37]/40 hover:-translate-y-0.5"
          >
            Learn More About Us
          </a>
          <Link 
            to="/events" 
            className="px-8 py-3 rounded-lg border-2 border-[#d4af37]/40 text-white hover:bg-white/10 hover:border-[#d4af37] transition-all duration-300 text-center hover:-translate-y-0.5"
          >
            View Upcoming Events
          </Link>
        </div>

        {/* Club Success Stats */}
        <section className="mb-16 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-lg p-8 lg:p-10 border-2 border-[#d4af37]/30 max-w-6xl mx-auto hover:border-[#d4af37]/50 transition-all duration-300">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <StatCard value={stats.competitions.toString()} label="Competitions" icon="🏁" />
            <StatCard value={stats.members.toString()} label="Members" icon="👥" />
            <StatCard value={stats.projects.toString()} label="Projects" icon="⚙️" />
            <StatCard value={stats.years.toString()} label="Years Active" icon="📅" />
          </div>
        </section>

        {/* Image Showcase */}
        <section className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] mb-8">Our Team in Action</h2>
          <ImageShowcase
            image1Url="/path/to/daytona-race.jpg"
            image1Alt="Electrathon race at Daytona"
            image1Caption="Racing at Daytona International Speedway"
            image2Url="/path/to/engineering-work.jpg"
            image2Alt="Students working on the vehicle"
            image2Caption="Engineering and fabrication work"
          />
        </section>

        {/* Trophies and Accomplishments */}
        <section className="mb-16 bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-10 border-2 border-[#d4af37]/20 max-w-6xl mx-auto hover:border-[#d4af37]/40 transition-all duration-300">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#d4af37] mb-8">Accomplishments</h2>
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
        </section>
      </div>
    </div>
  )
}
