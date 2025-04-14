import React, { useState } from 'react'
import CreateEvent from './create-event';
import { Link } from 'react-router-dom';

const Events = () => {
  const [activeTab, setActiveTab] = useState('eventRequest');
    
  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      {/* Tab Navigation */}
      <div className="flex relative flex-col md:flex-row md:gap-8 mb-6 md:mb-8">
        <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${activeTab === 'eventRequest' ? 'text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('eventRequest')}
          >
            Event Request
            {activeTab === 'eventRequest' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>}
          </button>
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${activeTab === 'pendingRequest' ? 'text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('pendingRequest')}
          >
            Pending Request
            {activeTab === 'pendingRequest' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>}
          </button>
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${activeTab === 'confirmRequest' ? 'text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('confirmRequest')}
          >
            Confirm Request
            {activeTab === 'confirmRequest' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>}
          </button>
          
        </div>
        <div className='absolute -right-4 top-28 md:top-16 lg:top-0'>
            <Link to="/event/create-event">
                <img src="/events/calendar.svg" alt="calendar" className="w-8 h-8 md:w-auto md:h-auto" />
            </Link>
        </div>
      </div>

      {/* Conditional Rendering Based on Tab */}
      {activeTab === 'createEvent' ? (
        <CreateEvent />
      ) : activeTab === 'eventRequest' ? (
        /* Event Card */
        <div className="bg-[#212121] mt-20 mg:mt-7 rounded-[8px] overflow-hidden w-full max-w-[600px] flex flex-col md:flex-row">
          {/* Left side - Image with date badge */}
          <div className="p-2 md:p-4">
            <img 
              src="/events/event.svg" 
              alt="Festival crowd" 
              className="w-full h-[250px] md:w-[275px] md:h-[250px] lg:w-[275] lg:h-[300px] rounded-[8px] object-cover"
            />
          </div>
          
          {/* Right side - Event details */}
          <div className="flex-1 p-3 md:p-3 flex flex-col">
            {/* Event title */}
            <h2 className="text-white font-['Space_Grotesk'] font-bold text-lg md:text-2xl capitalize mb-4 md:mb-0">
              Barcelona Food Truck Festival 2018
            </h2>

            <div className="flex flex-col gap-2 mt-2 md:mt-6 lg:mt-8">
              <div className="flex items-center gap-2">
                <img src="/events/time.svg" alt="Time" className="w-5 h-5" />
                <p className="font-['Space_Grotesk'] font-normal text-base leading-none text-white">Start 20:00pm - 22:00pm</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <img src="/events/location.svg" alt="Location" className="w-5 h-5" />
                <p className="font-['Space_Grotesk'] font-normal text-base leading-none text-white">Manhattan, New York</p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="mt-6  space-y-2 md:space-y-4">
              <button className="w-full md:w-[258px] h-[40px] md:h-[51px] bg-[#FF00A2] text-white text-[10px] md:text-base font-medium rounded-[30px]">
                VIEW DETAILS
              </button>
              <div className="flex gap-2 md:gap-3">
                <button className="w-1/2 md:w-[120px] lg:w-[140px] h-[40px] bg-[#212121] md:h-[48px] lg:h-[52px] md:border-[1px] border-[#FFFFFF] text-white text-[10px] md:text-sm lg:text-base font-normal rounded-[82px]">
                  REJECT EVENT
                </button>
                <button className="w-1/2 md:w-[120px] lg:w-[140px] h-[40px] bg-[#212121] md:h-[48px] lg:h-[52px] md:border-[1px] border-[#FFFFFF] text-white text-[10px] md:text-sm lg:text-base font-normal rounded-[82px]">
                  ACCEPT EVENT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Events
