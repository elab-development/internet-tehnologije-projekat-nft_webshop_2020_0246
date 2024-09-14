import React, {useState, useEffect, useContext, Children} from 'react'
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import Router from "next/router";
import { useRouter } from 'next/router';

import { NFTMartketplaceAddress, NFTMarketplaceABI } from './constants';
import axios from "axios";
import {create as ipfsHttpClient} from "ipfs-http-client";

//const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

const fetchContract = (signerOrProvider) =>
   new ethers.Contract(
    NFTMartketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
   );

//
const connectingWithSmartContract = async()=>{
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  }catch(error){
    console.log("greska")
  }
  
}



export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = (({children})=>{

    const [currentAccount, setCurrentAccount]=useState("");
    const router = useRouter();
    //check if wallet conn
    const checkIfWalletConnected = async ()=>{
        try{
            if(!window.ethereum) return console.log("install meta mask")
                
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });
            
            if(accounts.length){
                setCurrentAccount(accounts[0])
            }else{
                console.log("no acc found")
            }
            }catch(error){
            console.log("greska sa novcanikom")
        }
         
    }

    useEffect(()=>{
        checkIfWalletConnected();
    },[])

    //connect wallet
    const connectWallet = async()=>{
        try{
            if(!window.ethereum) return console.log("install meta mask")
            
            const accounts = await window.ethereum.request({
                method : "eth_requestAccounts",
            })
            setCurrentAccount(accounts[0]);
            window.location.reload();
        }catch(error){
            console.log("error conn wallte")
        }
    }

    //upload to ipfs
    const uploadToPinata = async(file) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
    
                const response = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `32337e9bcfe7cbcd2178`,
                        pinata_secret_api_key: `60367d65ac1ad8db7c2199f3f80ffb135d45da71cf279a1f11c8e8e351900772`,
                        "Content-Type": "multipart/form-data",
                    }
                });
    
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                return ImgHash;
            } catch (error) {
                console.log("Error uploading to Pinata:", error);
            }
        }
    }
    

    //create nft
    const createNFT = async(name, price, image, description,router)=>{
        try{
            
            if(!name || !description || !price || !image) return console.log("data missing")
            

            const data = JSON.stringify({name,description,image})
           try{
                const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: "POST",
                headers: {
                    pinata_api_key: `038f4354b407bab4c0be`,
                    pinata_secret_api_key:`9a5250d77c298bc5eedc2db12cafd91720e642a9a49cc90ab82a7b7498ef345a`,
                    "Content-Type":"application/json",
                },
                body: data,
              });
                //const responseData = await response.json();
                //const url = `https://gateway.pinata.cloud/ipfs/${responseData.data.IpfsHash}`;
                //console.log(url);
                //await createSale(url,price);
                router.push("/searchPage");
            }catch(error){
                console.log("error api create", error);
           }
        }catch(error){
            console.log("error upload nft",error);
        }
    }

    const createSale = async(url,formInputPrice,isResseling, id)=>{
        try {
            const price = ethers.utils.parseUnits(formInputPrice,"ether");
            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.getListingPrice();
            const transaction = !isResseling ? 
            await contract.createToken(url,price,{value: listingPrice.toString()})
             : await contract.reSellToken(url,price,{
                value: listingPrice.toString(),
             });

             await transaction.wait();
             console.log(transaction);
             router.push("/searchPage");
        } catch (error) {
            console.log("error create sale")
        }
    }

    //fetch nfts
    const fetchNFTs =async()=>{
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();
            
            const items = await Promise.all(
                data.map(async({tokenId,seller,owner,price:unformattedPrice})=>{
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data:{
                            image,name,description
                        },
                    } = await axios.get(tokenURI)
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return{
                        price,
                        tokenId:tokenId.toNumber(),
                        seller,owner,image,name,description,tokenURI,
                    }
                })
            )
            return items;
        } catch (error) {
            console.log("eeror fetch", error)
        }
    }

    useEffect(()=>{
        fetchNFTs
    },[])

    //fetch mynft or listed
    const fetchMyNFTsOrListedNFTs = async(type)=>{
        try {
            const contract = await connectingWithSmartContract();
            const data = type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFT();

            const items = await Promise.all(
                data.map(async ({
                    tokenId,seller,owner,price: unformattedPrice
                })=>{
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image,name,description},

                    }=await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return {
                        price,tokenId:tokenId.toNumber(),seller,owner,image,name,description,tokenURI
                    }
                }
                )
            );
            return items;
        } catch (error) {
            console.log("eeror fetch mynft")
        }
    }

    //buy nft
    const buyNFT = async(nft)=>{
        try{
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(),"ether");
            const transaction = await contract.createMarketSale(
                nft.tokenId,{
                    value:price,
                }
            );
            await transaction.wait();
        }catch(error){
            console.log("error buy")
        }
    }

    return (
        <NFTMarketplaceContext.Provider 
        value={{
            checkIfWalletConnected,
            connectWallet,
            uploadToPinata,
            createNFT,
            fetchNFTs,
            fetchMyNFTsOrListedNFTs,
            buyNFT,
            currentAccount,

        }}>{
            children
        }</NFTMarketplaceContext.Provider>
    )
})