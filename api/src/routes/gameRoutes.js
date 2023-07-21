const { Router } = require("express");

const {
  getAllGames,
  getAllGamesForAdmin,
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
  .get("/admin", getAllGamesForAdmin)
  .get("/id/:id", getGamesById)
  .get("/name", getGamesByName)
  .post("/", createGame)
  .put("/delete/:id", deleteGame)
  .put("/:id", putGameOnSale)
  .put("/", putGame)
  .delete("/:id", destroyGame)

module.exports = router;
