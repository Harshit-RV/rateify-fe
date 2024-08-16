import React, { useState } from 'react';
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react'; // Import useClerk for authentication

const LogoutButton = () => {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut().then(() => {
      window.location.href = '/'; 
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <button onClick={handleLogout} className="text-red-500">
      Logout
    </button>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  return (
    <div className='bg-[#007DC6] h-[10vh]'>
      <div className='flex justify-between h-full items-center px-10'>
        <div onClick={() => navigate("/")} className='text-[#FFC220] text-2xl cursor-pointer'>
          W
        </div>
        <div onClick={() => navigate("/")} className='bg-white py-2 w-[80vh] p-[3vh] text-black rounded-xl flex justify-between items-center cursor-pointer'>
          <div className='text-[#004C91]'>Search everything online and in store</div>
          <FaSearch color='#004C91' />
        </div>
        <div className='relative'>
          <div className='flex gap-10'>
            <FaRegHeart className='cursor-pointer' onClick={() => navigate("/favourites")} size={25} color='white' />
            <CgProfile className='cursor-pointer' onClick={() => setMenu(!menu)} size={25} color='white' />
          </div>
          {menu && (
            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20'>
              <div className='p-2 cursor-pointer hover:bg-gray-100' onClick={() => {}}>Create Wishlist</div>
              <div className='p-2 cursor-pointer hover:bg-gray-100'>
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}