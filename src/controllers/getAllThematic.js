const { Thematic, Game } = require("../db");

const GET_ALL_THEMATICS = async (req, res) => {
  try {
    const existingThematic = await Thematic.findAll({
      include: [{ model: Game }],
    });
    // console.log(existingThematic);
    if (!existingThematic || existingThematic.length === 0) {
      return res.status(500).json({ message: "Does not exist thematics yet." });
    }
    return res.status(200).json(existingThematic);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  GET_ALL_THEMATICS,
};
