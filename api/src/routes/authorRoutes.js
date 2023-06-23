const { Router } = require("express");
const {
  postAuthor,
  getAllAuthors,
  deleteAuthor,
  putAuthor
} = require("../controllers/authorController");

const router = Router();

router.get("/", getAllAuthors)
  .post("/", postAuthor)
  .delete("/:id", deleteAuthor)
  .put("/", putAuthor);


module.exports = router;
