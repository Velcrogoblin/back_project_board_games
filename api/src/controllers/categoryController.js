const { Category } = require("../db");

const postCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    if (!category_name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await Category.findOne({
      where: { category_name: category_name },
    });

    if (category) {
      return res
        .status(400)
        .json({
          message: `There is already a category with the name ${category_name}`,
        });
    } else {
      await Category.create({ category_name: category_name });
      return res.status(200).json({ message: "Category created successfuly" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    if (categories.length === 0) {
      return res.status(404).json({ message: "There are no categories." });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postCategory,
  getAllCategories,
};
