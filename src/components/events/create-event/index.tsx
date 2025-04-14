import React from 'react'

const CreateEvent = () => {
  return (
    <div className="p-4 md:px-8 py-16 bg-black">
      <div className="w-[100px] my-3 h-[4px] rounded-lg bg-[#FF00A2]"></div>
      <h1 className="text-white text-3xl font-space-grotesk mb-8">CREATE EVENT</h1>
      
      <form className="flex flex-col gap-6">
        {/* First row - two columns on desktop, one on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Name*
            </label>
            <input 
              type="text"
              placeholder="Event Name..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Host*
            </label>
            <input 
              type="text"
              placeholder="Event Host Name..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Second row - full width */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-white font-space-grotesk text-sm md:text-base">
            Event type*
          </label>
          <select 
            className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500 appearance-none"
          >
            <option value="drag-show">Drag show</option>
            <option value="comedy">Comedy Show</option>
            <option value="music">Music Concert</option>
            <option value="dance">Dance Performance</option>
            <option value="theater">Theater Show</option>
            <option value="other">Other</option>
          </select>
          <div className="absolute right-3 top-[45px] pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Third row - two columns on desktop, one on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Type
            </label>
            <input 
              type="text"
              placeholder="Event Type ..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Theme
            </label>
            <input 
              type="text"
              placeholder="Event Theme..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Fourth row - two columns on desktop, one on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Start Time*
            </label>
            <input 
              type="time"
              defaultValue="00:00"
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event End Time*
            </label>
            <input 
              type="time"
              defaultValue="00:00"
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Fifth row - full width textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-space-grotesk text-sm md:text-base">
            Over view for event details
          </label>
          <textarea 
            placeholder="Type..."
            rows={6}
            className="w-full bg-[#0D0D0D] rounded-lg p-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* Radio buttons - stack vertically on mobile */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input 
                type="radio" 
                name="eventType" 
                value="public"
                defaultChecked
                className="appearance-none w-5 h-5 rounded-full border-2 border-white checked:border-white checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-white checked:before:m-[4px]"
              />
            </div>
            <span className="text-white font-space-grotesk text-sm md:text-base">Public Event</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input 
                type="radio" 
                name="eventType" 
                value="private"
                className="appearance-none w-5 h-5 rounded-full border-2 border-white checked:border-white checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-white checked:before:m-[4px]"
              />
            </div>
            <span className="text-white font-space-grotesk text-sm md:text-base">Private Event</span>
          </label>
        </div>

        {/* Submit button */}
        <button 
          type="submit"
          className="mt-4 bg-[#FF00A2] text-white font-space-grotesk text-base py-2 px-12 rounded-full hover:bg-pink-600 transition-colors w-fit ml-auto"
        >
          Submit Event
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
