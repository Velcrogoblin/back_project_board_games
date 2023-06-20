const { Router } = require("express");

const { getAllMechanics } = require("../controllers/getAllMechanics");

const router = Router();

router.get("/", getAllMechanics);

module.exports = router;
