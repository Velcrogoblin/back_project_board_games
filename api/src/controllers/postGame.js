const {Game} = require("../db");
const {Author} = require("../db");
const {Category} = require("../db");
const {Designer} = require("../db");
const {Editorial} = require("../db");
const {Language} = require("../db");
const {Mechanic} = require("../db");
const {Thematic} = require("../db");

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
   thematic_name
  } = req.body;

  const existingGame = await Game.findOne({where: { name }});
  
  if (existingGame) {
    return res.status(500).json({message: `${name} already exists.`});
  }

  if (
    !name || !released || !price || !age || !players_min || !players_max || !rating || !stock || !image || !weight || !playing_time || !author_name || !category_name || !designer_name || !editorial_name || !language_name || !mechanic_name || !thematic_name) {
    return res.status(400).json({message: "There is missing information."});
  }

    const author = await Author.findOne({ where: { author_name } });
    const category = await Category.findOne({ where: { category_name } });
    const designer = await Designer.findOne({ where: { designer_name } });
    const editorial = await Editorial.findOne({ where: { editorial_name } });
    const language = await Language.findOne({ where: { language_name } });
    const mechanics = await Mechanic.findOne({ where: { mechanic_name } });
    const thematics = await Thematic.findOne({ where: { thematic_name } });

    if (!author) {return res.status(400).json({message: `${author_name} does not exist`})};
    if (!category) {return res.status(400).json({message: `${category_name} does not exist`})};
    if (!designer) {return res.status(400).json({message: `${designer_name} does not exist`})};
    if (!editorial) {return res.status(400).json({message: `${editorial_name} does not exist`})};
    if (!language) {return res.status(400).json({message: `${language_name} does not exist`})};
    if (!mechanics) {return res.status(400).json({message: `${mechanic_name} does not exist`})};
    if (!thematics) {return res.status(400).json({message: `${thematic_name} does not exist`})};
    
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
    playing_time
    });

    await newGame.setAuthor(author);
    await newGame.addCategories(category);
    await newGame.addDesigners(designer);
    await newGame.setEditorial(editorial);
    await newGame.addLanguages(language);
    await newGame.setMechanic(mechanics);
    await newGame.setThematic(thematics);

    return res.status(201).json({ message: `Game ${name} created successfuly`});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = createGame;
