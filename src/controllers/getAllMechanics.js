const { Mechanic, Game } = require("../db");

const GET_ALL_MECHANICS = async (req, res) => {
  try {
    const existingMechanics = await Mechanic.findAll({
      include: [{ model: Game }],
    });
    if (!existingMechanics || existingMechanics.length === 0) {
      return res.status(500).json({ message: "Does not exist mechanics yet." });
    }

    return res.status(200).json(existingMechanics);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  GET_ALL_MECHANICS,
};
