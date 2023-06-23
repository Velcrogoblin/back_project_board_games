const { Router } = require("express");

const {
  getAllAuthors,
  postAuthor,
} = require("../controllers/authorController");

const router = Router();

router.get("/", getAllAuthors).post("/", postAuthor);

module.exports = router;
