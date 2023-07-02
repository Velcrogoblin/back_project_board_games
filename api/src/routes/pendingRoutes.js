const { Router } = require("express");

const { pending } = require("../controllers/statePayment");

const router = Router();

router.get("/", pending);

module.exports = router;
