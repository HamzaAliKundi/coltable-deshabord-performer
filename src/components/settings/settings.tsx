import React from 'react'

const Settings = () => {
  return (
    <div className="p-8 mb-12">
      <div className="mb-8">
        <h2 className="font-space-grotesk text-base text-white font-normal leading-none">Notifications & Alerts</h2>
        
        <div className="mb-4 ml-8 mt-8">
          <label className="block font-space-grotesk text-base text-[#A4A4A4] mb-2">
            Email Notifications
          </label>
          <div className="relative">
            <select className="w-[210px] h-[40px] rounded-[35px] border border-white/20 bg-transparent text-white px-4 py-2 appearance-none focus:outline-none">
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
            <div className="absolute inset-y-0 left-[180px] flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-4 ml-8">
          <label className="block font-space-grotesk text-base text-[#A4A4A4] mb-2">
            Alert Preferences
          </label>
          <div className="relative">
            <select className="w-[210px] h-[40px] rounded-[35px] border border-white/20 bg-transparent text-white px-4 py-2 appearance-none focus:outline-none">
              <option value="real-time">Real-Time</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <div className="absolute inset-y-0 left-[180px] flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-space-grotesk mt-12 text-base text-white font-normal leading-none">Support & Feedback</h2>
        <div className="flex flex-col gap-1 mt-8 ml-8">
          <a href="#" className="font-space-grotesk text-base text-[#A4A4A4]">Contact Support</a>
          <a href="#" className="font-space-grotesk text-base text-[#A4A4A4]">Report a Bug</a>
          <a href="#" className="font-space-grotesk text-base text-[#A4A4A4]">Feature Requests</a>
          <a href="#" className="font-space-grotesk text-base text-[#A4A4A4]">Support & Feedback</a>
        </div>
      </div>
    </div>
  )
}

export default Settings
