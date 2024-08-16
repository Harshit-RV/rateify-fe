import { useState } from 'react';
import { FaWallet } from "react-icons/fa";
import { toast } from 'react-hot-toast';

import Web3 from 'web3';

function Metamask() {
  const [isConnected, setIsConnected] = useState(false);

  const detectCurrentProvider = () => {
    if (window.ethereum) {
      return window.ethereum;
    } else if (window.web3) {
      return window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
      return null;
    }
  };

  const onConnect = async () => {
    console.log("hello1")
    try {
      const currentProvider = detectCurrentProvider();
      console.log(currentProvider)
      if (currentProvider) {
        console.log("hello3")
        const web3 = new Web3(currentProvider);

        // Request account access
        await currentProvider.request({ method: 'eth_requestAccounts' });

        // Get user account
        const userAccount = await web3.eth.getAccounts();
        console.log(userAccount)
        const account = userAccount[0];
        localStorage.setItem('address', account);

        console.log(account)

        // const ethBalance = await web3.eth.getBalance(account);
            
        // setEthBalance(web3.utils.fromWei(ethBalance, 'ether')); 

        setIsConnected(true);
        toast.success('Always at the bottom.', {
          position: "top-right"
        })
      }
    } catch (err) {
      console.log("Error connecting to Metamask:", err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem('address'); // Optionally clear the stored address
  };

  return (
    <div className="text-sm">
        {!isConnected ? (
          <div className='flex items-center justify-content justify-center'>
            <button className="app-button__login px-5 rounded-lg py-2 font-semibold bg-[#007DC6] hover:bg-[#007DC6]/70 text-white" onClick={onConnect}>
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className='flex items-center justify-content justify-center'>
            <button className="app-button__login flex items-center px-5 rounded-lg py-2 font-semibold bg-red-500 hover:bg-red-700 text-white" onClick={onDisconnect}>
              <FaWallet className='mr-2'/>
              Disconnect
            </button>
          </div>
        )}
      </div>
  );
}

export default Metamask;
