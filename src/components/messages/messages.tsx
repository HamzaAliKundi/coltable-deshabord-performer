import React from 'react';
import { MessageSquare } from 'lucide-react';

const Messages = (image: boolean) => {
  return (
    <div className=" p-4 md:px-8 py-16 bg-black min-h-[75vh]">
      <div className="w-full max-w-[1029px] bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/80 to-[#FF00A2] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between">
          {/* Left section with avatar and message info */}
          <div className="flex items-center">
            <div className="ml-2">
              <div className=" rounded-full overflow-hidden border-white">
                  {image ? <img src="/messages/messages.svg" alt="Profile" className="object-cover" /> : <MessageSquare className="text-gray-400" />}
              </div>
            </div>
            <div className="w-[1px] h-12 bg-white/20 mx-4"></div>
          </div>
          
          {/* Middle section split in two equal parts */}
          <div className="flex flex-1 justify-between align-center px-6 py-4">
            <div className="text-white w-1/2 flex items-center">
              <p className="font-['Space_Grotesk'] font-normal text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-[#D2D2D2]">
                You Have Received Message Form User
              </p>
            </div>
            <div className="w-[1px] bg-white/20 mx-4"></div>
            <div className="text-white w-1/2 pl-4">
              <p className="font-['Space_Grotesk'] font-normal text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-[#D2D2D2]">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
              </p>
            </div>
            <div className="w-[1px] h-12 bg-white/20 mx-4"></div>
          </div>
        
          {/* Right section with button */}
          <div className="pr-6">
            <button className="bg-[#FF00A2] hover:bg-pink-600 text-white py-3 px-8 rounded-full font-medium">
              RESPOND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;