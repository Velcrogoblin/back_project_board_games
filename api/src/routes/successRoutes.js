const { Router } = require("express");

const { success, failure, pending } = require("../controllers/statePayment");

const router = Router();

router.get("/", success);

module.exports = router;
