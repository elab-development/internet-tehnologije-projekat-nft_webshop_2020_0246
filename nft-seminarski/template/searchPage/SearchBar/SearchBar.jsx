import React, {useEffect,useState,useContext} from 'react'

import { BsSearch, BsArrowRight } from 'react-icons/bs'

import Style from "./SearchBar.module.css"

const SearchBar = ({onHandleSearch, onClearSearch}) => {

  const [search,setSearch] = useState("");
  const [searchItem,setSearchItem] = useState(search);

  useEffect(()=>{
    const timer = setTimeout(()=> setSearch(searchItem),1000);
    return ()=> clearTimeout(timer);
  },[searchItem]);

  useEffect(()=>{
    if(search){
      onHandleSearch(search);
    }else{
      onClearSearch();
    }
  },[search]);

  return (
    <div className={Style.searchBar}>
        <div className={Style.searchBar_box}>
            <BsSearch className={Style.searchBar_box_icon}/>
            <input type='text' placeholder='Unesite naziv ovde'
             onChange={(e)=> setSearchItem(e.target.value)}
             value={searchItem}
            />
            <BsArrowRight className={Style.searchBar_box_icon}/>
        </div>
    </div>
  )
}

export default SearchBar