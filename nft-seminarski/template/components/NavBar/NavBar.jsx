import React, {useState, useEffect} from 'react'

import Style from './NavBar.module.css'
import { Discover, HelpCenter, Notification, Profile } from './index';

import {Sidebar} from './index'
import {Button} from '../componentindex'
import images from '../../img'


import Image from "next/image"
import Link from "next/link"
{/*Ikonice*/ }
import {MdNotifications} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import {CgMenuLeft,CgMenuRight} from 'react-icons/cg'

const NavBar = () => {
  {/*use states*/ }
  const [discover,setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openMenu = (e)=>{
    const btnText = e.target.innerText;
    if(btnText=="Discover"){
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }else if(btnText=="Help Center"){
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    }else{
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  }

  const openNotification = ()=>{
    if(!notification){
      setDiscover(false);
      setHelp(false);
      setNotification(true);
      setProfile(false);
    }else{
      setNotification(false);
      
    }
  }

  const openProfile = ()=>{
    if(!profile){
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    }else{
      setProfile(false);
    }
  }

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image src={images.logo}
            alt="NFT MARKETPLACE"
            width={100}
            height={100}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder='Pretrazi' />
              <BsSearch onClick={()=>{}} className={Style.search_icon}/>
            </div>
          </div>
        </div>

        {/*//KRAJ LEVOG DELA*/}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
           {/*discover*/ }
            <p onClick={(e)=> openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
              <Discover />
            </div>
            )}
          </div>
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e)=>openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>
          {/*//NOTIFIKACIJA*/}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
             className={Style.notify}
             onClick={()=>openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/*//NAPRAVI DUGNE*/}
          <div className={Style.navbar_container_right_button}>
            <Button btnText='Kreiraj' handleClick={()=>{}}/>
          </div>
          {/*//PROFIL*/}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image src={images.user1} alt="Profil" width={40} height={40} onClick={()=>openProfile()} className={Style.navbar_container_right_profile}
              />

            {profile && <Profile/>}  

            </div>
          </div>

          {/*Menu button */}

        </div>
      </div>
    </div>
  )
}

export default NavBar