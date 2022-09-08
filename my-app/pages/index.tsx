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
  // Loading is set to true when the site is waiting
  const [loading, setLoading] = useState(false);
  // Reference to web3Modal
  const web3ModalRef = useRef();

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
          network: "rinkeby",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();
      }
    }, [walletConnected]);

    const renderButton = () => {
      // If wallet is not connected, display connect wallet button
      if (!walletConnected) {
        return (
          <button class="absolute top-[30px] right-[100px] px-[10px] py-[5px] rounded-lg bg-black text-white" onClick={connectWallet}>
            Connect Wallet
          </button>
        );
      }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>FullStack Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 class="text-5xl text-blue-700 font-bold font-mono align-center mt-8">
          Show us what you've done!
        </h1>
        <h2 class="text-2xl font-bold mt-20 text-black align-center text-center">
          To display any Proof of Knowledge NFTs you own, <br/>connect your wallet!
        </h2>
        <div>
          {renderButton()}
        </div>
        <div class="flex-1 flex-column justify-center align-center w-3/5">
          <h3 class="font-bold mt-12 text-xl">
            LearnWeb3 NFTs
          </h3>
          <div class="bg-gray-300 h-[300px] px-[20px] align-center rounded-xl">
            /** TODO: FETCH NFTs owned by connected address and display by URI here*/  
            
          </div>
          <h3 class="font-bold mt-12 text-xl">
            Buildspace NFTs
          </h3>
          <div class="bg-gray-300 px-[20px] h-[300px] align-center rounded-xl">
            /** TODO: FETCH NFTs owned by connected address and display by URI here*/  
            
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
