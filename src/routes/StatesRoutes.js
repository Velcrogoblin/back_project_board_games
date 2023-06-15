const { Router } = require("express");
const {
  getAllStates,
  getStateById,
  searchStatesByName,
  createState,
  updateState,
  deleteState,
} = require("../controllers/StateController");
const router = Router();

// router.get("/", getAllStates).post("/", createState);

router.get("/", getAllStates);
router.get("/:id_state", getStateById);
router.get("/name", searchStatesByName);
router.post("/", createState);
router.put("/:id_state", updateState);
router.delete("/:id_state", deleteState);
module.exports = router;
