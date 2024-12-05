import React, {useState, useEffect} from "react";
import axios from "axios";

export const NftContext = React.createContext();

export const NftProvider = ({children})=>{
    const getData = async()=>{
        const URL = "http://localhost:3000/api/v1/nfts";

        axios.get(URL).then((res)=>{
            const data = res.data;
            console.log(data);
        });
    };


    useEffect(()=>{
        getData();
    },[]);
    return <NftContext.Provider value={{}}>{children}</NftContext.Provider>
};