const { Router } = require("express");

const { GET_ALL_GAMES } = require("../controllers/getAllGames");
const { GET_GAMES_BY_ID } = require("../controllers/getGamesById");
const { GET_GAMES_BY_NAME } = require("../controllers/getGamesByName");
const { CREATE_GAME } = require("../controllers/postGame");
const router = Router();

router
  .get("/", GET_ALL_GAMES)
  .get("/id/:id", GET_GAMES_BY_ID)
  .get("/name", GET_GAMES_BY_NAME)
  .post("/game", CREATE_GAME)
  .get("/name", GET_GAMES_BY_NAME);

module.exports = router;
