const { Router } = require("express");
const { getUsers, getUserById, createUser, deleteUser, putUser, addShippingAddress, getShippingAddressById } = require("../controllers/userController");

const router = Router();

router.get("/", getUsers)
  .get("/:id", getUserById)
  .get("/shippingaddress/:id", getShippingAddressById)
  .post("/", createUser)
  .post("/shippingaddress", addShippingAddress)
  .delete("/:uid", deleteUser)
  .put("/", putUser);

module.exports = router;