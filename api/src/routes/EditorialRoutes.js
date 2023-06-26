const { Router } = require("express");
const {
  getAllEditorials,
  postEditorial,
  deleteEditorial,
  putEditorial,
} = require("../controllers/editorialController");
const router = Router();

router
  .get("/", getAllEditorials)
  .post("/", postEditorial)
  .delete("/:id", deleteEditorial)
  .put("/", putEditorial);

module.exports = router;
