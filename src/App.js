import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  //State
  const [walletAddress, setWalletAddress] = useState(null);
  //Function that holds logic for deciding if the Phantom Wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom Wallet found!");
          //The solana object provides a function that allows us to connect directly with the user's wallet
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          //Setting the user's publicKey in the state for use later
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get the Phantom Wallet: https://phantom.app/!")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  //This UI is rendered when the user hasn't connected their wallet yet
  const renderNotConnectedContainer = () => {
    return (
      <button 
       className='bg-gray-900 hover:bg-gray-700 hover:border border-pink text-white font-bold rounded-full shadow-2xl px-4 py-2 w-1/2'
       onClick={connectWallet}
       >
        CONNECT WALLET
      </button>
    )
  }

  //When the component mounts for the first time, check to see if the Phantom wallet is connected
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="text-center from-solana-purple to-solana-green bg-gradient-to-r w-full h-screen">
      <h1 className="font-dm-sans text-9xl font-bold text-white py-20 min-w-full">Tip.sol</h1>
      {!walletAddress && renderNotConnectedContainer()}
    </div>
  );
}

export default App;
