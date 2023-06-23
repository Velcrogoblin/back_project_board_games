const { Router } = require("express");
const {
  getAllThematics,
  postThematic,
  deleteThematic,
  putThematic,
} = require("../controllers/themathicsController");

const router = Router();

router.get("/", getAllThematics)
  .post("/", postThematic)
  .delete("/:id", deleteThematic)
  .put("/", putThematic);

module.exports = router;
