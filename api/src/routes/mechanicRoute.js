const { Router } = require("express");

const { getAllMechanics } = require("../controllers/getAllMechanics");
const { createMechanic } = require("../controllers/postMechanic");

const router = Router();

router
.get("/", getAllMechanics)
.post("/", createMechanic);


module.exports = router;
