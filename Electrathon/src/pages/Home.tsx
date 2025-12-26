import { useEffect, useState } from 'react'
import { fetchTrophiesAndStats } from '../utils/fetchUtils'
import type { Stats } from '../constants/types/Stats'
import type { Trophy } from '../constants/types/Trophy'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import StatsSection from '../components/home/StatsSection'
import ImageShowcaseSection from '../components/home/ImageShowcaseSection'
import TrophySection from '../components/home/TrophySection'

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
      <HeroSection />
      <AboutSection />
      <StatsSection stats={stats} />
      <ImageShowcaseSection />
      <TrophySection trophies={trophies} loading={loading} />
    </div>
  )
}


