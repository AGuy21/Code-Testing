import insta from '../assets/images/Instagram-Logo.png'

export default function Connect() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-3xl text-[#d4af37]">Connect with Electrathon!</h2>
        <p className="mt-4 text-white/85">You can find our socials where we post our achievements and updates!</p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a href="https://www.instagram.com/neaseelectrathon/p/DKvVRmBJg4g" className="inline-flex items-center gap-3 px-5 py-2 rounded-md bg-[#d4af37] text-[#0f3d2e] font-semibold hover:opacity-95">
            <img src={insta} alt="instagram" className="w-6 h-6 object-contain" />
            Visit our Instagram
          </a>
        </div>

        <section className="mt-10 bg-white/5 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#d4af37]">Sponsors</h3>
          <p className="mt-3 text-white/85">Interested in sponsoring Electrathon? We welcome support from local businesses and community partners.</p>
          <p className="mt-4">
            Contact us at{' '}
            <a href="mailto:NHSelectrothon@gmail.com" className="inline-block px-2 py-1 bg-[#d4af37] text-[#0f3d2e] font-semibold rounded">NHSelectrothon@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}
