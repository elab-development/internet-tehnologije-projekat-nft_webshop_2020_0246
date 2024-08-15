import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, BigNFTSilder } from "../components/componentindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <BigNFTSilder/>
    </div>
  );
};

export default Home;