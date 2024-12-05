import { useState, useEffect } from 'react';
import axios from 'axios';

const useNfts = (url) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setNfts(response.data.data);
      })
      .catch(error => console.error('Greska u dohvatanju nft-jeva:', error));
  }, [url]);

  return [nfts, setNfts];
};

export default useNfts;