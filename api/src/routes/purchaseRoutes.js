const { Router } = require("express");

const {
  getAllPurchase,
  getPurchaseByIdUser,
  getPurchaseById,
  postPurchase,
  deletePurchase,
  destroyPurchase,
} = require("../controllers/purchaseController");

const router = Router();

router.get("/", getAllPurchase);
router.get("/idUser/:id", getPurchaseByIdUser);
router.get("/id/:id", getPurchaseById);
router.post("/", postPurchase);
router.delete("/id/:id", deletePurchase);
router.delete("/destroy/:id", destroyPurchase);

module.exports = router;
