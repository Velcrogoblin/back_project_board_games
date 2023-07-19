const { Router } = require("express");

const {
  getAllReviews,
  getReviewByIdUser,
  getReviewsByIdGame,
  postReviews,
  deleteReviewById,
} = require("../controllers/reviewController");

const router = Router();

router.get("/", getAllReviews);
router.get("/idUser/:id", getReviewByIdUser);
router.get("/idGame/:id", getReviewsByIdGame);
router.post("/", postReviews);
router.delete("/id/:id", deleteReviewById);

module.exports = router;
