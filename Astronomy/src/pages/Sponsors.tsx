import SponsorCardCarousel from '../components/animations/SponsorCardCarousel'
import Container from '../components/Container'

export default function Sponsors() {
    
  return (
    <Container size="md" >
        <div className="py-12 text-center">Sponsors</div>

        <SponsorCardCarousel />
    </Container>
  )
}
