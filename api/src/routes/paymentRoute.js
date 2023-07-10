const { Router } = require("express");

const { createOrder, payment } = require("../controllers/paymentController");

const router = Router();

router.post("/", createOrder);
router.get("/payment", payment);

module.exports = router;
