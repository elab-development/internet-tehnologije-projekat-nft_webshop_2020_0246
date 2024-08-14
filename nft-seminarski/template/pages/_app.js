import "@/styles/globals.css";
//internal import
import {NavBar,Button,Footer} from "@/components/componentindex";

const MyApp = ({ Component, pageProps }) =>(
    <div>
      <NavBar />
      <Component {...pageProps} />
    </div>  

);

export default MyApp;
