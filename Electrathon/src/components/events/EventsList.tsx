import React from 'react'
import type { EventItem } from '../../constants/types/EventItem'
import EventTimelineItem from './EventTimelineItem'

type RemoteEvent = EventItem & { id?: string }

interface EventsListProps {
  events: RemoteEvent[]
  loading: boolean
}

export default function EventsList({ events, loading }: EventsListProps) {
  return (
    <>
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
    </>
  )
}