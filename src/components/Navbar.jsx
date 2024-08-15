import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'



export default function Navbar() {
    const navigate = useNavigate();

  return (
    <div className='bg-[#007DC6] h-[10vh]'>
        <div className='flex justify-between h-full justify-content items-center px-10'>
        <div onClick={() => navigate("/")} className='text-[#FFC220] text-2xl'>W</div>
        <div onClick={() => navigate("/")} className='bg-white py-2 w-[80vh] p-[3vh] text-black rounded-xl flex justify-between items-center'>
            <div className='text-[#004C91]'>Search everything online and in store</div>
            <div ><FaSearch color='#004C91' /></div>
           

        </div>
        <div className='flex gap-10'>
        <FaRegHeart className='cursor-pointer' onClick={() => navigate("/favourites")} size={25} color='white'/>
        <CgProfile className='cursor-pointer' onClick={() => navigate("/profile")} size={25} color='white'/>
        </div>


        </div>
    </div>
  )
}
