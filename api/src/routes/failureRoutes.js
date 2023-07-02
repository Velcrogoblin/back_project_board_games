const { Router } = require("express");

const { failure } = require("../controllers/statePayment");

const router = Router();

router.get("/", failure);

module.exports = router;
