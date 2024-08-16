import { useState } from 'react';
import Web3 from 'web3';

function Metamask() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

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
    <div className="app">
      <div className='flex justify-center pb-10 pt-[20vh]'>
        {/* Metamask logo */}
        <svg xmlns="http://www.w3.org/2000/svg" width="100" fill="none" viewBox="0 0 50 48" id="metamask">
          {/* SVG paths here */}
        </svg>
      </div>
      <div className='flex justify-center'>
        <div className='text-3xl font-semibold'>Authentication through Metamask Wallet</div>
      </div>

      <div className="app-wrapper">
        {!isConnected ? (
          <div className='flex items-center justify-content justify-center pb-[50vh] pt-[5vh]'>
            <button className="app-button__login px-14 py-2 rounded-sm font-semibold bg-purple-800 text-white w-[30vh]" onClick={onConnect}>
              Login
            </button>
          </div>
        ) : (
          <div className="app-wrapper">
            <div className="app-details flex justify-center text-2xl font-medium pt-10">
              <h2>You are connected to Metamask.</h2>
            </div>
           
            <div className='flex justify-center text-lg p-[5vh] pb-[25vh]'>
              <button className="app-buttons__logout bg-red-600 text-white font-semibold px-4 py-2 rounded-lg" onClick={onDisconnect}>
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Metamask;
