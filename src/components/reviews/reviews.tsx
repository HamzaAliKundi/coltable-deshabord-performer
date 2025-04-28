import React, { useState } from 'react'
import { useGetAllReviewsQuery, useFeatureReviewMutation } from '../../apis/reviews'
import Pagination from '../../common/Pagination'
import { toast } from 'react-hot-toast'

interface Review {
  _id: string;
  name: string;
  description: string;
  rating: number;
  status: string;
  isAnonymous: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewsResponse {
  docs: Review[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface ReviewCardProps {
  review: Review;
  isFirstInRow?: boolean;
  onPublish: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  isUpdating: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review,
  isFirstInRow,
  onPublish,
  onRemove,
  isUpdating
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const MAX_CHARS = 100;
  const shouldShowReadMore = review.description.length > MAX_CHARS;
  const displayText = isExpanded ? review.description : review.description.slice(0, MAX_CHARS);

  const handlePublish = async () => {
    if (review.isFeatured) return;
    setIsPublishing(true);
    try {
      await onPublish(review._id);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRemove = async () => {
    if (!review.isFeatured) return;
    setIsRemoving(true);
    try {
      await onRemove(review._id);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className={`p-6 rounded-xl relative bg-gradient-to-r from-[#0D0D0D] to-[#FF00A2]/60`}>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div>
              <h3 className="font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] tracking-[0%] align-middle uppercase text-white">
                {review.isAnonymous ? 'Anonymous' : review.name}
              </h3>
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 w-[10.8px] h-[10.8px] left-[10.8px]">★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {review.isFeatured ? (
              <>
                <button 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FF00A2]/20 text-white cursor-not-allowed"
                  disabled
                >
                  Published
                </button>
                <button 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                    isRemoving 
                      ? 'bg-gray-200 text-gray-800 cursor-wait' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                  onClick={handleRemove}
                  disabled={isRemoving || isUpdating}
                >
                  {isRemoving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </>
                  ) : 'Remove'}
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                    isPublishing 
                      ? 'bg-[#FF00A2]/20 text-white cursor-wait' 
                      : 'bg-[#FF00A2] hover:bg-[#FF00A2]/80 text-white'
                  }`}
                  onClick={handlePublish}
                  disabled={isPublishing || isUpdating}
                >
                  {isPublishing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </>
                  ) : 'Publish'}
                </button>
                <button 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700/20 text-white cursor-not-allowed"
                  disabled
                >
                  Removed
                </button>
              </>
            )}
          </div>
        </div>
        <p className="font-['Space_Grotesk'] mt-8 font-normal text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-white/80">
          {displayText}
          {shouldShowReadMore && (
            <button 
              className="text-white underline ml-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

const Reviews = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetAllReviewsQuery({ limit: 10, page });
  const [featureReview, { isLoading: isUpdating }] = useFeatureReviewMutation();

  if (isLoading) return (
    <div className="p-4 md:px-8 py-16 bg-black">
      <div className="col-span-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF00A2]"></div>
      </div>
    </div>
  );
  
  if (isError) return <div className="p-4 text-center text-red-500">Error loading reviews</div>;

  const reviewsData = data as ReviewsResponse;
  const reviews = reviewsData?.docs || [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePublish = async (id: string) => {
    try {
      await featureReview({ reviewId: id, isFeatured: true }).unwrap();
      await refetch();
      toast.success('Review published successfully');
    } catch (error) {
      toast.error('Failed to publish review');
      console.error('Error publishing review:', error);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await featureReview({ reviewId: id, isFeatured: false }).unwrap();
      await refetch();
      toast.success('Review removed successfully');
    } catch (error) {
      toast.error('Failed to remove review');
      console.error('Error removing review:', error);
    }
  };

  return (
    <div className="p-4 md:px-8 py-16 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {reviews.map((review: Review, index: number) => (
          <ReviewCard 
            key={review._id} 
            review={review}
            isFirstInRow={index % 2 === 0} 
            onPublish={handlePublish}
            onRemove={handleRemove}
            isUpdating={isUpdating}
          />
        ))}
      </div>
      
      {reviews.length === 0 && (
        <div className="text-center text-white mt-8">No reviews found</div>
      )}
      
      <div className="mt-8">
        <Pagination 
          currentPage={reviewsData?.page || 1}
          totalPages={reviewsData?.totalPages || 1}
          isLoading={isLoading || isUpdating}
          onPageChange={handlePageChange}
          showPagination={true}
        />
      </div>
    </div>
  )
}

export default Reviews