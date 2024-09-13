import React, {useEffect, useState,useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";
import { NFTMarketplaceContext } from "@/Context/NFTMarketPlaceContext";


const uploadNFT = () => {
  const {uploadToPinata, createNFT} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Kreirajte Novi NFT</h1>
          <p>
            Mozete postaviti preferirano ime, kreirati URL svog profila i pristupiti ostalim podesavanjima.
            
          </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Slika, Video, Audio ili 3D model</h2>
          <p>
            Tipovi fajla koji su podrzani: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT uploadToPinata={uploadToPinata} createNFT={createNFT}/>
        </div>
      </div>
    </div>
  );
};

export default uploadNFT;