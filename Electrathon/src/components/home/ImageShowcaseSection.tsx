import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ImageShowcase from './ImageShowcase'

export default function ImageShowcaseSection() {
  return (
    <section className="py-24 bg-[#0a2a20] border-t border-[#d4af37]/20">
      <Container size="xl">
        <SectionHeader title="Track Success" className="mb-12" />
        <div className="transform -skew-x-3">
          <ImageShowcase
            image1Url="../../assets/images/ACH02308.jpg"
            image1Alt="Meet The Team"
            image1Caption="Meet The Electrathon Team Prepared For Daytona"
            image2Url="../../assets/images/ACH02969.jpg"
            image2Alt="Racing At Daytona"
            image2Caption="Racing At Daytona With Our New Car In 2025"
          />
        </div>
      </Container>
    </section>
  )
}
