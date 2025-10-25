import insta from '../assets/images/Instagram-Logo.png'

export default function Connect() {
  return (
    <div className="py-12">
      <div className="racing-container max-w-4xl mx-auto">
        <div className="p-6 md:p-8 lg:p-10 text-center">
          <h2 className="text-3xl lg:text-4xl text-[#d4af37] mb-4">Connect with Electrathon!</h2>
          <p className="mt-4 text-white/85 text-base lg:text-lg">You can find our socials where we post our achievements and updates!</p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/neaseelectrathon/p/DKvVRmBJg4g" className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-[#d4af37] text-[#0f3d2e] font-semibold hover:bg-[#c29d2f] transition-all duration-300 shadow-lg shadow-[#d4af37]/30 hover:shadow-xl hover:shadow-[#d4af37]/40 hover:-translate-y-0.5">
              <img src={insta} alt="instagram" className="w-6 h-6 object-contain" />
              Visit our Instagram
            </a>
          </div>

          <section className="mt-10 bg-white/5 rounded-lg p-6 md:p-8 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-300">
            <h3 className="text-xl lg:text-2xl font-semibold text-[#d4af37] mb-3">Sponsors</h3>
            <p className="mt-3 text-white/85 text-base lg:text-lg">Interested in sponsoring Electrathon? We welcome support from local businesses and community partners.</p>
            <p className="mt-4 text-base lg:text-lg">
              Contact us at{' '}
              <a href="mailto:NHSelectrothon@gmail.com" className="inline-block px-3 py-1.5 bg-[#d4af37] text-[#0f3d2e] font-semibold rounded hover:bg-[#c29d2f] transition-colors">NHSelectrothon@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
