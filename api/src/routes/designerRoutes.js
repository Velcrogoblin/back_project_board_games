const { Router } = require("express");
const {
  postDesigner,
  getAllDesigners,
  deleteDesigner,
  putDesigner,
} = require("../controllers/designerController");

const router = Router();

router
  .get("/", getAllDesigners)
  .post("/", postDesigner)
  .delete("/:id", deleteDesigner)
  .put("/", putDesigner);

module.exports = router;
