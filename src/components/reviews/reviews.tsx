import React, { useState } from 'react'

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  isFirstInRow?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, text, isFirstInRow }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={`p-6 rounded-xl relative bg-gradient-to-r from-[#0D0D0D] to-[#FF00A2]/60`}>
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
          <button 
            className={`w-4 h-4 rounded-full border-[1px] border-white flex items-center justify-center ${isChecked ? 'bg-[#FF00A2]' : ''}`}
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked && <div className="w-2 h-2 rounded-full bg-white"></div>}
          </button>
        </div>
        <p className="font-['Space_Grotesk'] mt-8 font-normal text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-white/80">
          {text}
          <button className="text-white underline ml-2">Read More</button>
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
    <div className="p-4 md:px-8 py-16 bg-black">
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