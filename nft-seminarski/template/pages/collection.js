import React from 'react'

import Style from "../styles/collection.module.css"
import images from "../img"
import {Banner, CollectionProfile, NFTCardTwo} from "../collectionPage/collectionIndex"
import { Filter } from '@/components/componentindex'

const collection = () => {

const collectionArray = [
  images.nft_image_1,
  images.nft_image_2,
  images.nft_image_3,
  images.nft_image_1,
  images.nft_image_2,
  images.nft_image_3,
];

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1}/>
      <CollectionProfile/>
      <Filter/>
      <NFTCardTwo NFTData={collectionArray}/>
      
    </div>
  )
}

export default collection