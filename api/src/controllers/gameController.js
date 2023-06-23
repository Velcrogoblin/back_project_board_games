const {
  Game,
  Designer,
  Editorial,
  Language,
  Category,
  Mechanic,
  Thematic,
  Author,
  Op,
} = require("../db");

const getAllGames = async (req, res) => {
  try {
    let games = await Game.findAll({
      include: [
        { model: Author },
        { model: Category },
        { model: Designer },
        { model: Editorial },
        { model: Language },
        { model: Mechanic },
        { model: Thematic },
      ],
    });

    if (games.length === 0) {
      return res.status(404).json({ message: "No games were found" });
    }

    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getGamesByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name || name.length === 0) {
      return res.status(400).json({ message: "No name was provided" });
    }

    let gameByName = await Game.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: [
        { model: Author },
        { model: Category },
        { model: Designer },
        { model: Editorial },
        { model: Language },
        { model: Mechanic },
        { model: Thematic },
      ],
    });

    if (gameByName.length === 0) {
      return res
        .status(404)
        .json({ message: `No games were found with name ${name}` });
    }

    return res.status(200).json(gameByName);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getGamesById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id was provided" });
    }

    let gameById = await Game.findByPk(id, {
      include: [
        { model: Author },
        { model: Category },
        { model: Designer },
        { model: Editorial },
        { model: Language },
        { model: Mechanic },
        { model: Thematic },
      ],
    });

    if (!gameById) {
      return res
        .status(404)
        .json({ message: `No games were found with id ${id}` });
    }

    return res.status(200).json(gameById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createGame = async (req, res) => {
  const {
    name,
    released,
    price,
    age,
    players_min,
    players_max,
    rating,
    stock,
    image,
    weight,
    playing_time,
    author_name,
    category_name,
    designer_name,
    editorial_name,
    language_name,
    mechanic_name,
    thematic_name,
  } = req.body;

  if (
    !name ||
    !released ||
    !price ||
    !age ||
    !players_min ||
    !players_max ||
    !rating ||
    !stock ||
    !image ||
    !weight ||
    !playing_time ||
    !author_name ||
    !category_name ||
    !designer_name ||
    !editorial_name ||
    !language_name ||
    !mechanic_name ||
    !thematic_name
  ) {
    return res.status(406).json({ message: "There is missing information." });
  }

  const existingGame = await Game.findOne({ where: { name: name } });

  if (existingGame) {
    return res.status(406).json({ message: `${name} already exists.` });
  }

  const author = await Author.findOne({ where: { author_name } });
  const category = await Category.findOne({ where: { category_name } });
  const designer = await Designer.findOne({ where: { designer_name } });
  const editorial = await Editorial.findOne({ where: { editorial_name } });
  const language = await Language.findOne({ where: { language_name } });
  const mechanics = await Mechanic.findOne({ where: { mechanic_name } });
  const thematics = await Thematic.findOne({ where: { thematic_name } });

  if (!author) {
    return res.status(406).json({ message: `${author_name} does not exist` });
  }
  if (!category) {
    return res.status(406).json({ message: `${category_name} does not exist` });
  }
  if (!designer) {
    return res.status(406).json({ message: `${designer_name} does not exist` });
  }
  if (!editorial) {
    return res
      .status(406)
      .json({ message: `${editorial_name} does not exist` });
  }
  if (!language) {
    return res.status(406).json({ message: `${language_name} does not exist` });
  }
  if (!mechanics) {
    return res.status(406).json({ message: `${mechanic_name} does not exist` });
  }
  if (!thematics) {
    return res.status(406).json({ message: `${thematic_name} does not exist` });
  }

  try {
    const newGame = await Game.create({
      name,
      released,
      price,
      age,
      players_min,
      players_max,
      rating,
      stock,
      image,
      weight,
      playing_time,
    });

    await newGame.setAuthor(author);
    await newGame.addCategories(category);
    await newGame.addDesigners(designer);
    await newGame.setEditorial(editorial);
    await newGame.addLanguages(language);
    await newGame.setMechanic(mechanics);
    await newGame.setThematic(thematics);

    return res
      .status(201)
      .json({ message: `Game ${name} created successfuly` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await Game.findByPk(id);
    await response.update({ active: false });
    return res.status(200).json({ message: "Game was deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteGame,
  getAllGames,
  getGamesById,
  getGamesByName,
  createGame,
};
