const { Router } = require("express");

const { getAllGames } = require("../controllers/getAllGames");
const { getGamesById } = require("../controllers/getGamesById");
const { getGamesByName } = require("../controllers/getGamesByName");
const { createGame } = require("../controllers/postGame");
const router = Router();

router
  .get("/", getAllGames)
  .get("/id/:id", getGamesById)
  .get("/name", getGamesByName)
  .post("/", createGame);

module.exports = router;
