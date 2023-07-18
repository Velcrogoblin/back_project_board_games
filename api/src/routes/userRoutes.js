const { Router } = require("express");
const { getUsers, getUserById, createUser, deleteUser, putUser, addShippingAddress, getShippingAddressById, editWish_list } = require("../controllers/userController");

const router = Router();

router.get("/", getUsers)
  .get("/:id", getUserById)
  .get("/shippingaddress/:id", getShippingAddressById)
  .post("/", createUser)
  .post("/shippingaddress", addShippingAddress)
  .delete("/:uid", deleteUser)
  .put("/", putUser)
  .put("/wishList", editWish_list);
module.exports = router;