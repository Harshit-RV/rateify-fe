import React, {useEffect, useState} from 'react'
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { getReviewsOfCurrentUser } from '../lib/Web3';
import toast from 'react-hot-toast';
import productData from '../productinfo.json';
import { useNavigate } from 'react-router-dom';

function getProductImageUrl(productId) {
  const product = productData.find(product => product.id === productId);
  return product ? product.imageLink : "Product not found";
}

export default function MyReviews() {
  const [ reviews, setReviews ] = useState([]);

  const fetchReviews = async () => {
    const address = localStorage.getItem('address');
    if (!address) {
      toast.error('Please connect your wallet to view your reviews');
    }
    const output = await getReviewsOfCurrentUser(address);
    setReviews(output);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
<div className='grid grid-cols-3 justify-items-center items-center text-center mx-[40vh] mt-20'>

    <div className='bg-[#367C2B] rounded-lg p-[4vh] text-white w-[28vh] h-[20vh] flex flex-col items-center justify-center mx-auto'>
    <div className='font-bold text-lg'>Total Reviews</div>
    <div className='text-xl'>{reviews.length}</div>
    </div>

    <div className='bg-[#367C2B] rounded-lg p-[4vh] text-white w-[28vh] h-[20vh] flex flex-col items-center justify-center mx-auto'>
    <div className='font-bold text-lg'>Total Earnings</div>
    <div className='text-xl'>$3</div>
    </div>

    <div className='bg-[#367C2B] rounded-lg p-[4vh] text-white w-[28vh] h-[20vh] flex flex-col items-center justify-center mx-auto'>
    <div className='font-bold text-lg'>Redeem Earnings</div>
    <div className='text-xl'>$1</div>
    </div>

</div>
    {
      reviews.map((review, index) => (
        <div key={index} className='mt-10 px-32'>
          <ReviewCard 
            rating={parseInt(review.rating)} 
            reviewText={review.feedbackText}
            upvotes={parseInt(review.upvotes)}
            downvotes={parseInt(review.downvotes)}
            productId={review.productId}
          />
        </div>
      ))
    }
    </div>
  )
}

const ReviewCard = ({ rating, reviewText, upvotes, downvotes, productId }) => {

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

    const imageUrl = getProductImageUrl(productId)
    const navigate = useNavigate();
  
    return (
        <>
        <div className="flex items-center bg-white px-6 py-8 shadow-lg rounded-lg w-full hover:cursor-pointer" onClick={() => navigate(`/product/${productId}`)}>
          <img
            src={imageUrl}
            alt="Review"
            className="max-w-24 h-full object-cover rounded-lg"
          />
  
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
          >
          <BiSolidUpvote />
            {upvotes}
          </button>

          <button
            className="flex items-center text-red-700 hover:text-red-800"
          >
          <BiSolidDownvote/>
            {downvotes}
          </button>
          </div>
        </div>
        </>
    );
  };

