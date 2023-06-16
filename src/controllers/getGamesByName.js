const { Game } = require ("../db");

const GET_GAMES_BY_NAME = async (req, res) => {
    try {
        const { name } = req.query;

        let gameByName = await Game.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%",
                },
            },
        });

        if (gameByName.length === 0) {
            return res.status(404).json({message: `No games were found with name ${name}`});
        }
        return res.status(200).json(gameByName);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
}

module.exports = GET_GAMES_BY_NAME;