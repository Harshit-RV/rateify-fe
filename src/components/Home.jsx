import React from 'react'
import Product from './Product'

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
    <div className=''>
     
     <div className='bg-[#FFC220] p-10 rounded-lg m-10 drop-shadow-sm justify-between justify-content items-center text-xl font-bold text-orange-800 '>
        <div>Ace The Assignment with our brand new notebooks</div>
     </div>

     <Product/>
     
    </div>
  )
}

function product(){
    
}
