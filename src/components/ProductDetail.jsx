import React from 'react';
import { useParams } from 'react-router-dom';
import productData from '../productinfo.json';
import { useState } from 'react';
import { FaHeart } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams(); 
  const product = productData[id]; 
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className='grid grid-cols-4 mt-16 gap-12'>
        <div className='flex items-center justify-center col-span-2'>
            <img 
              className="w-full h-full mb-4"
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
                <div className='bg-[#007dc6] py-3 rounded-xl mt-2.5 w-80 flex flex-row gap-2 items-center justify-center text-white hover:cursor-pointer hover:bg-gray-700 active:bg-gray-600 transition-colors duration-300'>
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
  );
};

export default ProductDetail;
