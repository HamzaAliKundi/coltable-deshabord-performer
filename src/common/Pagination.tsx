const Pagination = () => {
    return (
      <div className="flex items-center justify-center space-x-6">
        {/* Prev Button */}
        <button className="flex items-center space-x-2 text-white">
          <img 
            src="/events/left.svg" 
            alt="Previous" 
            className="w-4 h-4"
          />
          <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase">
            PREV
          </span>
        </button>
  
        {/* Page Numbers */}
        <div className="flex items-center space-x-4">
          <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase text-[#BEBEBE]">
            01
          </span>
          <span className="font-space-grotesk font-bold text-[24px] leading-[40px] tracking-[0.6px] uppercase text-white">
            02
          </span>
          <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase text-[#BEBEBE]">
            03
          </span>
        </div>
  
        {/* Next Button */}
        <button className="flex items-center space-x-2 text-white">
          <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase">
            NEXT
          </span>
          <img 
            src="/events/right.svg" 
            alt="Next" 
            className="w-4 h-4"
          />
        </button>
      </div>
    );
  };
  
  export default Pagination;