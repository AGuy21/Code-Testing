import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ImageShowcase from '../ImageShowcase'

export default function ImageShowcaseSection() {
  return (
    <section className="py-24 bg-[#0a2a20] border-t border-[#d4af37]/20">
      <Container size="xl">
        <SectionHeader title="Track Success" className="mb-12" />
        <div className="transform -skew-x-3">
          <ImageShowcase
            image1Url="/path/to/daytona-race.jpg"
            image1Alt="Victory at Daytona International Speedway"
            image1Caption="Daytona International Speedway - 1st Place"
            image2Url="/path/to/engineering-work.jpg"
            image2Alt="Active Engineering in the Lab"
            image2Caption="Active Engineering & Fabrication"
          />
        </div>
      </Container>
    </section>
  )
}
