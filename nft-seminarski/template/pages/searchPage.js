import React, {useEffect, useState, useContext} from 'react'
import Style from "../styles/searchPage.module.css"
//import slider KOJI NEMAM
import { SearchBar } from '@/searchPage/searchPageindex'
import { Filter } from '@/components/componentindex'
import { NFTCardTwo, Banner } from '@/collectionPage/collectionIndex'
import images from "../img";

import { NFTMarketplaceContext } from '@/Context/NFTMarketPlaceContext'

const searchPage = () => {

  //const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const[nfts,setNfts] = useState([]);
  const[nftsCopy,setNftsCopy] = useState([]);

  const fetchNFTs = async () => {
    return [
      { id: 1, name: 'Amazing NFT 1', image: images.nft_image_1 },
      { id: 2, name: 'Anakonda NFT 2', image: images.nft_image_2 },
      { id: 3, name: 'Cool NFT 3', image: images.nft_image_3 },
      { id: 4, name: 'Zebra NFT 4', image: images.nft_image_1 },
      { id: 5, name: 'Cool NFT 5', image: images.nft_image_2 },
    ];
  };

useEffect(()=>{
  fetchNFTs().then((items)=>{
    setNfts(items);
    setNftsCopy(items);
    console.log(items);
  })
},[]);

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