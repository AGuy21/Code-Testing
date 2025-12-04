import insta from '../assets/images/Instagram-Logo.png'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Connect() {
  return (
    <div className="pt-32 pb-16 text-white">
      <Container size="lg">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Connect with <span className="text-[#d4af37]">Electrathon</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Follow our journey, support our team, or get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="gradient" className="text-center p-8 md:p-12 flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <img src={insta} alt="Instagram" className="w-10 h-10 object-contain invert" />
            </div>
            <h2 className="text-2xl font-bold text-[#d4af37] mb-4">Follow Us</h2>
            <p className="text-white/85 mb-8 max-w-sm">
              Check out our latest race photos, build updates, and team announcements on Instagram.
            </p>
            <Button 
              href="https://www.instagram.com/neaseelectrathon/" 
              variant="primary"
              className="w-full sm:w-auto"
            >
              Visit our Instagram
            </Button>
          </Card>

          <Card variant="checkered" className="text-center p-8 md:p-12 flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 text-4xl">
              🤝
            </div>
            <h2 className="text-2xl font-bold text-[#d4af37] mb-4">Sponsorships</h2>
            <p className="text-white/85 mb-8 max-w-sm">
              Interested in sponsoring Electrathon? We welcome support from local businesses and community partners to help us race faster and learn more.
            </p>
            <Button 
              href="mailto:NHSelectrothon@gmail.com" 
              variant="outline"
              className="w-full sm:w-auto"
            >
              Email Us to Sponsor
            </Button>
          </Card>
        </div>

        <div className="mt-12">
          <Card variant="default" className="p-8 text-center">
            <h3 className="text-xl font-bold text-[#d4af37] mb-2">General Inquiries</h3>
            <p className="text-white/70 mb-4">Have a question about the club or how to join?</p>
            <a 
              href="mailto:NHSelectrothon@gmail.com" 
              className="text-lg font-semibold text-white hover:text-[#d4af37] transition-colors border-b border-[#d4af37]/30 hover:border-[#d4af37]"
            >
              NHSelectrothon@gmail.com
            </a>
          </Card>
        </div>
      </Container>
    </div>
  )
}

