const { Router } = require("express");
const {
  postAuthor,
  getAllAuthors,
} = require("../controllers/authorController");

const router = Router();

router.get("/", getAllAuthors).post("/", postAuthor);

module.exports = router;
