import React from 'react'

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  isFirstInRow?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, text, isFirstInRow }) => {
  return (
    <div className={`p-6 rounded-xl relative bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D]/100 to-[#FF00A2]`}>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div>
              <h3 className="font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] tracking-[0%] align-middle uppercase text-white">{name}</h3>
              <div className="flex gap-0.5">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 w-[10.8px] h-[10.8px] left-[10.8px]">★</span>
                ))}
              </div>
            </div>
          </div>
          <button className="w-4 h-4 rounded-full border-[1px] border-white"></button>
        </div>
        <p className="font-['Space_Grotesk'] font-bold text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-white/80">
          {text}
          <button className="text-pink-500 underline ml-2">Read More</button>
        </p>
      </div>
    </div>
  )
}

const Reviews = () => {
  const reviews = [
    {
      name: "MATTHEW SPARKS",
      rating: 5,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
    {
      name: "FÉLIX THOMAS", 
      rating: 5,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
    {
      name: "MATTHEW SPARKS",
      rating: 5, 
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
    {
      name: "FÉLIX THOMAS",
      rating: 5,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
    {
      name: "MATTHEW SPARKS",
      rating: 5,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
    {
      name: "MATTHEW SPARKS",
      rating: 5,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
    {
      name: "FÉLIX THOMAS",
      rating: 5,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex gap-6">
        <button className="text-white text-lg opacity-100 border-b-2 border-[#FF00A2]">All Reviews</button>
        <button className="text-white text-lg opacity-70">Latest Reviews</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {reviews.map((review, index) => (
          <ReviewCard 
            key={index} 
            {...review} 
            isFirstInRow={index % 2 === 0} 
          />
        ))}
      </div>
      <div className="flex justify-end mt-8 gap-4">
        <button className="w-[180px] h-[48px] border border-white/20 bg-transparent text-white rounded-l-[35px]">Cancel</button>
        <button className="w-[180px] h-[48px] rounded-r-[35px] bg-[#FF00A2] text-white">Save</button>
      </div>
    </div>
  )
}

export default Reviews