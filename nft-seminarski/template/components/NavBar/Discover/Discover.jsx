import React from 'react'

import Link from 'next/link'
import Style from './Discover.module.css'

const Discover = () => {

  //navigatcioni menu
  const discover = [
    {
      name: "Kolekcija",
      link: "kolekcija"
    },
    {
      name: "Pretrazi",
      link: "pretrazi"
    },
    {
      name: "Profil autora",
      link: "profil-autora"
    },
    {
      name: "NFT detalji",
      link: "nft-detalji"
    },
    {
      name: "Podesavanje naloga",
      link: "podesavanje-naloga"
    },
    {
      name: "Novcanik",
      link: "novcanik"
    },
    {
      name: "Blog",
      link: "blog"
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