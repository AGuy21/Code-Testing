import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ImageShowcase from './ImageShowcase'
import image1Url from '../../assets/images/ACH02308.jpg'
import image2Url from '../../assets/images/ACH02969.jpg'

export default function ImageShowcaseSection() {
  return (
    <section className="py-24 bg-[#0a2a20] border-t border-[#d4af37]/20">
      <Container size="xl">
        <SectionHeader title="Track Success" className="mb-12" />
        <div className="transform -skew-x-3">
          <ImageShowcase
            image1Url={image1Url}
            image1Alt="Meet The Team"
            image1Caption="Meet The Electrathon Team Prepared For Daytona"
            image2Url={image2Url}
            image2Alt="Racing At Daytona"
            image2Caption="Racing At Daytona With Our New Car In 2025"
          />
        </div>
      </Container>
    </section>
  )
}
