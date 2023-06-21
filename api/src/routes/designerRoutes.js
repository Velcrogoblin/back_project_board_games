const { Router } = require("express");
const {
  postDesigner,
  getAllDesigners,
} = require("../controllers/designerController");

const router = Router();

router.get("/", getAllDesigners).post("/", postDesigner);

module.exports = router;
