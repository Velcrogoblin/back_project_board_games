const { Router } = require("express");
const {
  getAllCategories,
  postCategory,
} = require("../controllers/categoryController");

const router = Router();

router.get("/", getAllCategories).post("/", postCategory);

module.exports = router;
