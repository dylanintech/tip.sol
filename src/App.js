import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import './App.css';
import { AiOutlineStar } from 'react-icons/ai';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { IconContext } from "react-icons";
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
      <div>
        <p className="pb-2 font-bold">Post useful content and get tipped in SOL</p>
        <button
         className='bg-gray-900 hover:bg-gray-700 border border-black hover:border-white text-white font-bold rounded-full shadow-2xl px-4 py-2 w-1/2 h-14'
         onClick={connectWallet}
         >
          CONNECT WALLET
        </button>
      </div>
    )
  }

  const renderConnectedContainer = () => {
    return (
      <div className="text-center text-white font-bold min-w-full pt-10">
        <h1 className="mb-6 text-8xl">Tip.sol</h1>
        {/* <p>Thanks for connecting! Tip.sol is a magical✨ place that lets you post useful content and get tipped for it. In Solana! Join our community👇 to be notified as features begin to roll out! We're glad to have you here.</p> */}
        <div className="flex flex-col items-center">
          <div className="w-1/2 border-black border-2 rounded-lg text-black bg-white p-4 my-4 shadow-xl">
            <div className="block">
              <h1 className="text-3xl ">How I stay productive ✨</h1>
              <p className="text-gray-500">Posted by B7KV...Elbj</p>
            </div>
            <div className="block">
              <p className="py-2">There's a ton of advice out there about the best "productivity stack" or the best "productive morning routine" but most of it is unnecessary and just makes you overwhelmed. You can actually be very productive with just a couple simple tools. Below I've compiled a few of my favorite tools I use to stay productve. </p>
              <ol className="font-normal">
                <li className="py-2">1. <a href="https://www.notion.so/" target="_blank" rel="noreferrer"><span className="text-blue-900 font-semibold">Notion(free)</span></a>- A popular productivity app that's mostly used for planning ahead and organizing your life. I personally use Notion to plan my week and to lay out any high level long-term goals I have for the year. </li>
                <li className="py-2">2. <a href="https://get.sunsama.com/" target="_blank" rel="noreferrer"><span className="text-blue-900 font-semibold">Sunsama(free trial)</span></a>- Whereas Notion is good for high-level planning, Sunsama is better at helping you be more producitve in your tactical, day-to-day tasks. What I like to do is write down my weekly goals on a Notion page, and then create daily tasks in Sunsama that will help me reach those goals. Sunsama makes this really easy with their Notion integration. One thing I really like about Sunsama is that you can add a timer to each task and set it to the amount of time you think that task will take and then measure how much time it actually takes you.</li>
                <li className="py-2">3. <a href="https://pomofocus.io/" target="_blank" rel="noreferrer"><span className="text-blue-900 font-semibold">Pomofocus(free)</span></a>- If you've ever used the pomodoro technique you know how annoying it is to find custom timers on Google or Youtube and to set the break timers seperately. It's a whole mess. Pomofocus abstracts away all of this nonsense and provides you with a simple pomodoro timer where you can set custom focus/break times. It has a nice UI and is really a must for anyone using the pomodoro technique (not sponsored btw). </li>
                <li className="py-2">4. <a href="https://wakatime.com/" target="_blank" rel="noreferrer"><span className="text-blue-900 font-semibold">Wakatime(free)</span></a>- This is more geared towards developers, but I've found Wakatime very useful for getting better at time management and optimizing my workflow. If you're a fellow dev you've probably heard of this, it's basically a VS code extension that collects data about how long you code for and what languages you use the most and then nicely displays the data in a dashboard. It's very important to be able to visualize what you spend most of the day doing so this is a must have for any dev.  </li>
              </ol>
              <p className="py-2">I hope this post has helped you become more efficient and productive😁.</p>
              <div class="flex items-center justify-center">
                <img className="py-2"src="https://media.giphy.com/media/pT4pmRFs15Yg8/giphy.gif"/>
              </div>
              <p className="py-2">**This is a preview of what posts on your feed will look like. Real posts won't have to be as long or as short but will generally follow a similar blog-post like format. Join our Discord if you're interested in using Tip.sol when it releases!**</p>
            </div>
            <div className="block border-t-2">
              {/* <p className="float-left">Twitter: <a href="https://twitter.com/dxlantxch" target="_blank" rel="noreferrer"><span className="text-blue-700">@dxlantxch</span></a></p> */}
              <div className="float-right flex">
                <IconContext.Provider value={{ style: { width: '3em', height: '2em'} }}>
                  <div>
                    <a href="" title="Add to favorites">
                      <AiOutlineStar className=""/>
                    </a>
                  </div>
                </IconContext.Provider>
                <div className="pr-2">
                  <a href="" title="This post was useful">
                    <BiUpvote />
                  </a>
                  <a href="" title="This post was not useful">
                    <BiDownvote />
                  </a>
                </div>
                <a href="" title="Send SOL to B7KV...Elbj">
                  <p className="pt-1 text-transparent bg-clip-text bg-gradient-to-br from-solana-green to-solana-purple">TIP</p>
                </a>
              </div>
            </div>
          </div>
        </div>
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
    <div className={`text-center from-solana-purple to-solana-green bg-gradient-to-r w-full ${walletAddress ? 'h-full lg:h-full' : 'h-screen' }`}>
      {!walletAddress && renderTitle()}
      {!walletAddress && renderNotConnectedContainer()}
      {walletAddress && renderConnectedContainer()}
      {walletAddress && renderCommunity()}
    </div>
  );
}

export default App;
