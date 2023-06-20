const { Router } = require("express");

const { getAllGames } = require("../controllers/getAllGames");
const { getGamesById } = require("../controllers/getGamesById");
const { getGamesByName } = require("../controllers/getGamesByName");
const router = Router();

router
  .get("/", getAllGames)
  .get("/id/:id", getGamesById)
  .get("/name", getGamesByName);

module.exports = router;
