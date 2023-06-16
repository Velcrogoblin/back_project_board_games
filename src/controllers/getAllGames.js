const { Game } = require ("../db");

const GET_ALL_GAMES = async (res) => {
    try {
        let games = await Game.findAll();
        if (games.length === 0) {
            return res.status(404).json({message: "No games were found"});
        }
        return res.status(200).json(games);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
}

module.exports = GET_ALL_GAMES;