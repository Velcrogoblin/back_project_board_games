const { Router } = require("express");
const { getUsers, getUserById, createUser, deleteUser, putUser, addShippingAddress, getShippingAddressById, verifyEmail, editWish_list } = require("../controllers/userController");

const router = Router();

router.get("/", getUsers)
  .get("/:user_id", getUserById)
  .get("/shippingaddress/:id", getShippingAddressById)
  .post("/", createUser)
  .post("/shippingaddress", addShippingAddress)
  .delete("/:user_id", deleteUser)
  .put("/", putUser)
  .put("/verifyemail/:id", verifyEmail)
  .put("/wishList", editWish_list);
  
module.exports = router;