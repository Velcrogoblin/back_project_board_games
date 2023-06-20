const Mechanic = require("../db");

const getAllMechanics = async (req, res) => {
  try {
    const existingMechanics = await Mechanic.findAll();
    existingMechanics.length === 0 && res.status(500).json({ message: "No mechanics were found" });

    return res.status(200).json(existingMechanics);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAllMechanics;
