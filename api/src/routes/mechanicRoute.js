const { Router } = require("express");

const getAllMechanics = require("../controllers/getAllMechanics");
const postMechanic = require("../controllers/postMechanic");

const router = Router();

router
.get("/", getAllMechanics)
.post("/", postMechanic);


module.exports = router;
