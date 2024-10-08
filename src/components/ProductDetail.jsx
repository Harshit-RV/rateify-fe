import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productData from '../productinfo.json';
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { getProductFeedback, addProductFeedback, upvoteFeedback, downvoteProductFeedback } from '../lib/Web3';
import Metamask from './Metamask';
import { toast } from 'react-hot-toast';

// const API_KEY = import.meta.env.GOOGLE_API_KEY; 
// const genAI = new GoogleGenerativeAI(API_KEY);
const profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';


function getProductById(id) {
  return productData.find(product => product.id === id) || null;
}

const ProductDetail = () => {
  const { id } = useParams(); 
  const product = getProductById(id); 
  const [isLiked, setIsLiked] = useState(false);
  const [ feedbacks, setFeedbacks ] = useState([]);
  const [ avgRating, setAvgRating ] = useState(0);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  async function fetchFeedbacks() {
    const address = localStorage.getItem('address');
    const response = await getProductFeedback(address, id);
    const rating = await parseInt(response.totalRating) / parseInt(response.ratingCount);
    console.log('Rating:', rating);
    setAvgRating(rating);
    setFeedbacks(response.feedbacks);
  }

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-4 mx-auto flex flex-col  items-center">
      <div className='max-w-4xl'>
        <div className='grid grid-cols-4 mt-16 gap-12'>
          <div className='flex items-center justify-center w-96 h-96 col-span-2'>
              <img 
                className="object-contain w-full h-full"
                src={product.imageLink}
                alt={product.productName}
              />
          </div>
          <div className='col-span-2'>
              <h2 className="text-3xl font-bold mb-4">{product.productName}</h2>
              <div className=" mb-2 flex flex-row gap-3 items-end">
                <p className="text-3xl font-bold text-[#2a8703]">{`Now: $${product.price}`}</p>
                <p className="text-md font-bold text-red-500 line-through mb-0.5">{`$${(product.price / (1 - product.discount / 100)).toFixed(2)}`}</p>
              </div>
              <div className='flex flex-row gap-2 items-center text-sm text-[#2a8703] font-semibold mb-4'>
                  <div className='bg-green-100 w-16 text-sm text-[#2a8703] font-semibold text-center'>
                      You save
                  </div>
                  <h3>{`${product.discount}`}%</h3>
              </div>
              <p className="text-md mb-3">{product.featureParagraph}</p>
              <AvrRating initialRating={Math.round(avgRating)}/>
              <div className='flex flex-row gap-4 mt-4 items-center'>
                  
                  <div className='bg-[#004C91] py-3 rounded-xl  w-80 flex flex-row gap-2 items-center justify-center text-white hover:cursor-pointer hover:bg-gray-700 active:bg-gray-600 transition-colors duration-300'>
                      Add to Cart
                  </div>
                  <FaHeart
                      size={35}
                      onClick={handleClick}
                      style={{ fill: isLiked ? 'red' : 'gray' }}
                      className="transition-colors duration-300 hover:fill-red-500 cursor-pointer"
                  />
              </div>
             

              
          </div>
          
        </div>
      </div>
      <div className='w-full bg-gray-50 px-24 mt-10 py-20'>
        <div className='flex justify-between w-full font-bold text-2xl mb-4'>
          Customer Ratings & Reviews
          <div className='flex justify-end gap-3'>
            <Metamask/>
            <WriteReview fetchFeedbacks={fetchFeedbacks} />
          </div>
        </div>
        <div className='w-full bg-gray-50 grid gap-6 grid-cols-3'>
          {
            feedbacks.map((feedback, index) => (
              <ReviewCard 
                key={index} 
                upvotes={parseInt(feedback.upvotes)}
                downvotes={parseInt(feedback.downvotes)}
                fetchFeedbacks={fetchFeedbacks} 
                rating={parseInt(feedback.rating)} 
                reviewText={feedback.feedbackText} 
                op={feedback.user} 
              />
            ))
          }
        </div>
        </div>
    </div>
  );
};

const ReviewCard = ({ rating, reviewText, op, upvotes, downvotes, fetchFeedbacks }) => {
  const { id } = useParams();
  
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

  const upvote = async () => {
    const address = localStorage.getItem('address');

    if (!address) {
      toast.error('Please connect your wallet to upvote');
      return;
    }

    await upvoteFeedback(address, id, op);
    fetchFeedbacks();

  }

  const downvote = async () => {
    const address = localStorage.getItem('address');

    if (!address) {
      toast.error('Please connect your wallet to upvote');
      return;
    }

    await downvoteProductFeedback(address, id, op);
    fetchFeedbacks();
  }

  return (
      <>
    <div className="flex flex-col items-start bg-white p-6 gap-4 shadow-sm rounded-lg w-full">
      <div className="w-full flex justify-start items-center">
        <a target="_blank" rel="noopener noreferrer">
            <img
                src={profileImage}
                alt="Review"
                className="w-8 h-8 object-cover rounded-full"
            />
        </a>
      </div>

      <div className="flex items-center">
        {renderStars()}
      </div>

      <div>
        {reviewText}
      </div>
   

      <div className="flex justify-end items-center gap-3">
        <button
          className="flex items-center text-green-600 hover:text-green-800"
          onClick={upvote}
        >
        <BiSolidUpvote />
        {upvotes}
        </button>

        <button
          className="flex items-center text-red-700 hover:text-red-800"
          onClick={downvote}
        >
          <BiSolidDownvote/>
          {downvotes}
        </button>
      </div>
    </div>
      </>
  );
};



const ReviewPopup = ({ show, onClose, onGenerateAIReview, productId, fetchFeedbacks, loading }) => {
    const [reviewText, setReviewText] = useState('');
    const [aiPrompt, setAIPrompt] = useState('');
    const [aiReview, setAIReview] = useState('');
    const [rating, setRating] = useState(2);

    const handleClick = (newRating) => {
      setRating(newRating);
    };

    const [aiReviewText, setAIReviewText] = useState(''); 
  
    const handleManualSubmit = async () => {
      const address = localStorage.getItem('address');

      console.log('Manual Review:', reviewText);

      await addProductFeedback(address, productId, reviewText, rating.toString());
      fetchFeedbacks();
      onClose();
    };
  
    const handleAIPromptSubmit = async () => {
      try {
        const response = await onGenerateAIReview(aiPrompt);
        console.log('Rating:', rating);
        setAIReview(response);
        setAIReviewText(response); 
      } catch (error) {
        console.error('Error generating AI review:', error);
      }
    };
  
    const handleUseAIReview = () => {
      setReviewText(aiReviewText);
      setAIReview('');
    };
  
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
          <div className='flex justify-content justify-between items-center justify-items-center'>
          <h2 className="text-xl font-bold">Write a Review</h2>
          <div className="flex items-center cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-400'} transition-colors duration-200 ease-in-out`}
                onClick={() => handleClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          </div>
          <div className="mb-4 mt-4">
            <textarea
              className="w-full h-24 p-2 border font-light border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Generate by AI</h3>
            <input
              type="text"
              className="w-full p-2 border font-light border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="Enter keywords to revamp your review using AI..."
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
            />
            <button
              onClick={handleAIPromptSubmit}
              className="bg-[#F47321] text-white px-4 py-2 rounded-lg hover:bg-[#F47321]/70 transition duration-300"
              disabled={loading} 
            >
              Generate Review
            </button>
            {loading && <Loader />} 
            {aiReview && (
              <div className="mt-4 p-2 border border-gray-300 rounded-lg font-light bg-gray-100">
                <h4 className="font-semibold mb-2">AI-Generated Review:</h4>
                <p>{aiReview}</p>
                <button
                  onClick={handleUseAIReview}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-2"
                >
                  Use AI Review
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleManualSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  };


  
const WriteReview = ({ fetchFeedbacks }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false); 

    const handlePopupOpen = () => {
      setShowPopup(true);
    };

    const handlePopupClose = () => {
      setShowPopup(false);
    };

    const { id } = useParams();
    const product = getProductById(id); 

    const handleGenerateAIReview = async (prompt) => {
        const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
      
        if (!API_KEY) {
          console.error("Missing Google API Key");
          return;
        }
      
        const genAI = new GoogleGenerativeAI(API_KEY);
      
        async function run(prompt) {
          try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      
            const productPrompt = `Write a review of the ${product.productName} focusing on its ${product.featureParagraph.slice(0, 30)}. Keep the review under 100 words.`;
      
            const combinedPrompt = prompt ? `${prompt}. ${productPrompt}` : productPrompt;
            
            const result = await model.generateContent(combinedPrompt);
      
            const response = result.response;
            if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
              const generatedText = response.candidates[0].content.parts.map(part => part.text).join("\n");
              console.log("Generated Text:", generatedText);
              return generatedText;
            } else {
              console.log("No valid response structure found.");
            }
          } catch (error) {
            console.error("Error generating content:", error);
          }
        }

        setLoading(true); 
        const generatedReview = await run(prompt);
        setLoading(false); 
        return generatedReview;
      };      

    return (
      <div className='text-sm'>
        <button
          onClick={handlePopupOpen}
          className="bg-[#F47321] text-white px-6 py-2 rounded-lg hover:bg-[#F47321]/70 transition duration-300"
        >
          Write a Review
        </button>
  
        <ReviewPopup
          show={showPopup}
          onClose={handlePopupClose}
          onGenerateAIReview={handleGenerateAIReview}
          productId={id}
          fetchFeedbacks={fetchFeedbacks}
          loading={loading}
        />
      </div>
    );
  };


  const Loader = () => (
    <div className="flex items-center justify-center">
      <div className="border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full animate-spin"></div>
    </div>
  );
  

  const AvrRating = ({ initialRating }) => {
    return (
      <div className="flex items-center cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${initialRating >= star ? 'text-yellow-400' : 'text-gray-400'} transition-colors duration-200 ease-in-out`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

export default ProductDetail;
