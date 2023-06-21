const { Router } = require("express");
const {postDesigner, getAllDesigners} = require("../controllers/controllerDesigner");

const router = Router();

router
.get("/", getAllDesigners)
.post("/", postDesigner)

module.exports = router;
