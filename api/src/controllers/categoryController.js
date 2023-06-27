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

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) return res.status(400).json({ message: 'The id must be a number.' });

  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.active = false;
      await category.save();
      return res.status(200).json({ message: `The category ${category.category_name} has been deleted.` });
    }
    res.status(404).json({ message: `There is no category with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

const putCategory = async (req, res) => {
  const { category_id, category_name, active } = req.body;

  if (!category_id) return res.status(400).json({ message: 'Id is required.' });

  try {
    const category = await Category.findByPk(category_id);
    if (category) {
      if (category_name) category.category_name = category_name;
      if (active !== undefined) category.active = active;
      await category.save();
      return res.status(200).json({ message: `The category has been updated.` });
    }
    res.status(404).json({ message: `There is no category with id ${category_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

module.exports = {
  postCategory,
  getAllCategories,
  deleteCategory,
  putCategory
};
