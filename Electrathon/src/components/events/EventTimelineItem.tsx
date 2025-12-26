import React from 'react';
import Button from '../ui/Button';
import type { EventItem } from '../../constants/types/EventItem';

interface EventTimelineItemProps {
  event: EventItem;
}

export default function EventTimelineItem({ event }: EventTimelineItemProps) {
  const query = encodeURIComponent(`${event.location}, Florida`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="group relative border-l-2 border-[#d4af37]/20 pl-6 md:pl-10 py-4 hover:border-[#d4af37] transition-colors duration-300">
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

        <div className="md:w-1/4 flex justify-start md:justify-end items-start">
          <Button 
            href={mapsUrl}
            variant="outline"
            className="text-xs py-2 px-4 border-white/20 text-white/60 hover:border-[#d4af37] hover:text-[#d4af37]"
          >
            View Map
          </Button>
        </div>
      </div>
    </div>
  );
}