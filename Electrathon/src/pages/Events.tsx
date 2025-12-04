import { useEffect, useState } from "react";
import { fetchEventItems } from "../constants/data/eventItems";
import type { EventItem } from "../constants/types/EventItem";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

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
    <div className="pt-32 pb-16 text-white">
      <Container size="lg">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Upcoming <span className="text-[#d4af37]">Events</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join us at our next race, workshop, or community demonstration.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white/70">Loading events...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event, index) => {
            const query = encodeURIComponent(`${event.location}, Florida`);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

            return (
              <Card 
                key={event.id ?? index} 
                variant="default" 
                className="hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-[#d4af37] pr-4">
                    {event.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold border border-[#d4af37]/20 whitespace-nowrap">
                    {event.date}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <span>🕒</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <span>📍</span>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#d4af37] transition-colors underline decoration-white/30 hover:decoration-[#d4af37]"
                    >
                      {event.location}, FL
                    </a>
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed pt-2 border-t border-white/10">
                    {event.description}
                  </p>
                </div>

                <Button 
                  href={mapsUrl} 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  Get Directions
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

