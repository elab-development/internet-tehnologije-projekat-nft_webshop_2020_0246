import React, { useState } from 'react';
import Nft from './Nft';
import useNfts from '../customHooks/useNfts';
import '../css/Nfts.css';
import Footer from './Footer';

const Nfts = ({searchCriteria}) => {
  
  const [nfts] = useNfts('http://127.0.0.1:8000/api/nfts');

  const filteredNfts = searchCriteria
  ? nfts.filter((nft) =>
      nft.name.toLowerCase().includes(searchCriteria.toLowerCase())
    )
  : nfts;

  const nftsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(filteredNfts.length / nftsPerPage);

  const currentNfts = filteredNfts.slice(currentPage *nftsPerPage ,
     (currentPage + 1) * nftsPerPage );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
     <div className="nfts-page">
        <h2 className='nft-title'>
            NASI DOSTUPNI NFT-JEVI:
        </h2>
      <div className='nfts-section'>
      {currentNfts.map(nft => (
        <Nft key={nft.id} nft={nft} />
      ))}
      </div>
      <div className="pagination">
      <p>Promenite stranu:</p>
        {Array.from({ length: pageCount }).map((_, page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};



export default Nfts;