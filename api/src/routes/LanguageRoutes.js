const { Router } = require("express");
const getAllLanguages = require ("../controllers/getAllLanguages");
const createLanguage = require ("../controllers/createLanguage");

const router = Router();

router
.get("/", getAllLanguages)
.post("/", createLanguage);

module.exports = router;
