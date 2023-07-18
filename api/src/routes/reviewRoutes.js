const { Router } = require("express");

const {
  getAllReviews,
  postReviews,
} = require("../controllers/reviewController");

const router = Router();

router.get("/", getAllReviews);
router.post("/", postReviews);

module.exports = router;
