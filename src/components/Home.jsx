import React from 'react'
import { whatsMyAddress, check, getUserUpvotes, getUserDownvotes, upvoteFeedback, downvoteProductFeedback, getBalance, addProductFeedback, getProductFeedback } from '../lib/Web3'

const address = '0xFaaeC23fc39F082bC45834ca01B89c6808D6C5a0';
export default function Home() {
  
  // const testAddInProductsList = async () => {
  //   let text = 'aakash jain';
  //   let iteration = 1;

  //   while (iteration < 50) {
  //       try {
  //           console.log(`Iteration ${iteration}: Trying with text length ${text.length}`);
  //           await addInProductsList(text, address);
  //           console.log(`Success with text length: ${text.length}`);
            
  //           // Increase the text length
  //           text += 'a'; // You can append any character or string
  //           iteration++;
  //       } catch (error) {
  //           console.error(`Error encountered at text length ${text.length}:`, error);
  //           break; // Stop when an error occurs
  //       }
  //   }

  //   console.log('Test complete.');
  // };


  return (
    <div>
      Home
      <div className='bg-green-500 h-10 w-20'></div>
      <div className='flex flex-col gap-3'>
        <button onClick={() => whatsMyAddress(address)}>what is my fucking address</button>
        <button onClick={() => getBalance(address)} className='border border-black '>balance</button>
        <button onClick={() => addProductFeedback(address)} className='border border-black '>final add rating</button>
        <button onClick={() => getProductFeedback(address)} className='border border-black '>final get rating</button>
        <button onClick={() => upvoteFeedback(address, "0xFaaeC23fc39F082bC45834ca01B89c6808D6C5a0")} className='border border-black '>upvote</button>
        <button onClick={() => downvoteProductFeedback(address,  "0xFaaeC23fc39F082bC45834ca01B89c6808D6C5a0")} className='border border-black '>downvote</button>
        <button onClick={() => getUserDownvotes(address)} className='border border-black '>my downvotes</button>
        <button onClick={() => getUserUpvotes(address)} className='border border-black '>my upvotes</button>
        <button onClick={() => check(address, "0xFaaeC23fc39F082bC45834ca01B89c6808D6C5a0")} className='border border-black '>check</button>
      </div>
    </div>
  )
}
