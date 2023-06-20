const { Game, Designer, Editorial, Language, Category, Mechanic, Thematic, Author } = require ("../db");

const getAllGames = async (req, res) => {
    try {
        let games = await Game.findAll({
            include: [{model: Author}, {model: Category}, {model: Designer}, {model: Editorial}, {model: Language}, {model: Mechanic}, {model: Thematic}]});

        games.length === 0 && res.status(404).json({message: "No games were found"});
        
        return res.status(200).json(games);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
};

module.exports = getAllGames;