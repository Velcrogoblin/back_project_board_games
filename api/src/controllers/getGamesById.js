const { Game, Designer, Editorial, Language, Category, Mechanic, Thematic, Author } = require ("../db.js");

const getGamesById = async (req, res) => {
    try {
        const { id } = req.params;

        let gameById = await Game.findByPk(id, {
            include: [{model: Author}, {model: Category}, {model: Designer}, {model: Editorial}, {model: Language}, {model: Mechanic}, {model: Thematic}]});

        !gameById && res.status(404).json({message: `No games were found with id ${id}`});
        
        return res.status(200).json(gameById);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
}

module.exports = getGamesById;