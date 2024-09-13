import React, {useEffect, useState, useContext} from 'react'


import Style from "../styles/searchPage.module.css"
//import slider KOJI NEMAM
import { SearchBar } from '@/searchPage/searchPageindex'
import { Filter } from '@/components/componentindex'
import { NFTCardTwo, Banner } from '@/collectionPage/collectionIndex'
import images from "../img";

import { NFTMarketplaceContext } from '@/Context/NFTMarketPlaceContext'

const searchPage = () => {

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const[nfts,setNfts] = useState([]);
  const[nftsCopy,setNftsCopy] = useState([]);

useEffect(()=>{
  fetchNFTs().then((item)=>{
    setNfts(item.reverse());
    setNftsCopy(item);
    console.log(nfts);
  })
})

const onHandleSearch = (value)=>{
  const filteredNFTs = nfts.filter(({name})=>
  name.toLowerCase().includes(value.toLowerCase())
  );

  if(filteredNFTs.length===0){
    setNfts(nftsCopy);
  }else{
    setNfts(filteredNFTs);
  }

};

const onClearSearch = ()=>{
  if(nfts.length && nftsCopy.length){
    setNfts(nftsCopy);
  }
}

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
      <SearchBar  onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
      <Filter/>
      <NFTCardTwo NFTData={nfts}/>
    </div>
  )
}

export default searchPage