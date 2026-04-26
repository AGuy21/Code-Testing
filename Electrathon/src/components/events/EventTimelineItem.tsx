import Button from '../ui/Button';
import type { EventItem } from '../../constants/types/EventItem';

interface EventTimelineItemProps {
  event: EventItem;
}

export default function EventTimelineItem({ event }: EventTimelineItemProps) {
  const query = encodeURIComponent(`${event.location}, Florida`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  const parseEventTime = (time: string) => {
    const rawTime = time.split('-')[0].trim();
    const match = rawTime.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
    if (!match) return { hours: 12, minutes: 0 };

    let hour = Number(match[1]);
    const minutes = Number(match[2] || '0');
    const period = match[3].toUpperCase();

    if (hour === 12) {
      hour = period === 'AM' ? 0 : 12;
    } else if (period === 'PM') {
      hour += 12;
    }

    return { hours: hour, minutes };
  };

  const parseEventDate = () => {
    const dateString = event.date.trim();
    if (/^every /i.test(dateString)) return null;

    const monthNames: Record<string, number> = {
      Jan: 0,
      January: 0,
      Feb: 1,
      February: 1,
      Mar: 2,
      March: 2,
      Apr: 3,
      April: 3,
      May: 4,
      Jun: 5,
      June: 5,
      Jul: 6,
      July: 6,
      Aug: 7,
      August: 7,
      Sep: 8,
      Sept: 8,
      September: 8,
      Oct: 9,
      October: 9,
      Nov: 10,
      November: 10,
      Dec: 11,
      December: 11,
    };

    const weekdayPattern = /^[A-Za-z]{3}\s+([A-Za-z]{3,9})\s+(\d{1,2})(?:st|nd|rd|th)?,\s*(\d{4})$/;
    const simplePattern = /^([A-Za-z]{3,9})\s+(\d{1,2}),\s*(\d{4})$/;

    let monthName: string | undefined;
    let dayString: string | undefined;
    let yearString: string | undefined;

    const weekdayMatch = dateString.match(weekdayPattern);
    const simpleMatch = dateString.match(simplePattern);

    if (weekdayMatch) {
      monthName = weekdayMatch[1];
      dayString = weekdayMatch[2];
      yearString = weekdayMatch[3];
    } else if (simpleMatch) {
      monthName = simpleMatch[1];
      dayString = simpleMatch[2];
      yearString = simpleMatch[3];
    } else {
      return null;
    }

    const monthIndex = monthNames[monthName as keyof typeof monthNames];
    if (monthIndex === undefined || !dayString || !yearString) return null;

    const day = Number(dayString);
    const year = Number(yearString);
    const { hours, minutes } = parseEventTime(event.time);
    const parsedDate = new Date(year, monthIndex, day, hours, minutes);

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const isRecurringEvent = /^every /i.test(event.date.trim());
  const eventDateTime = parseEventDate();
  const past = !isRecurringEvent && eventDateTime !== null && eventDateTime < new Date();

  return (
    <div className={`group relative border-l-2 border-[#d4af37]/20 pl-6 md:pl-10 py-4 hover:border-[#d4af37] transition-colors duration-300 ${past ? 'opacity-50' : ''}`}>
      {/* Timeline Dot */}
      <div className={`absolute top-6 left-[-5px] w-2 h-2 rounded-full transition-colors ${event.type === 'Practice' ? 'bg-white/20 border-white/40' : 'bg-[#0f3d2e] border border-[#d4af37] group-hover:bg-[#d4af37]'}`}></div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="md:w-1/4">
          <div className="text-[#d4af37] font-mono text-sm mb-1">{event.date}</div>
          <div className="text-white/50 text-xs font-mono">{event.time}</div>
          {event.type && (
            <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] uppercase tracking-wider border ${event.type === 'Practice' ? 'border-white/20 text-white/40' : 'border-[#d4af37]/30 text-[#d4af37]'}`}>
              {event.type}
            </span>
          )}
        </div>
        
        <div className="md:w-2/4">
          <div className="flex items-center gap-4 mb-2">
            {event.logoUrl && (
              <img src={event.logoUrl} alt="Event Logo" className="w-8 h-8 object-contain opacity-80" />
            )}
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight group-hover:text-[#d4af37] transition-colors">
              {event.title}
              <span className="inline-flex items-center gap-2 ml-3 text-[11px] uppercase tracking-[0.35em] font-semibold">
                {isRecurringEvent && (
                  <span className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2 py-1 text-sky-300">
                    Recurring
                  </span>
                )}
                {past && (
                  <span className="rounded-full border border-red-500/50 bg-red-500/30 px-2 py-1 text-red-500">
                    Past Event
                  </span>
                )}
              </span>
            </h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed font-light mb-3">
            {event.description}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <span>LOC:</span>
            <span className="text-white/60">{event.location}, FL</span>
          </div>
          {event.trackLayoutUrl && (
            <div className="mt-4 p-2 border border-white/10 bg-black/20 inline-block">
              <p className="text-[10px] text-[#d4af37] mb-1 uppercase">Track Layout</p>
              <img src={event.trackLayoutUrl} alt="Track Layout" className="h-24 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        <div className="md:w-1/4 flex md:justify-end items-start">
          <Button
            href={mapsUrl}
            variant="outline"
            size="sm"
            className={`border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-mono text-xs uppercase tracking-widest transition duration-200 ${past ? 'opacity-60' : ''}`}
          >
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
}