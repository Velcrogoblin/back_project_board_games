const { Router } = require("express");
const {getAllThematics, postThematic} = require("../controllers/controllerThemathics");

const router = Router();

router
.get("/", getAllThematics)
.post("/", postThematic);

module.exports = router;
