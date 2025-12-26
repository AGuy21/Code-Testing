import Container from '../components/ui/Container'
import ConnectHeader from '../components/connect/ConnectHeader'
import InstagramSection from '../components/connect/InstagramSection'
import SponsorshipContactSection from '../components/connect/SponsorshipContactSection'
import ContactInfoSection from '../components/connect/ContactInfoSection'

export default function Connect() {
  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f3d2e]/20 to-transparent pointer-events-none"></div>

      <Container size="lg" className="relative z-10">
        <ConnectHeader />

        <div className="space-y-24">
          <InstagramSection />
          <SponsorshipContactSection />
        </div>

        <ContactInfoSection />
      </Container>
    </div>
  )
}

