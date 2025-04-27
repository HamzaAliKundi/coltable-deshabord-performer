import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventDetail from '../../components/events/event-detail';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">Invalid event ID</p>
      </div>
    );
  }

  return (
    <div className="bg-black p-4 md:p-8">
      <button 
        onClick={() => navigate('/events')}
        className="mb-4 text-white hover:text-[#FF00A2] flex items-center gap-2"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Events
      </button>
      <EventDetail eventId={id} />
    </div>
  );
};

export default EventDetailPage; 