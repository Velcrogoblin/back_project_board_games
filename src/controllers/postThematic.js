const { Thematic, Op } = require("../db");

const POST_THEMATICS = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.length === 0) {
      return res.status(400).json({ message: "Missing data." });
    }

    const existingThematic = await Thematic.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    if (existingThematic) {
      return res.status(500).json({ message: "It already exists." });
    }

    await Thematic.create({ name });
    return res
      .status(201)
      .json({ message: "It was successfully created." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  POST_THEMATICS,
};
