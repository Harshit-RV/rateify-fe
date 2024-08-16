import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
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
  );
};

export default StarRating;