const {Category} = require("../db");

const postCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    !category_name && res.status(400).json({ message: "Name is required" });
    
    const category = await Category.findOne({ where: { category_name: category_name } });

    if (category){
      res.status(400).json({ message: `There is already a category with the name ${category_name}` })
    } else{
      await Category.create({ category_name: category_name })
      res.status(200).json({ message: "Category created successfuly" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

module.exports = {
    postCategory,
    getAllCategories
};