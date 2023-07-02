const { Router } = require("express");

const { createOrder } = require("../controllers/paymentController");

const router = Router();

router.post("/", createOrder);

module.exports = router;
