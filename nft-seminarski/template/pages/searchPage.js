import React from 'react'


import Style from "../styles/searchPage.module.css"
//import slider KOJI NEMAM
import { SearchBar } from '@/searchPage/searchPageindex'
import { Filter } from '@/components/componentindex'
import { NFTCardTwo, Banner } from '@/collectionPage/collectionIndex'
import images from "../img";

const searchPage = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,

  ]

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2}/>
      <SearchBar/>
      <Filter/>
      <NFTCardTwo NFTData={collectionArray}/>
    </div>
  )
}

export default searchPage