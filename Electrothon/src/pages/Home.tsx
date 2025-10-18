export default function Home() {
  return (
    <div className="py-12 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <section className="text-center">
          <h2 className="text-5xl font-bold text-[#d4af37]">Nease Electrothon Club</h2>
          <p className="mt-4 text-lg text-white/90">
            We build, learn, and compete in electronics and robotics. Join students who love electronics,
            programming, and hands-on problem solving.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a href="#/about" className="px-5 py-2 rounded-md bg-[#d4af37] text-[#0f3d2e] font-semibold hover:opacity-95">Learn more</a>
            <a href="#/events" className="px-5 py-2 rounded-md border border-white/20 text-white hover:bg-white/5">Events</a>
          </div>
        </section>

        <section className="mt-12 bg-white/5 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-[#d4af37]">What is Electrothon?</h3>
          <p className="mt-3 text-white/90">
            Electrothon is our school's electronics and robotics club. We design circuits, build robots, and
            participate in competitions and workshops that teach practical skills in hardware and software.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/3 rounded">
              <h4 className="font-semibold text-[#d4af37]">Projects</h4>
              <p className="mt-2 text-sm text-white/80">Student-led builds: sensors, microcontrollers, and autonomous bots.</p>
            </div>
            <div className="p-4 bg-white/3 rounded">
              <h4 className="font-semibold text-[#d4af37]">Workshops</h4>
              <p className="mt-2 text-sm text-white/80">Hands-on sessions on soldering, microcontrollers, and embedded systems.</p>
            </div>
            <div className="p-4 bg-white/3 rounded">
              <h4 className="font-semibold text-[#d4af37]">Competitions</h4>
              <p className="mt-2 text-sm text-white/80">Compete regionally or nationally in robotics and electronics challenges.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
