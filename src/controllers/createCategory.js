const { Category } = require("../db");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const category = await Category.findOne({ where: { name: name } });

    if (category) {
      return res.status(400).json({ message: `There is already a category with the name ${name}` });
    } else {
      await Category.create({ name });
      res.status(200).json({ message: "Category created" });
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

module.exports = createCategory;