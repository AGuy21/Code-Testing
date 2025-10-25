import { useEffect, useState } from "react";
import { fetchEventItems } from "../constants/data/eventItems";
import type { EventItem } from "../constants/types/EventItem";

type RemoteEvent = EventItem & { id?: string };

export default function Events() {
  const [events, setEvents] = useState<RemoteEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchEventItems()
      .then((items) => {
        if (!mounted) return;
        setEvents(items);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="py-12">
      <div className="racing-container max-w-5xl mx-auto">
        <div className="p-6 md:p-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-[#d4af37] mb-4">Events</h2>
          <p className="mt-4 text-white/85 text-base lg:text-lg">
            Check out our upcoming events and workshops.
          </p>

          {loading && <p className="mt-4 text-white/70">Loading events…</p>}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {events.map((event, index) => {
              const query = encodeURIComponent(`${event.location}, Florida`);
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

              return (
                <div key={event.id ?? index} className="p-5 bg-white/5 rounded-lg border border-white/10 border-l-4 border-l-[#d4af37] hover:border-[#d4af37]/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 text-left">
                  <h3 className="font-semibold text-lg lg:text-xl text-[#d4af37] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-white/85 text-sm mb-2">
                    {event.date} — {event.time}
                  </p>
                  <p className="text-white/85 text-sm mb-3">{event.description}</p>
                  <p className="text-white/85 text-sm">
                    Location:{" "}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4af37] underline hover:text-yellow-400 transition-colors"
                    >
                      {event.location}, FL
                    </a>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
