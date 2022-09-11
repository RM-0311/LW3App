import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal";
import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // walletConnected keeps track of whether or not there is a wallet connected
  const [walletConnected, setWalletConnected] = useState(false);
  // state variable to store the user's address
  const [address, setAddress] = useState("");
  // Loading is set to true when the site is waiting
  const [loading, setLoading] = useState(false);
  // Reference to web3Modal
  const web3ModalRef = useRef();
  // Balance of LearnWeb3 NFTs
  const [learnWebData, setLearnWebData] = useState([]);
  // Balance of Buildspace NFTs
  const [buildspaceData, setBuildspaceData] = useState([]);

  /*
    connectWallet: Connects the MetaMask wallet
    */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  }

    /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Access web3modal current value
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    setAddress(await utils.getAddress(provider));

    // Double check that the user is connected to Polygon network
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 137) {
      window.alert("Change the network to Polygon");
      throw new Error("Change the network to Polygon!");
    }
    return web3Provider;
  };

  
  // This effect will be called whenever the value of 'walletConnected' changes
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "polygon",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }

    // TODO: FUNCTIONS THAT FETCH THE NFTs OWNED BY THE CONNECTED ADDRESS
    // const get = {method: 'GET'};

    //   let lWThreeArray = [];
    //   let buildspaceArray = [];

      // fetch the owned assets in the LearnWeb3 Collection
      // fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&collection=learnweb3&order_direction=asc&limit=20&include_orders=false`, get)
      // .then(response => response.json())
      // .then(nftArray => {
      //   console.log(nftArray.assets)
      //     nftArray.assets.forEach(eachNFT =>{
      //       lWThreeArray.push(eachNFT.image_url)
      //     })
      // },

      // setLearnWebData(lWThreeArray),
    
      // fetch the owned assets in the Buildspace Collection
      // fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&collection=buildspace-v2&order_direction=asc&limit=20&include_orders=false`, get)
      // .then(response => response.json())
      // .then(nftArray => {
      //   console.log(nftArray.assets)
      //     nftArray.assets.forEach(eachNFT =>{
      //       buildspaceArray.push(eachNFT.image_url)
      //     })
      // },
 
      // setBuildspaceData(buildspaceArray),
    
  }, [walletConnected]);

  const renderButton = () => {
    // If wallet is not connected, display connect wallet button
    if (!walletConnected) {
      return (
        <button className="absolute top-[30px] right-[100px] px-[10px] py-[5px] rounded-lg bg-black text-white" onClick={connectWallet}>
          Connect Wallet
        </button>
      );
    }
  }

  // Render the Learn Web3 NFTs that the User owns
  const renderLWThree = () => {
    // If wallet is not connected, display message to connect wallet
    if (walletConnected) {
      for (i in learnWebData) {
        return (
          <img src={i}></img>
        )
      }
    } else if (!walletConnected) {
      return (
        <h2 class="font-bold text-center">
          Please connect your wallet in order to view your owned NFTs
        </h2>
      )
    };
  }

  // Render the Buildspace NFTs that the User owns
  const renderBuildspace = () => {
    // If wallet is not connected, display message to connect wallet
    if (walletConnected) {
      for (i in buildspaceData) {
        return (
          <img src={i}></img>
        )
      }
    } else if (!walletConnected) {
      return (
        <h2 className="font-bold text-center">
          Please connect your wallet in order to view your owned NFTs
        </h2>
      )
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>FullStack Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-5xl text-blue-700 font-bold font-mono align-center mt-8">
          Show us what you've done!
        </h1>
        <h2 className="text-2xl font-bold mt-20 text-black align-center text-center">
          To display any Proof of Knowledge NFTs you own, <br/>connect your wallet!
        </h2>
        <div>
          {renderButton()}
        </div>
        <div className="flex-1 flex-column justify-center align-center w-3/5">
          <h3 className="font-bold mt-12 text-xl">
            LearnWeb3 NFTs
          </h3>
          <div className="bg-gray-300 h-[300px] mt-[10px] px-[20px] align-center rounded border-2 border-black">
            {renderLWThree()} 
          </div>
          <h3 className="font-bold mt-12 text-xl">
            Buildspace NFTs
          </h3>
          <div className="bg-gray-300 px-[20px] mt-[10px] h-[300px] align-center rounded border-2 border-black">
           {renderBuildspace()}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
