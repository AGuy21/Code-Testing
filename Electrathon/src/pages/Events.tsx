import { useEffect, useState } from "react";
import { fetchEventItems } from "../utils/fetchUtils";
import type { EventItem } from "../constants/types/EventItem";
import Container from "../components/ui/Container";
import EventsHeader from "../components/events/EventsHeader";
import EventsList from "../components/events/EventsList";
import CircuitBackground from "../components/animations/CircuitBackground";

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
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <Container size="lg" className="relative z-10">
        <EventsHeader />
        <CircuitBackground/>

        <EventsList events={events} loading={loading} />
      </Container>
    </div>
  );
}

