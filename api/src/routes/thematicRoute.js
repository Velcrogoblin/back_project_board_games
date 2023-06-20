const { Router } = require("express");

const getAllThematics = require("../controllers/getAllThematics");
const postThematic = require("../controllers/postThematic");

const router = Router();

router.get("/", getAllThematics).post("/", postThematic);

module.exports = router;
