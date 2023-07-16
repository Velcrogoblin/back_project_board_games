const { Router } = require("express");

const {
  getAllPurchase,
  postPurchase,
  deletePurchase,
} = require("../controllers/purchaseController");

const router = Router();

router.get("/", getAllPurchase);
router.post("/", postPurchase);
router.delete("/:id", deletePurchase);

module.exports = router;
