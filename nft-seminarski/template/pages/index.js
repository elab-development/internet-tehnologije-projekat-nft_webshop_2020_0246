import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, BigNFTSilder, Title, Category, Filter, NFTCard } from "../components/componentindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <BigNFTSilder/>
      <Title heading="Preporuceni" paragraph="Najpopularniji NFT izdvojeni za vas"/>
      <Category/>
      <Filter/>
      <NFTCard/>
      <Title heading="Nadji po kategoriji" paragraph="Trazi NFT-e po najpopularnijim kategorijama"/>
      <Category/>
      
    
    </div>
  );
};

export default Home;