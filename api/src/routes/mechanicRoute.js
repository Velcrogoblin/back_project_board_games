const { Router } = require("express");
const {
  getAllMechanics,
  postMechanic,
  deleteMechanic,
  putMechanic,
} = require("../controllers/mechanicsController");

const router = Router();

router.get("/", getAllMechanics)
  .post("/", postMechanic)
  .delete("/:id", deleteMechanic)
  .put("/", putMechanic);

module.exports = router;
