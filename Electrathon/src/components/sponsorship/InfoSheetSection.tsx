import Button from '../ui/Button'
import sponsorshipPdf from '../../assets/Electrathon Sponsorship info sheet.pdf'

export default function InfoSheetSection() {
  return (
    <div className="mb-24">
      <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-8 rounded-lg text-center max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-4 uppercase">Sponsorship Info</h3>
        <p className="text-white/70 mb-6">
          Download our detailed sponsorship information sheet to learn more about how you can support the team and the benefits of each tier.
        </p>
        <Button 
          href={sponsorshipPdf} 
          download="Electrathon Sponsorship Info Sheet.pdf"
          className="bg-[#d4af37] text-black font-bold hover:bg-white w-full md:w-auto text-center"
        >
          Download Info Sheet (PDF)
        </Button>
      </div>
    </div>
  )
}
