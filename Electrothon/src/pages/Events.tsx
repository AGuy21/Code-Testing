import { eventItems } from "../constants/data/eventItems";

export default function Events() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-3xl text-[#d4af37]">Events</h2>
        <p className="mt-4 text-white/85">Check out our upcoming events and workshops.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventItems.map((event, index) => (
            <div key={index} className="p-4 bg-white/5 rounded">
              <h3 className="font-semibold text-lg text-[#d4af37]">{event.title}</h3>
              <p className="text-white/85">{event.date} — {event.time}</p>
              <p className="text-white/85">{event.description}</p>
              <p className="text-white/85">{event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
