import React, { useContext, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, BigNFTSilder, Title, Category, Filter, NFTCard, Collection } from "../components/componentindex";
import { NFTMarketplaceContext } from "@/Context/NFTMarketPlaceContext";

const Home = () => {
  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext);
  useEffect(()=>{
    checkIfWalletConnected
  },[]);
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <BigNFTSilder/>
      <Filter/>
      <NFTCard/>
      <Title heading="Preporuceni" paragraph="Najpopularniji NFT izdvojeni za vas"/>
      <Category/>
      
    
    </div>
  );
};

export default Home;