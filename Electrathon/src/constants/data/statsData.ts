import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export interface Stats {
  competitions: number
  members: number
  projects: number
  years: number
}

export interface Trophy {
  id: string
  title: string
  description: string
  year: number
  imageUrl?: string
  category: 'competition' | 'achievement' | 'recognition'
}

export const fetchTrophiesAndStats = async (): Promise<{
  trophies: Trophy[]
  stats: Stats
}> => {
  try {
    const trophiesSnapshot = await getDocs(collection(db, 'trophies'))
    const trophies: Trophy[] = []
    let stats: Stats = {
      competitions: 0,
      members: 0,
      projects: 0,
      years: 0,
    }

    trophiesSnapshot.forEach((doc) => {
      const data = doc.data()
      if (doc.id === 'Stats') {
        stats = {
          competitions: data.competitions || 0,
          members: data.members || 0,
          projects: data.projects || 0,
          years: data.years || 0,
        }
      } else {
        trophies.push({ id: doc.id, ...data } as Trophy)
      }
    })

    // Sort trophies by year descending
    trophies.sort((a, b) => b.year - a.year)

    return { trophies, stats }
  } catch (error) {
    console.error('Error fetching trophies and stats:', error)
    return {
      trophies: [],
      stats: {
        competitions: 0,
        members: 0,
        projects: 0,
        years: 0,
      },
    }
  }
}
