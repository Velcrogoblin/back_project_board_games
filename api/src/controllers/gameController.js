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
      where: { active: true },
      include: [
        { model: Editorial },
        { model: Author },
        { model: Category },
        { model: Designer },
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
    stock,
    image,
    weight,
    playing_time,
    author_name,
    editorial_name,
    categories_name,
    designers_name,
    languages_name,
    mechanics_name,
    thematics_name,
  } = req.body;

  try {
    if (!name) return res.status(406).json({ message: "name is required" });
    if (!released)
      return res.status(406).json({ message: "released is required" });
    if (!price) return res.status(406).json({ message: "price is required" });
    if (!age) return res.status(406).json({ message: "age is required" });
    if (!players_min)
      return res.status(406).json({ message: "players_min is required" });
    if (!players_max)
      return res.status(406).json({ message: "players_max is required" });

    if (!stock) return res.status(406).json({ message: "stock is required" });
    if (!image) return res.status(406).json({ message: "image is required" });
    if (!playing_time)
      return res.status(406).json({ message: "playing_time is required" });
    if (!author_name)
      return res.status(406).json({ message: "author_name is required" });

    if (!editorial_name)
      return res.status(406).json({ message: "editorial_name is required" });
    if (!categories_name)
      return res.status(406).json({ message: "categories_name is required" });
    if (!designers_name)
      return res.status(406).json({ message: "designers_name is required" });
    if (!languages_name)
      return res.status(406).json({ message: "languages_name is required" });
    if (!mechanics_name)
      return res.status(406).json({ message: "mechanics_name is required" });
    if (!thematics_name)
      return res.status(406).json({ message: "thematics_name is required" });

    const existingGame = await Game.findOne({ where: { name: name } });

    if (existingGame) {
      return res.status(406).json({ message: `${name} already exists.` });
    }

    const editorial = await Editorial.findOne({
      where: { editorial_name },
    });

    const author = await Author.findOne({ where: { author_name } });

    const categories = await Category.findAll({
      where: { category_name: categories_name },
    });
    const designers = await Designer.findAll({
      where: { designer_name: designers_name },
    });
    const languages = await Language.findAll({
      where: { language_name: languages_name },
    });
    const mechanics = await Mechanic.findAll({
      where: { mechanic_name: mechanics_name },
    });
    const thematics = await Thematic.findAll({
      where: { thematic_name: thematics_name },
    });

    const newGame = await Game.create({
      name,
      released,
      price,
      age,
      players_min,
      players_max,
      stock,
      image,
      weight,
      playing_time,
    });

    await newGame.setAuthor(author);
    await newGame.setEditorial(editorial);
    await newGame.addCategories(categories);
    await newGame.addDesigners(designers);
    await newGame.addLanguages(languages);
    await newGame.addMechanics(mechanics);
    await newGame.addThematics(thematics);

    return res
      .status(201)
      .json({ message: `Game ${name} created successfuly` });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(status).json({ message: message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "id is invalid" });
    }

    let response = await Game.findByPk(id);
    await response.update({ active: false });
    return res.status(200).json({ message: "Game was deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroyGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "id is invalid" });
    }

    let response = await Game.findByPk(id);
    await response.destroy();
    return res.status(200).json({ message: "Game was destroyed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putGameOnSale = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "id is invalid" });
    }

    let response = await Game.findByPk(id);
    if (!response) {
      return res.status(404).json({ message: "Game was not found" });
    }
    await response.update({ on_sale: true });
    return res.status(200).json({ message: "Sale was updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putGame = async (req, res) => {
  const {
    id,
    name,
    released,
    price,
    age,
    players_min,
    players_max,
    stock,
    image,
    weight,
    playing_time,
    author_name,
    categories_name,
    designers_name,
    editorial_name,
    languages_name,
    mechanics_name,
    thematics_name,
  } = req.body;

  try {
    if (
      !id ||
      !name ||
      !released ||
      !price ||
      !age ||
      !players_min ||
      !players_max ||
      !stock ||
      !image ||
      !weight ||
      !playing_time ||
      !author_name ||
      categories_name.length === 0 ||
      designers_name.length === 0 ||
      !editorial_name ||
      languages_name.length === 0 ||
      mechanics_name.length === 0 ||
      thematics_name.length === 0
    ) {
      return res.status(406).json({ message: "There is missing information." });
    }

    const existingGame = await Game.findByPk(id);
    if (!existingGame) {
      return res.status(400).json({ message: `No games with ${id}` });
    }

    const author = await Author.findOne({ where: { author_name } });
    if (!author) {
      return res
        .status(406)
        .json({ message: `Author ${author_name} does not exist` });
    }

    const categories = await Promise.all(
      categories_name.map(async (category) => {
        const data = await Category.findOne({
          where: { category_name: category },
        });

        if (!data) {
          throw {
            message: `Category ${category} does not exist`,
            statusCode: 404,
          };
        }

        return data.dataValues.category_id;
      })
    );

    const designers = await Promise.all(
      designers_name.map(async (designer) => {
        const data = await Designer.findOne({
          where: { designer_name: designer },
        });

        if (!data) {
          throw {
            message: `Designer ${designer} does not exist`,
            statusCode: 404,
          };
        }

        return data.dataValues.designer_id;
      })
    );

    const languages = await Promise.all(
      languages_name.map(async (language) => {
        const data = await Language.findOne({
          where: { language_name: language },
        });

        if (!data) {
          throw {
            message: `Language ${language} does not exist`,
            statusCode: 404,
          };
        }

        return data.dataValues.id_language;
      })
    );

    const mechanics = await Promise.all(
      mechanics_name.map(async (mechanic) => {
        const data = await Mechanic.findOne({
          where: { mechanic_name: mechanic },
        });

        if (!data) {
          throw {
            message: `Mechanic ${mechanic} does not exist`,
            statusCode: 404,
          };
        }

        return data.dataValues.mechanic_id;
      })
    );

    const thematics = await Promise.all(
      thematics_name.map(async (thematic) => {
        const data = await Thematic.findOne({
          where: { thematic_name: thematic },
        });

        if (!data) {
          throw {
            message: `Thematic ${thematic} does not exist`,
            statusCode: 404,
          };
        }

        return data.dataValues.thematic_id;
      })
    );

    const editorial = await Editorial.findOne({ where: { editorial_name } });
    if (!editorial) {
      return res
        .status(406)
        .json({ message: `Editorial ${editorial_name} does not exist` });
    }

    await existingGame.update({
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
      editorial_name,
    });

    await existingGame.setCategories([]);
    await existingGame.addCategories(categories);

    await existingGame.setLanguages([]);
    await existingGame.addLanguages(languages);

    await existingGame.setDesigners([]);
    await existingGame.addDesigners(designers);

    await existingGame.setMechanics([]);
    await existingGame.addMechanics(mechanics);

    await existingGame.setThematics([]);
    await existingGame.addThematics(thematics);

    return res
      .status(200)
      .json({ message: "Your game was successfully updated" });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(status).json({ message: message });
  }
};

module.exports = {
  putGameOnSale,
  putGame,
  deleteGame,
  getAllGames,
  getGamesById,
  getGamesByName,
  createGame,
  destroyGame,
};
