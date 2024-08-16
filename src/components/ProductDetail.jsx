import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import productData from '../productinfo.json';
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

const API_KEY = import.meta.env.GOOGLE_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);
const profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

async function run(prompt, callback) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    
    const response = result.response;
    if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
      const generatedText = marked(response.candidates[0].content.parts.map(part => part.text).join("\n"));
      console.log("Generated Text:", generatedText);
      callback(generatedText); 
    } else {
      console.log("No valid response structure found.");
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

function getProductById(id) {
  return productData.find(product => product.id === id) || null;
}

const ProductDetail = () => {
  const { id } = useParams(); 
  const product = getProductById(id); 
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

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
              <p className="text-md mb-6">{product.featureParagraph}</p>
              <div className='flex flex-row gap-4 items-center'>
                  <div className='bg-[#004C91] py-3 rounded-xl  w-80 flex flex-row gap-2 items-center justify-center text-white hover:cursor-pointer hover:bg-gray-700 active:bg-gray-600 transition-colors duration-300'>
                      Add to Cart
                  </div>
                  <FaHeart
                      size={35}
                      onClick={handleClick}
                      style={{ fill: isLiked ? 'red' : 'black' }}
                      className="transition-colors duration-300 hover:fill-red-500 cursor-pointer"
                  />
              </div>
             

              
          </div>
          
        </div>
      </div>
      <div className='w-full bg-gray-50 px-24 mt-10 py-20'>
        <div className='flex justify-between w-full font-bold text-2xl mb-4'>
          Reviews
          <WriteReview />
        </div>
        <div className='w-full bg-gray-50 grid gap-6 grid-cols-3'>
          <ReviewCard imageUrl={product.imageLink} rating={5} reviewText={'This is a great product. I love it! '} />
          <ReviewCard imageUrl={product.imageLink} rating={5} reviewText={'This is a great product. I love it!'} />
          <ReviewCard imageUrl={product.imageLink} rating={5} reviewText={'This is a great product. I love it!'} />
          <ReviewCard imageUrl={product.imageLink} rating={5} reviewText={'This is a great product. I love it!'} />
          <ReviewCard imageUrl={product.imageLink} rating={5} reviewText={'This is a great product. I love it!'} />
        </div>
        {/* <FeedbackComponent /> */}
        </div>
    </div>
  );
};

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
    <div className="flex flex-col items-start bg-white p-6 gap-4 shadow-sm rounded-lg w-full">
      <div className="w-full flex justify-start items-center">
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
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



const ReviewPopup = ({ show, onClose, onGenerateAIReview }) => {
    const [reviewText, setReviewText] = useState('');
    const [aiPrompt, setAIPrompt] = useState('');
    const [aiReview, setAIReview] = useState('');
  
    const handleManualSubmit = () => {
      console.log('Manual Review:', reviewText);
      onClose();
    };
  
    const handleAIPromptSubmit = async () => {
      try {
        const response = await onGenerateAIReview(aiPrompt);
        setAIReview(response);
      } catch (error) {
        console.error('Error generating AI review:', error);
      }
    };
  
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Write Manually</h3>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Generate by AI</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="Enter keywords to revamp your review using AI..."
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
            />
            <button
              onClick={handleAIPromptSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Generate Review
            </button>
            {aiReview && (
              <div className="mt-4 p-2 border border-gray-300 rounded-lg bg-gray-100">
                <h4 className="font-semibold mb-2">AI-Generated Review:</h4>
                <p>{aiReview}</p>
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
  
const WriteReview = () => {
    const [showPopup, setShowPopup] = useState(false);
  
    const handlePopupOpen = () => {
      setShowPopup(true);
    };
  
    const handlePopupClose = () => {
      setShowPopup(false);
    };

    const { id } = useParams();
    const product = productData[id];

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
          const productPrompt = `Write a review of the ${product.productName} focusing on its ${product.featureParagraph.slice(0, 30)}...`; // Truncate feature paragraph for brevity
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
  
      return await run(prompt);
    };

    return (
      <div>
        <button
          onClick={handlePopupOpen}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Write a Review
        </button>
  
        <ReviewPopup
          show={showPopup}
          onClose={handlePopupClose}
          onGenerateAIReview={handleGenerateAIReview}
        />
      </div>
    );
  };

export default ProductDetail;
