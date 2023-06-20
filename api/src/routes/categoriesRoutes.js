const { Router } = require("express");
const {getAllCategories, postCategory} = require("../controllers/controllerCategory");

const router = Router();

router
.get("/", getAllCategories)
.post("/", postCategory)

module.exports = router;
