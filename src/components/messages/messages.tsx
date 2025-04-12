import React from 'react';
import { MessageSquare } from 'lucide-react';

const Messages = (image: boolean) => {
  return (
    <div className="p-4 md:px-8 py-8 md:py-16 bg-black min-h-[75vh]">
      <div className="w-full max-w-[1029px] bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/80 to-[#FF00A2] rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-0">
          {/* Left section with avatar and message info */}
          <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
            <div className="ml-2">
              <div className="w-18 h-18 rounded-full overflow-hidden border-white">
                {image ? <img src="/messages/messages.svg" alt="Profile" className="w-full h-full object-cover" /> : <MessageSquare className="w-full h-full text-gray-400" />}
              </div>
            </div>
            <div className="hidden md:block w-[2px] h-16 bg-white/50 mx-4"></div>
          </div>
          
          {/* Middle section split in two equal parts */}
          <div className="flex flex-col md:flex-row flex-1 justify-between items-center px-2 md:px-6 py-2 md:py-4 space-y-4 md:space-y-0">
            <div className="text-white w-full md:w-1/2 flex items-center">
              <p className="font-['Space_Grotesk'] font-normal text-[16px] md:text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-[#D2D2D2] text-center md:text-left">
                You Have Received Message Form User
              </p>
            </div>
            <div className="hidden md:block w-[2px] h-16 bg-white/50 mx-4"></div>
            <div className="text-white w-full md:w-1/2 md:pl-4">
              <p className="font-['Space_Grotesk'] font-normal text-[16px] md:text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-[#D2D2D2] text-center md:text-left">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
              </p>
            </div>
            <div className="hidden md:block w-[2px] h-16 bg-white/50 mx-4"></div>
          </div>
        
          {/* Right section with button */}
          <div className="w-full md:w-auto md:pr-6 mt-4 md:mt-0 flex justify-center md:justify-end">
            <button className="w-full md:w-auto bg-[#FF00A2] hover:bg-pink-600 text-white py-2 md:py-3 px-4 md:px-8 rounded-full font-medium text-sm md:text-base">
              RESPOND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;