import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import TrophyCard from '../components/TrophyCard'
import ImageShowcase from '../components/ImageShowcase'
import StatCard from '../components/StatCard'
import type { Trophy } from '../constants/types/Trophy'

export default function Home() {
  const [trophies, setTrophies] = useState<Trophy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'trophies'))
        const trophyData: Trophy[] = []
        querySnapshot.forEach((doc) => {
          trophyData.push({ id: doc.id, ...doc.data() } as Trophy)
        })
        // Sort by year descending
        trophyData.sort((a, b) => b.year - a.year)
        setTrophies(trophyData)
      } catch (error) {
        console.error('Error fetching trophies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrophies()
  }, [])
  return (
    <div className="py-12 text-white">
      <div className="p-responsive max-w-4xl mx-auto p-6">
        <section className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#d4af37]">Nease Electrathon Club</h2>
          <p className="mt-4 text-lg text-white/90">
            We build, learn, and compete in electronics and robotics. Join students who are passionate about electronics,
            programming, and hands-on problem solving.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#/about" className="px-5 py-2 rounded-md bg-[#d4af37] text-[#0f3d2e] font-semibold hover:opacity-95">Learn more</a>
            <Link to="/events" className="px-5 py-2 rounded-md border border-white/20 text-white hover:bg-white/5">Events</Link>
          </div>

          <p className="mt-8 text-sm text-white/50 italic">
            Proudly sponsored by Supermarket Solutions
          </p>
        </section>

        {/* Club Success Stats */}
        <section className="mt-12 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-lg p-6 border border-[#d4af37]/20">
          <h3 className="text-2xl font-semibold text-[#d4af37] text-center mb-6">Our Success</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="1+" label="Competitions Won" icon="🏆" />
            <StatCard value="20+" label="Active Members" icon="👥" />
            <StatCard value="5+" label="Years Running" icon="📅" />
            <StatCard value="25+" label="Projects Built" icon="⚙️" />
          </div>
        </section>

        {/* Trophies and Accomplishments */}
        <section className="mt-12 bg-white/5 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-[#d4af37] mb-6">Trophies & Accomplishments</h3>
          {loading ? (
            <div className="text-center text-white/60 py-8">Loading accomplishments...</div>
          ) : trophies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trophies.map((trophy) => (
                <TrophyCard key={trophy.id} trophy={trophy} />
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60 py-8">
              No accomplishments to display yet. Check back soon!
            </div>
          )}
        </section>

        {/* Image Showcase */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold text-[#d4af37] mb-6">In Action</h3>
          <ImageShowcase
            image1Url="/path/to/daytona-race.jpg"
            image1Alt="Electrathon race at Daytona"
            image1Caption="Racing at Daytona International Speedway"
            image2Url="/path/to/engineering-work.jpg"
            image2Alt="Students working on the vehicle"
            image2Caption="Active engineering and design work"
          />
        </section>

        <section className="mt-12 bg-white/5 rounded-lg p-4 sm:p-6">
          <h3 className="text-2xl font-semibold text-[#d4af37]">What is Electrathon?</h3>
          <p className="mt-3 text-white/90">
            Electrathon is our school's electronics and robotics club. We design circuits, build robots, and
            participate in competitions and workshops that teach practical skills in hardware and software.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/3 rounded">
              <h4 className="font-semibold text-[#d4af37]">Projects</h4>
              <p className="mt-2 text-sm text-white/80">Student-led builds: sensors, microcontrollers, and autonomous bots.</p>
            </div>
            <div className="p-4 bg-white/3 rounded">
              <h4 className="font-semibold text-[#d4af37]">Workshops</h4>
              <p className="mt-2 text-sm text-white/80">Hands-on sessions on soldering, microcontrollers, and embedded systems.</p>
            </div>
            <div className="p-4 bg-white/3 rounded">
              <h4 className="font-semibold text-[#d4af37]">Competitions</h4>
              <p className="mt-2 text-sm text-white/80">Compete regionally or nationally in robotics and electronics challenges.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
