import { useState } from 'react'
import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import { RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import { SignInPage } from "./components/SignIn.jsx";
import { SignUpPage } from "./components/SignUp";
import Home from "./components/Home.jsx"
import Favourites from "./components/Favourites.jsx"
import Profile from "./components/Profile.jsx"
import Product from "./components/Product.jsx"
import Navbar from "./components/Navbar.jsx"
import MyReviews from "./components/MyReviews.jsx"

function App() {

  return (
    <>


      <div>

       <BrowserRouter>

   <Navbar />

   <Routes>

   <Route path="/" element= { <ProtectedRoute child={<Home/>} /> }/>
      <Route path="/favourites" element={<Favourites/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/:id" element={<Product />} />
      <Route path="/sign-in" element={<SignInPage/>} />
      <Route path="/sign-up" element={<SignUpPage/>} />
      <Route path = "/myreviews" element= {<MyReviews/>}/>

   </Routes>


     </BrowserRouter>

      </div>
    </>
  )
}

const ProtectedRoute = ({ child }) => {
  return (
    <>
    <SignedIn> {child} </SignedIn>

    <SignedOut> 
      <RedirectToSignIn />
    </SignedOut>
    </>
  );
};

export default App
