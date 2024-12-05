import React from 'react';
import useCopy from '../customHooks/useCopy';
import '../css/Footer.css'

function Footer() {
  const [copied, copyText] = useCopy();

  const textToCopy = 'NFT WEBSHOP 2024 - All rights reserved';

  return (
    <div className="footer">
      <footer className="footer-container"> 
          <p>{textToCopy} </p>
          <button onClick={() => copyText(textToCopy)}>
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
      </footer> 
    </div>
  );
}

export default Footer;