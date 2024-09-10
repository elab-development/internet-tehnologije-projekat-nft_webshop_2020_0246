const express = require("express");
const userControllers = require("./../controllers/userControllers");
const authControllers = require("./../controllers/authControllers");

const router = express.Router();


router.post("/signup",authControllers.signup);
router.post("/login",authControllers.login);

//ROUTERS USERS
router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route("/:id")
  .get(userControllers.getSingleUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;