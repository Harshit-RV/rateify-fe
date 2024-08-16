import React, { useState } from 'react';
import productData from '../productinfo.json'; // Adjust path if necessary
import { FaArrowRight } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const ProductCatalogue = (props) => {
  const [heart, setHeart] = useState(false);

  return (
    <div className="flex flex-col rounded-xl shadow-md w-[50vh] h-[60vh]">
      <div className="w-full h-[50%] flex items-center justify-center bg-gray-100">
        <img
          className="object-contain max-w-full max-h-full rounded-t-xl m-5"
          src={props.image}
          alt="description"
        />
      </div>
      <div className="bg-white rounded-b-xl p-5">
        <div className="flex justify-between text-xl font-bold">
          <div className='h-[10vh]'>{props.name}</div>
          <div className="font-black text-[#007DC6] text-xl">{props.price}</div>
        </div>
        <div className="font-sans pt-2.5 h-[10vh]">{props.description}</div>

        <div className='flex items-center justify-center gap-5'>
          <div className='bg-[#004C91] py-3 w-[60vh] rounded-xl mt-2.5 flex flex-row gap-2 items-center justify-center text-white hover:cursor-pointer hover:bg-gray-700 active:bg-gray-600 transition-colors duration-300'>
            Check it out
            <FaArrowRight className='text-xl' />
          </div>
          
            <FaHeart color='red' onClick={() => setHeart(!heart)} size={40} />
         
            
        </div>
      </div>
    </div>
  );
};

export default function Favourites() {
  return (
    <div className="bg-gray-50 grid md:grid-cols-2 xl:grid-cols-3 gap-10 p-10 md:p-14">
      {productData.map((product, index) => {
        if (index === 0 || index === 2) {
          return (
            <ProductCatalogue
              key={index}
              name={product.productName}
              price={`$${product.price}`}
              description={product.briefDescription}
              image={product.imageLink}
            />
          );
        }
        return null;
      })}
    </div>
  );
}