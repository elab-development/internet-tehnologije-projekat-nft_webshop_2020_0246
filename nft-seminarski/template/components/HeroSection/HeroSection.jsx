import React from "react";
import Image from "next/image";

//INTERNALNI IMPORTI
import Style from "./HeroSection.module.css";
import { Button } from "../componentindex";
import images from "../../img";

const HeroSection = () => {
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Pronadji, kupi i prodaj svoje NFT-e 🖼️</h1>
          <p>
          Otkrijte najistaknutije NTF-ove u svim životnim temama. Kreativno
          svoje NTF-ove i prodajte ih
          </p>
          <Button btnName="Započnite pretragu" />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;