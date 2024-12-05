import React from 'react'

import Image from "next/image"
import Style from "./Notification.module.css"
import images from "../../../img"



const Notification = () => {
  return (
    <div className={Style.notification}>
      <p>Notifikacija</p>
      <div className={Style.notification_box}>
        <div className={SubtleCrypto.notification_box_img}>
          <Image src={images.user1} alt='profile image' width={50} height={50}/>
        </div>
        <div className={Style.notification_box_info}>
          <h4>Djordje Mirkovic</h4>
          <p>Vene vidi vici</p>
          <small>3 minutes</small>
        </div>
        <span className={Style.notification_box_new}></span>
      </div>
    </div>
  )
}

export default Notification