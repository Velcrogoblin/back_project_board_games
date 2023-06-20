const { Router } = require("express");

const { GET_ALL_MECHANICS } = require("../controllers/getAllMechanics");
const { GET_MECHANICS } = require("../controllers/postMechanic");

const router = Router();

router.get("/", GET_ALL_MECHANICS).post("/mechanic", CREATE_MECHANIC);

module.exports = router;
