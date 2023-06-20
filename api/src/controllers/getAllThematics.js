const Thematic = require("../db");

const getAllThematics = async (req, res) => {
  try {
    const existingThematic = await Thematic.findAll();
   
    existingThematic.length === 0 && res.status(404).json({ message: "No thematics found" });
    
    return res.status(200).json(existingThematic);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAllThematics;
