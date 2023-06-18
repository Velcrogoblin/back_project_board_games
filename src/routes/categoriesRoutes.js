const { Router } = require("express");
const getAllCategories = require("../controllers/getAllCategories");
const createCategory = require("../controllers/createCategory");

const router = Router();

router.get("/", getAllCategories);
router.post("/", createCategory);

module.exports = router;
