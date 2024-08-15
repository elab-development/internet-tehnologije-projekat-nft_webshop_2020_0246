import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

//INTERNALNI IMPORTI
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" height={100} width={100} />
          <p>
            Najveće digitalno tržište NFT-a i kriptovaluta. Prodajte, kupujte i menjajte se na našoj platformi!
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Navigacija</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Pomoć</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Pretplata</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Unesite vaš mejl *" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
            Otkrijte, sakupite i prodajte izvanredne NFT-ove OpenSea je
            prvo i najveće NFT tržište na svetu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;