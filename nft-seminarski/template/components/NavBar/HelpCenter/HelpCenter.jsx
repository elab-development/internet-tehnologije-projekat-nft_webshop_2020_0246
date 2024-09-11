import React from 'react'

import Link from "next/link"
import Style from "./HelpCenter.module.css"

const HelpCenter = () => {

  const helpCenter = [
    
    
    {
      name: "Prijavi se",
      link: "login"
    },
    {
      name: "Registruj se",
      link: "signUp"
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