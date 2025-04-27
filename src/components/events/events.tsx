import React, { useState } from 'react'
import CreateEvent from './create-event';
import { Link } from 'react-router-dom';
import { useGetAllEventsQuery } from '../../apis/event';
import EventsList from './EventsList';

const Events = () => {
  const [activeTab, setActiveTab] = useState('eventRequest');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: eventsData, isLoading, refetch } = useGetAllEventsQuery({ 
    limit: 10, 
    page: currentPage 
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    refetch();
  };

  const handleStatusChange = async (eventId: string, newStatus: 'approved' | 'rejected') => {
    // TODO: Implement status change API call
    console.log(`Changing status of event ${eventId} to ${newStatus}`);
    await refetch();
  };

  const filteredEvents = eventsData?.docs?.filter((event: any) => {
    if (activeTab === 'pendingRequest') return event.status === 'pending';
    if (activeTab === 'confirmRequest') return event.status === 'approved';
    return true;
  }) || [];

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      {/* Tab Navigation */}
      <div className="flex relative flex-col md:flex-row md:gap-8 mb-6 md:mb-8">
        <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "eventRequest" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("eventRequest")}
          >
            Event Request
            {activeTab === "eventRequest" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "pendingRequest" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("pendingRequest")}
          >
            Pending Request
            {activeTab === "pendingRequest" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "confirmRequest" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("confirmRequest")}
          >
            Confirm Request
            {activeTab === "confirmRequest" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
        </div>
        <div className="absolute -right-4 top-16 flex items-center gap-3 text-white lg:top-0">
          <Link to="/event/create-event" className="font-['Space_Grotesk']">Create event</Link>
          <Link to="/calendar">
            <img
              src="/events/calendar.svg"
              alt="calendar"
              className="w-8 h-8 md:w-auto md:h-auto"
            />
          </Link>
        </div>
      </div>

      <EventsList
        events={filteredEvents}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={eventsData?.totalPages || 1}
        onPageChange={handlePageChange}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default Events
