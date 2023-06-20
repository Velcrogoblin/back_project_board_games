const { Router } = require("express");
const {getAllLanguages, postLanguage} = require ("../controllers/controllerLanguage");

const router = Router();

router
.get("/", getAllLanguages)
.post("/", postLanguage);

module.exports = router;
