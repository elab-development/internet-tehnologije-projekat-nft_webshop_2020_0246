import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import '../css/Kriptovalute.css'

function Kriptovalute() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Uzimanje podataka o kripto valutama s CoinGecko API-ja
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin,ethereum,ripple,litecoin,cardano');
            
            setCryptoData(response.data);
          } catch (error) {
            console.error('Greška pri dohvaćanju podataka o kripto valutama:', error);
          }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='kriptovalute-page'>
        <h1>Informacije o kriptovalutama:</h1>
        <ul>
          {cryptoData.map((crypto, index) => (
            <li key={index}>
              <h2>{crypto.name}</h2>
              <img src={crypto.image} alt={crypto.name} />
              <p>Simbol: {crypto.symbol}</p>
              <p>Trenutna cena: {crypto.current_price} EUR</p>
              <p>Promena u 24h: {crypto.price_change_percentage_24h}%</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Kriptovalute;