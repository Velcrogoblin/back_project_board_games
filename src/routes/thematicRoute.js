const { Router } = require("express");

const { GET_ALL_THEMATICS } = require("../controllers/getAllThematic");
const { POST_THEMATICS } = require("../controllers/postThematic");

const router = Router();

router.get("/", GET_ALL_THEMATICS).post("/", POST_THEMATICS);

module.exports = router;
