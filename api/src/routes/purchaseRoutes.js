const { Router } = require("express");

const {
  getAllPurchase,
  getPurchaseByIdUser,
  getPurchaseById,
  postPurchase,
  deletePurchase,
  changeStateById
} = require("../controllers/purchaseController");

const router = Router();

router.get("/", getAllPurchase);
router.get("/idUser/:id", getPurchaseByIdUser);
router.get("/id/:id", getPurchaseById);
router.post("/", postPurchase);
router.put("/state", changeStateById);
router.delete("/id/:id", deletePurchase);

module.exports = router;
