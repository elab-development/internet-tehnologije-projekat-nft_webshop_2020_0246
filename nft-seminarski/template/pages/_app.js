import "@/styles/globals.css";
//internal import
import {NavBar,Button,Footer} from "@/components/componentindex";
import { NFTMarketplaceProvider } from "@/Context/NFTMarketPlaceContext";
const MyApp = ({ Component, pageProps }) =>(
    <div>
      <NFTMarketplaceProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer/>
      </NFTMarketplaceProvider>
    </div>  

);

export default MyApp;
