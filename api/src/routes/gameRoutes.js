const { Router } = require("express");

const {
  getAllGames,
  getGamesById,
  getGamesByName,
  createGame,
  deleteGame,
  putGame,
} = require("../controllers/gameController");

const router = Router();

router
  .get("/", getAllGames)
  .get("/id/:id", getGamesById)
  .get("/name", getGamesByName)
  .post("/", createGame)
  .delete("/id/:id", deleteGame)
  .put("/id/:id", putGame);

module.exports = router;
