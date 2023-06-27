const { Router } = require("express");

const {
  getAllAuthors,
  deleteAuthor,
  putAuthor,
  postAuthor,
} = require("../controllers/authorController");

const router = Router();

router
  .get("/", getAllAuthors)
  .post("/", postAuthor)
  .delete("/:id", deleteAuthor)
  .put("/", putAuthor);

module.exports = router;
