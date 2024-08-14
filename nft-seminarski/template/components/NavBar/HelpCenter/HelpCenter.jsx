import React from 'react'

import Link from "next/link"
import Style from "./HelpCenter.module.css"

const HelpCenter = () => {

  const helpCenter = [
    {
      name: "O nama",
      link: "o-nama"
    },
    {
      name: "Kontakt",
      link: "kontakt"
    },
    {
      name: "Prijavi se",
      link: "prijavi-se"
    },
    {
      name: "Registruj se",
      link: "registruj-se"
    },
    {
      name: "Pretplata",
      link: "pretplata"
    }
  ]

  return (
    <div className={Style.box}>
      {helpCenter.map((el,i)=>(
        <div key={i+1} className={Style.helpCenter}>
          <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default HelpCenter