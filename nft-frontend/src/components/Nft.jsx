import React from 'react';
import '../css/Nft.css'

const Nft = ({ nft }) => {
  
  return (

    <div className="nft-container">
      <h3 className="nft-title"> {nft.name}</h3>
      <p> {nft.description}</p>
      <img src={nft.imageUrl} alt='slikaNfta'></img>
    </div>
  );
};

export default Nft;