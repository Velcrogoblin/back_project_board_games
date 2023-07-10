const { Router } = require("express");
const {
  getAllThematics,
  postThematic,
  deleteThematic,
  putThematic,
  destroyThematic,
} = require("../controllers/themathicsController");

const router = Router();

router
  .get("/", getAllThematics)
  .post("/", postThematic)
  .put("/:id", deleteThematic)
  .put("/", putThematic)
  .delete("/:id", destroyThematic)

module.exports = router;
