const { Router } = require("express");
const {
  getAllLanguages,
  getLanguageById,
  searchLanguagesByName,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/LanguageController");
const router = Router();

// router.get("/", getAllLanguages).post("/", createLanguage);

router.get("/", getAllLanguages);
router.get("/:id_language", getLanguageById);
router.get("/name", searchLanguagesByName);
router.post("/", createLanguage);
router.put("/:id_language", updateLanguage);
router.delete("/:id_language", deleteLanguage);
module.exports = router;
