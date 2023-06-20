const { Game, Designer, Editorial, Language, Category, Mechanic, Thematic, Author, Op } = require ("../db.js");

const getGamesByName = async (req, res) => {
    try {
        const { name } = req.query;

        let gameByName = await Game.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%",
                },
            },
            include: [{model: Author}, {model: Category}, {model: Designer}, {model: Editorial}, {model: Language}, {model: Mechanic}, {model: Thematic}]
        });

        if (gameByName.length === 0) {
            return res.status(404).json({message: `No games were found with name ${name}`});
        }
        return res.status(200).json(gameByName);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
}

module.exports = {
    getGamesByName
};