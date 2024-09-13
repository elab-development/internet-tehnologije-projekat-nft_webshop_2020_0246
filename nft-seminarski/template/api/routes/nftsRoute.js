const express = require("express");
const nftControllers = require("./../controllers/nftControllers");
const authControllers = require("../controllers/authControllers");
const router = express.Router();
// router.param("id", nftControllers.checkId);

//TOP 5 NFTs BY PRICE
router
  .route("/top-5-nfts")
  .get(nftControllers.aliasTopNFTs, nftControllers.getAllNfts);

//STATS ROUTE
router.route("/nfts-stats").get(nftControllers.getNFTsStats);

//GET MONTHLY PLAN
router.route("/monthly-plan/:year").get(nftControllers.getMonthlyPlan);

//ROUTER NFTs
router
  .route("/")
  .get(//authControllers.protect,
     nftControllers.getAllNfts)
  // .post(nftControllers.checkBody, nftControllers.createNFT);
  .post(nftControllers.createNFT);

router
  .route("/:id")
  .get(nftControllers.getSingleNFT)
  .patch(nftControllers.updateNFT)
  .delete(authControllers.protect,authControllers.restrictTo("admin","guide"),
  nftControllers.deleteNFT);

module.exports = router;