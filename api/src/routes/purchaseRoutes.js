const { Router } = require("express");

const {
  getAllPurchase,
  postPurchase,
} = require("../controllers/purchaseController");

const router = Router();

router.get("/", getAllPurchase);
router.post("/", postPurchase);

module.exports = router;
