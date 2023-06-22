const { Router } = require("express");
const {
  getAllMechanics,
  postMechanic,
} = require("../controllers/mechanicsController");

const router = Router();

router.get("/", getAllMechanics).post("/", postMechanic);

module.exports = router;
