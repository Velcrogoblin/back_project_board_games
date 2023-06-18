const { Router } = require("express");
const { getAllGames } = require("../controllers/gameController");

const router = Router();

router.get("/", getAllGames);

module.exports = router;
