const { Router } = require("express");
const {
  getAllCategories,
  postCategory,
  deleteCategory,
  putCategory,
} = require("../controllers/categoryController");

const router = Router();

router
  .get("/", getAllCategories)
  .post("/", postCategory)
  .delete("/:id", deleteCategory)
  .put("/", putCategory);

module.exports = router;
