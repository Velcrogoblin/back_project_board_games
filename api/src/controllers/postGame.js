const Game = require("../models/Game");
const Author = require("../models/Author");
const Category = require("../models/Category");
const Designer = require("../models/Designer");
const Editorial = require("../models/Editorial");
const Language = require("../models/Language");
const Mechanic = require("../models/Mechanic");
const Thematic = require("../models/Thematic");

const createGame = async (req, res) => {
  const {
    title,
    description,
    year,
    authorId,
    categoryId,
    designerId,
    editorialId,
    languageId,
    mechanicIds,
    thematicIds,
  } = req.body;

  try {
    const author = await Author.findByPk(authorId);
    const category = await Category.findByPk(categoryId);
    const designer = await Designer.findByPk(designerId);
    const editorial = await Editorial.findByPk(editorialId);
    const language = await Language.findByPk(languageId);
    const mechanics = await Mechanic.findAll({ where: { id: mechanicIds } });
    const thematics = await Thematic.findAll({ where: { id: thematicIds } });

    if (
      !author ||
      !category ||
      !designer ||
      !editorial ||
      !language ||
      mechanics.length !== mechanicIds.length ||
      thematics.length !== thematicIds.length
    ) {
      return res.status(400).json({
        message: "No matching game attributes found.",
      });
    }

    const newGame = await Game.create({
      title,
      description,
      year,
    });

    await newGame.setAuthor(author);
    await newGame.setCategory(category);
    await newGame.setDesigner(designer);
    await newGame.setEditorial(editorial);
    await newGame.setLanguage(language);
    await newGame.addMechanics(mechanics);
    await newGame.addThematics(thematics);

    return res.status(200).json(newGame);
  } catch (error) {
    return res.status(500).json({ message: "Error creating game." });
  }
};

module.exports = {
  createGame,
};
