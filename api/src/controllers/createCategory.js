const Category = require("../db");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    !name && res.status(400).json({ message: "Name is required" });
    
    const category = await Category.findOne({ where: { name } });

    category
    ? res.status(400).json({ message: `There is already a category with the name ${name}` })
    : await Category.create({ name })
      res.status(200).json({ message: "Category created successfuly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createCategory;