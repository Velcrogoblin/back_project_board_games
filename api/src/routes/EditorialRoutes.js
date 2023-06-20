const { Router } = require("express");
const getAllEditorials = require("../controllers/getAllEditorials");
const createEditorial = require("../controllers/createEditorial");
const router = Router();


router
.get("/", getAllEditorials)
.post("/", createEditorial);

module.exports = router;
