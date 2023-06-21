const { Router } = require("express");
const {
  getAllLanguages,
  postLanguage,
} = require("../controllers/languagueController");

const router = Router();

router.get("/", getAllLanguages).post("/", postLanguage);

module.exports = router;
