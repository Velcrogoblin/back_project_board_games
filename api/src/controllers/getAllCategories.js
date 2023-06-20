const Category = require("../db");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    categories.length === 0
      ? res.status(404).json({ message: "There are no categories." })
      : res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllCategories;