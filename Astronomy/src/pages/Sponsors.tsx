import SponsorCardCarousel from '../components/animations/SponsorCardCarousel'
import Container from '../components/Container'

export default function Sponsors() {
    
  return (
    <Container size="xl" >
        <h1 className="pb-4 text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight">
          Our Sponsors
        </h1>
        <SponsorCardCarousel />
    </Container>
  )
}
