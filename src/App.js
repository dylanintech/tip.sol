import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import './App.css';

library.add(faGithub, faDiscord, faTwitter);

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
       className='bg-gray-900 hover:bg-gray-700 border border-black hover:border-white text-white font-bold rounded-full shadow-2xl px-4 py-2 w-1/2 h-14'
       onClick={connectWallet}
       >
        CONNECT WALLET
      </button>
    )
  }

  const renderConnectedContainer = () => {
    return (
      <div className="text-center text-6xl text-white font-bold min-w-full pt-10">
        <h1 className="mb-6 text-8xl">Tip.sol</h1>
        <p>Thanks for connecting! Tip.sol is a magical✨ place that lets you post useful content and get tipped for it. In Solana! Join our community👇 to be notified as features begin to roll out! We're glad to have you here.</p>
      </div>
    )
  }

  const renderTitle = () => {
    return (
      <h1 className="font-dm-sans text-9xl font-bold text-white py-20 min-w-full pt-32 max-h-full">Tip.sol</h1>
    )
  }

  const renderCommunity = () => {
    return (
      <div className="flex justify-evenly items-end text-center py-10">
        <a href="https://github.com/Dmigit/tip.sol" target="_blank">
          <FontAwesomeIcon icon="fa-brands fa-github" size='3x' className="hover:h-14"/>
        </a>
        <a href="https://discord.gg/UeZyQgBp" target="_blank">
          <FontAwesomeIcon icon="fa-brands fa-discord" size='3x' className="hover:h-14" />
        </a>
        <a href="https://twitter.com/Tipsolana" target="_blank">
          <FontAwesomeIcon icon="fa-brands fa-twitter" size='3x' className="hover:h-14" />
        </a>
     </div>
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
    <div className={`text-center from-solana-purple to-solana-green bg-gradient-to-r w-full ${walletAddress ? 'h-full lg:h-screen' : 'h-screen' }`}>
      {!walletAddress && renderTitle()}
      {!walletAddress && renderNotConnectedContainer()}
      {walletAddress && renderConnectedContainer()}
      {walletAddress && renderCommunity()}
    </div>
  );
}

export default App;
