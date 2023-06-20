const { Router } = require("express");
const {getAllEditorials, postEditorial} = require("../controllers/controllerEditorial");
const router = Router();

router
.get("/", getAllEditorials)
.post("/", postEditorial);

module.exports = router;
