export default function ContactInfoSection() {
  return (
    <div className="mt-24 pt-16 border-t border-[#d4af37]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="text-left">
          <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Contact Information</h3>
          <div className="space-y-4 text-white/80 font-light">
            <div>
              <p className="font-bold text-[#d4af37]">John Beale</p>
              <a href="mailto:John.Beale@stjohns.k12.fl.us" className="hover:text-[#d4af37] transition-colors">John.Beale@stjohns.k12.fl.us</a>
              <p className="text-sm mt-1">904-547-8300 from 7:30-9:00 AM on weekdays</p>
            </div>
            <div className="pt-4 border-t border-[#d4af37]/10">
              <p>Allen D. Nease Senior High School</p>
              <p>Stellar Academy of Engineering</p>
              <p>Transportation Technology Club</p>
            </div>
          </div>
        </div>
        
        <div className="text-left md:text-right">
          <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">School Address</h3>
          <div className="space-y-2 text-white/80 font-light">
            <p className="font-bold text-lg">ALLEN D. NEASE HIGH SCHOOL</p>
            <p>10550 Ray Road</p>
            <p>Ponte Vedra, FL 32081</p>
            <div className="pt-2 mt-2 border-t border-[#d4af37]/10 inline-block text-left md:text-right">
              <p>O 904-547-8300</p>
              <p>F 904-547-8305</p>
              <a href="https://www-nhs.stjohns.k12.fl.us" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline block mt-1">
                www-nhs.stjohns.k12.fl.us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
