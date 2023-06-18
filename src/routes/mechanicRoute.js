const { Router } = require("express");

const { GET_ALL_MECHANICS } = require("../controllers/getAllMechanics");

const router = Router();

router.get("/", GET_ALL_MECHANICS);

module.exports = router;
