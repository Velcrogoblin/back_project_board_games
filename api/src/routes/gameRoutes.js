const { Router } = require("express");

const {
  getAllGames,
  getGamesById,
  getGamesByName,
  createGame,
  deleteGame,
  putGameOnSale,
  putGame,
  destroyGame
} = require("../controllers/gameController");

const router = Router();

router
  .get("/", getAllGames)
  .get("/id/:id", getGamesById)
  .get("/name", getGamesByName)
  .post("/", createGame)
  .put("/id/:id", deleteGame)
  .put("/id/:id", putGameOnSale)
  .put("/", putGame)
  .delete("/id/:id", destroyGame)

module.exports = router;
