export default function Events() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-3xl text-[#d4af37]">Events</h2>
        <p className="mt-4 text-white/85">Check out our upcoming events and workshops.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded">Intro to Microcontrollers — Sept 20</div>
          <div className="p-4 bg-white/5 rounded">Robotics Build Night — Oct 4</div>
        </div>
      </div>
    </div>
  )
}
