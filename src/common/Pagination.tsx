interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  showPagination?: boolean;
}

const Pagination = ({ currentPage, totalPages, isLoading = false, onPageChange, showPagination = true }: PaginationProps) => {
  if (!showPagination) return null;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pages.push(
        <span
          key={i}
          onClick={() => !isLoading && onPageChange(i)}
          className={`font-space-grotesk font-bold cursor-pointer ${
            i === currentPage 
              ? "text-[24px] leading-[40px] text-white" 
              : "text-base leading-[40px] text-[#BEBEBE]"
          } tracking-[0.6px] uppercase`}
        >
          {i.toString().padStart(2, '0')}
        </span>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      <button 
        className={`flex items-center space-x-2 ${currentPage === 1 ? 'text-gray-500' : 'text-white'}`}
        onClick={() => !isLoading && currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src="/events/left.svg" alt="Previous" className="w-[7.5px] h-[13.5px]" />
        <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase">
          PREV
        </span>
      </button>

      <div className="flex items-center space-x-4 min-w-[100px] justify-center">
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          renderPageNumbers()
        )}
      </div>

      <button 
        className={`flex items-center space-x-2 ${currentPage === totalPages ? 'text-gray-500' : 'text-white'}`}
        onClick={() => !isLoading && currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase">
          NEXT
        </span>
        <img src="/events/right.svg" alt="Next" className="w-[7.5px] h-[13.5px]" />
      </button>
    </div>
  );
};

export default Pagination;