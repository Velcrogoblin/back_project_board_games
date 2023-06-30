const { Router } = require("express");
const { getShippingAddressById, createShippingAddress, deleteShippingAddress, /*putShippingAddress*/ } = require("../controllers/shippingAddressController");

const router = Router();

router.get("/:id", getShippingAddressById)
    .post("/", createShippingAddress)
    .delete("/:id", deleteShippingAddress)
// .put("/", putShippingAddress);

module.exports = router;