const { Router } = require("express");

const {
  getAllGames,
  getGamesById,
  getGamesByName,
  createGame,
  deleteGame,
  putGameOnSale,
  putGame,
} = require("../controllers/gameController");

const router = Router();

router
  .get("/", getAllGames)
  .get("/id/:id", getGamesById)
  .get("/name", getGamesByName)
  .post("/", createGame)
  .delete("/id/:id", deleteGame)
  .put("/id/:id", putGameOnSale)
  .put("/", putGame);

module.exports = router;
