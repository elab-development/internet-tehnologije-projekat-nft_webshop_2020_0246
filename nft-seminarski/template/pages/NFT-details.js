import React from "react";

//INTERNAL IMPORT
import { Category} from "../components/componentindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Category />
      
    </div>
  );
};

export default NFTDetails;