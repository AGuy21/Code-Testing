import { useEffect, useState } from "react";
import { fetchEventItems } from "../constants/data/eventItems";
import type { EventItem } from "../constants/types/EventItem";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import EventTimelineItem from "../components/EventTimelineItem";

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
    <div className="min-h-screen bg-[#0f3d2e] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <Container size="lg" className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase bg-[#d4af37]/5">
            Season Schedule
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
            <p className="text-[#d4af37] font-mono text-sm animate-pulse">Loading Schedule...</p>
          </div>
        )}

        <div className="space-y-8">
          {events.map((event, index) => (
            <EventTimelineItem key={event.id ?? index} event={event} />
          ))}
        </div>
      </Container>
    </div>
  );
}

