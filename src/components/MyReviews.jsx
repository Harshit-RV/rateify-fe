import React, {useState} from 'react'
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";



export default function MyReviews() {
  return (
    <>
<div className='grid grid-cols-3 justify-items-center items-center text-center mx-[40vh] mt-20'>

    <div className='bg-[#367C2B] rounded-lg p-[4vh] text-white w-[28vh] h-[20vh] flex flex-col items-center justify-center mx-auto'>
    <div className='font-bold text-lg'>Total Reviews</div>
    <div className='text-xl'>50</div>
    </div>

    <div className='bg-[#367C2B] rounded-lg p-[4vh] text-white w-[28vh] h-[20vh] flex flex-col items-center justify-center mx-auto'>
    <div className='font-bold text-lg'>Total Earnings</div>
    <div className='text-xl'>100$</div>
    </div>

    <div className='bg-[#367C2B] rounded-lg p-[4vh] text-white w-[28vh] h-[20vh] flex flex-col items-center justify-center mx-auto'>
    <div className='font-bold text-lg'>Redeem Earnings</div>
    <div className='text-xl'>10$</div>
    </div>

</div>

    <div className='mt-10'>
      <ReviewCard 
        imageUrl="https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_UF1000,1000_QL80_.jpg" 
        rating={4} 
        reviewText="I've been using the iPhone for a few months now, and it has completely transformed how I interact with technology daily. The build quality is top-notch, with a sleek design that feels premium in the hand. The display is vibrant, with colors that pop and blacks that are deep and true. I love the camera setup—whether I'm taking photos in bright sunlight or low light, the results are consistently stunning."
      />
    </div>

    <div className='mt-10'>
      <ReviewCard 
        imageUrl="https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_UF1000,1000_QL80_.jpg" 
        rating={4} 
        reviewText="I've been using the iPhone for a few months now, and it has completely transformed how I interact with technology daily. The build quality is top-notch, with a sleek design that feels premium in the hand. The display is vibrant, with colors that pop and blacks that are deep and true. I love the camera setup—whether I'm taking photos in bright sunlight or low light, the results are consistently stunning."
      />
    </div>

    <div className='mt-10'>
      <ReviewCard 
        imageUrl="https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_UF1000,1000_QL80_.jpg" 
        rating={4} 
        reviewText="I've been using the iPhone for a few months now, and it has completely transformed how I interact with technology daily. The build quality is top-notch, with a sleek design that feels premium in the hand. The display is vibrant, with colors that pop and blacks that are deep and true. I love the camera setup—whether I'm taking photos in bright sunlight or low light, the results are consistently stunning."
      />
    </div>

    <div className='mt-10'>
      <ReviewCard 
        imageUrl="https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_UF1000,1000_QL80_.jpg" 
        rating={4} 
        reviewText="I've been using the iPhone for a few months now, and it has completely transformed how I interact with technology daily. The build quality is top-notch, with a sleek design that feels premium in the hand. The display is vibrant, with colors that pop and blacks that are deep and true. I love the camera setup—whether I'm taking photos in bright sunlight or low light, the results are consistently stunning."
      />
    </div>

    </>
  )
}

const ReviewCard = ({ imageUrl, rating, reviewText }) => {

    const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
    
    const renderStars = () => {
      let stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <svg
            key={i}
            className={`h-5 w-5 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.174-5.934 5.783 1.4 8.177L12 18.897l-7.334 3.855 1.4-8.177L.132 9.192l8.2-1.174L12 .587z" />
          </svg>
        );
      }
      return stars;
    };
  
    return (
        <>
      <div className="flex items-center bg-white p-4 shadow-lg rounded-lg mx-[10vh]">
        <div className="w-20 h-20">
        <a href={imageUrl}  target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt="Review"
            className="w-full h-full object-cover rounded-lg"
          />
        </a>
      </div>
  
        <div className="ml-4 flex-1">
          <div className="flex items-center mb-2">
            {renderStars()}
          </div>
  
          <div className="text-gray-700 w-[1000px]">
            {reviewText}
          </div>
        </div>
     

<div className="flex items-center mt-4 mr-10 space-x-4">
<button
  className="flex items-center text-green-600 hover:text-green-800"
  onClick={() => setUpvotes(upvotes + 1)}
>
<BiSolidUpvote />
  {upvotes}
</button>

<button
  className="flex items-center text-red-700 hover:text-red-800"
  onClick={() => setDownvotes(downvotes + 1)}
>
<BiSolidDownvote/>
  {downvotes}
</button>
</div>
</div>
</>
    );
  };

