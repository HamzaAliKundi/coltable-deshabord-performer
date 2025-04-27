import React from 'react'
import Events from '../../components/events/events'
import { useGetAllEventsQuery } from '../../apis/event'
const EventsPage = () => {
  const { data: events, isLoading } = useGetAllEventsQuery({limit: 10, page: 1});
  return (
    <div>
      <Events events={events} isLoading={isLoading} />
    </div>
  )
}

export default EventsPage
