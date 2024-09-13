import "@/styles/globals.css";
//internal import
import {NavBar,Button,Footer} from "@/components/componentindex";
import { NFTMarketplaceProvider } from "@/Context/NFTMarketPlaceContext";

import { NftProvider } from "@/Context/nftContext";


const MyApp = ({ Component, pageProps }) =>(
    <div>
      <NFTMarketplaceProvider>
      <NftProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer/>
        </NftProvider>
      </NFTMarketplaceProvider>
    </div>  

);

export default MyApp;
