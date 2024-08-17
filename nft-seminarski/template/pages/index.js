import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, BigNFTSilder, Title, Category, Filter, NFTCard, Collection } from "../components/componentindex";

const Home = () => {
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