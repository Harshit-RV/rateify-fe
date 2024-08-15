import { useState } from 'react'
import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import Home from "./components/Home.jsx"
import Favourites from "./components/Favourites.jsx"
import Profile from "./components/Profile.jsx"
import Product from "./components/Product.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <>


      <div>

       <BrowserRouter>

   <Navbar />

   <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/:id" element={<Product />} />

   </Routes>


     </BrowserRouter>

      </div>
    </>
  )
}

export default App
