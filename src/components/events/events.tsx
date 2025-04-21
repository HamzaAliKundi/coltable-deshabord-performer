import React, { useState } from 'react'
import CreateEvent from './create-event';
import { Link } from 'react-router-dom';
import Pagination from '../../common/Pagination';

const Events = () => {
  const [activeTab, setActiveTab] = useState('eventRequest');
  const [expandedTitle, setExpandedTitle] = useState<number | null>(null);
  
  const events = [
    {
      id: 1,
      title: "Barcelona Food Truck Festival 2018",
      time: "Start 20:00pm - 22:00pm",
      location: "Manhattan, New York",
      image: "/events/event.svg"
    },
    {
      id: 2,
      title: "Summer Music Festival 2023",
      time: "Start 18:00pm - 23:00pm",
      location: "Central Park, New York",
      image: "/events/event.svg"
    },
    {
      id: 3,
      title: "Tech Conference 2023",
      time: "Start 09:00am - 17:00pm",
      location: "Brooklyn Expo Center",
      image: "/events/event.svg"
    },
    {
      id: 4,
      title: "Art Exhibition Night",
      time: "Start 19:00pm - 22:00pm",
      location: "Chelsea Gallery District",
      image: "/events/event.svg"
    }
  ];
    
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

      {/* Conditional Rendering Based on Tab */}
      {activeTab === "createEvent" ? (
        <CreateEvent />
      ) : activeTab === "eventRequest" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#212121] mt-7 rounded-[8px] overflow-hidden w-full max-w-[300px] flex flex-col"
            >
              <div className="p-2">
                <img
                  src={event.image}
                  alt="Event"
                  className="w-full h-[220px] rounded-[8px] object-cover"
                />
              </div>

              <div className="p-3 flex flex-col">
                <h2
                  className="text-white font-['Space_Grotesk'] font-bold text-base capitalize mb-3 cursor-pointer"
                  onClick={() =>
                    setExpandedTitle(
                      expandedTitle === event.id ? null : event.id
                    )
                  }
                >
                  {expandedTitle === event.id
                    ? event.title
                    : event.title.length > 20
                    ? `${event.title.substring(0, 20)}...`
                    : event.title}
                </h2>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="/events/time.svg"
                      alt="Time"
                      className="w-4 h-4"
                    />
                    <p className="font-['Space_Grotesk'] font-normal text-sm leading-none text-white">
                      {event.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src="/events/location.svg"
                      alt="Location"
                      className="w-4 h-4"
                    />
                    <p className="font-['Space_Grotesk'] font-normal text-sm leading-none text-white">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button className="w-full h-[35px] bg-[#FF00A2] text-white text-xs font-medium rounded-[30px]">
                    VIEW DETAILS
                  </button>
                  <div className="flex gap-2">
                    <button className="w-1/2 h-[35px] bg-[#212121] border-[1px] border-[#FFFFFF] text-white text-xs font-normal rounded-[82px]">
                      REJECT EVENT
                    </button>
                    <button className="w-1/2 h-[35px] bg-[#212121] border-[1px] border-[#FFFFFF] text-white text-xs font-normal rounded-[82px]">
                      ACCEPT EVENT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex  mt-10 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
}

export default Events
