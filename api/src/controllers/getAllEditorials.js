const Editorial = require("../db");

const getAllEditorials = async (req, res) => {
  try {
    const allEditorials = await Editorial.findAll();
    if (allEditorials.length === 0) {
      return res.status(404).json({ message: "No editorials were found" });
    }
    return res.status(200).json(allEditorials);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEditorials
};
