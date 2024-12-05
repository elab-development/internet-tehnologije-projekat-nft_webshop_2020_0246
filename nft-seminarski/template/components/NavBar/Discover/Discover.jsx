import React from 'react'

import Link from 'next/link'
import Style from './Discover.module.css'

const Discover = () => {

  //navigatcioni menu
  const discover = [
    {
      name: "Kolekcija",
      link: "collection"
    },
    {
      name: "Pretrazi",
      link: "searchPage"
    },
    {
      name: "Profil autora",
      link: "author"
    },
    {
      name: "NFT detalji",
      link: "NFT-details"
    },
    {
      name: "Podesavanje naloga",
      link: "account"
    },
    {
      name: "Novcanik",
      link: "connectWallet"
    }
    

  ]

  return (
    <div>
      {discover.map((el,i)=>(
        <div key={i+1} className={Style.discover}>
          <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Discover