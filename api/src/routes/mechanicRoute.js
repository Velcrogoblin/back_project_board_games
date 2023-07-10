const { Router } = require("express");
const {
  getAllMechanics,
  postMechanic,
  deleteMechanic,
  putMechanic,
  destroyMechanic
} = require("../controllers/mechanicsController");

const router = Router();

router
  .get("/", getAllMechanics)
  .post("/", postMechanic)
  .put("/:id", deleteMechanic)
  .put("/", putMechanic)
  .delete("/:id", destroyMechanic)

module.exports = router;
