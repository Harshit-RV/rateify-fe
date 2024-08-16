import React from 'react'
import productData from '../productinfo.json';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";


export default function Product() {
 return (
<div id="collection" className="bg-gray-50 grid md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 md:px-14">
      {productData.map((product, index) => (
        <ProductCatalogue 
          id={index}
          key={index}
          name={product.productName}
          price={`$${product.price}`}
          description={product.briefDescription}
          image={product.imageLink}
        />
      ))}
    </div>
 )
}

const ProductCatalogue = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${props.id}`);
  };
  return (
    <div className="flex flex-col rounded-xl shadow-md">
      <img 
        className="w-full h-[250px] object-cover rounded-t-xl" 
        src={props.image} 
        alt="description" 
      />
      <div className="bg-white rounded-b-xl p-5">
        <div className="flex justify-between text-xl font-bold">
          <div>{props.name}</div>
          <div className="font-black text-[#007DC6] text-xl">{props.price}</div>
        </div>
        <div className="font-sans pt-2.5">{props.description}</div>
        <div  onClick={handleClick} className='bg-black py-3 rounded-xl mt-2.5 flex flex-row gap-2 items-center justify-center text-white hover:cursor-pointer hover:bg-gray-700 active:bg-gray-600 transition-colors duration-300'>
          Check it out
          <FaArrowRight className='text-xl' />
        </div>
      </div>
    </div>
  );
};