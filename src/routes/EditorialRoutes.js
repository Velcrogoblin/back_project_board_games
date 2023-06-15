const { Router } = require("express");
const {
  getAllEditorials,
  getEditorialById,
  searchEditorialsByDescription,
  createEditorial,
  updateEditorial,
  deleteEditorial,
} = require("../controllers/EditorialController");
const router = Router();

// router.get("/", getAllEditorials).post("/", createEditorial);

router.get("/", getAllEditorials);
router.get("/:id_editorial", getEditorialById);
router.get("/description", searchEditorialsByDescription);
router.post("/", createEditorial);
router.put("/:id_editorial", updateEditorial);
router.delete("/:id_editorial", deleteEditorial);
module.exports = router;
