const { Router } = require("express");
const {
  getAllFaqs,
  postFaq,
  deleteFaq,
  putFaq,
  getFaqsByQuestion,
} = require("../controllers/faqController");

const router = Router();

router
  .get("/", getAllFaqs)
  .post("/", postFaq)
  .delete("/:id", deleteFaq)
  .put("/", putFaq)
  .get("/search", getFaqsByQuestion);

/* localhost:3001/faqs/search?question=tiempo */

http: module.exports = router;
