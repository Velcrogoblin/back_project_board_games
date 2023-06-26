const { Router } = require("express");
const {
  getAllLanguages,
  postLanguage,
  deleteLanguage,
  putEditorial,
} = require("../controllers/languagueController");

const router = Router();

router
  .get("/", getAllLanguages)
  .post("/", postLanguage)
  .delete("/:id", deleteLanguage)
  .put("/", putEditorial);

module.exports = router;
