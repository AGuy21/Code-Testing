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
    <div className="min-h-screen bg-black text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <Container size="lg" className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#d4af37]/5">
            Mission Timeline
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6">
            RACE <span className="text-transparent text-stroke">SCHEDULE</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
            Join us at our next deployment. Race days, workshops, and community demonstrations.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#d4af37] font-mono text-sm animate-pulse">LOADING_DATA_STREAM...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event, index) => {
            const query = encodeURIComponent(`${event.location}, Florida`);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

            return (
              <Card 
                key={event.id ?? index} 
                variant="tech" 
                className="flex flex-col h-full group hover:border-[#d4af37] transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                  <h3 className="font-bold text-xl text-white group-hover:text-[#d4af37] transition-colors pr-4 uppercase tracking-tight glitch-hover">
                    {event.title}
                  </h3>
                  <span className="px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs font-mono border border-[#d4af37]/20 whitespace-nowrap clip-corner-br">
                    {event.date}
                  </span>
                </div>
                
                <div className="space-y-4 mb-6 flex-grow">
                  <div className="flex items-center gap-3 text-white/60 text-sm font-mono">
                    <span className="text-[#d4af37]">T-MINUS:</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-sm font-mono">
                    <span className="text-[#d4af37]">COORDS:</span>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors underline decoration-white/30 hover:decoration-[#d4af37]"
                    >
                      {event.location}, FL
                    </a>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed pt-4 border-t border-white/5 font-light">
                    {event.description}
                  </p>
                </div>

                <Button 
                  href={mapsUrl} 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-mono text-xs uppercase tracking-widest"
                >
                  Initialize Navigation
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

