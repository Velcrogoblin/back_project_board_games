const { Thematic, Op } = require("../db");

const POST_THEMATICS = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.length === 0) {
      return res.status(400).json({ message: "Missing data." });
    }
    // console.log(name);

    const existingThematic = await Thematic.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    if (existingThematic) {
      return res
        .status(500)
        .json({ message: "Does not exist in the database." });
    }
    // console.log(existingThematic);

    const thematicCreated = await Thematic.create({ name });
    console.log(thematicCreated);
    await thematicCreated.addThematics(existingThematic);
    return res
      .status(201)
      .json({ message: "Thematic was successfully created." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  POST_THEMATICS,
};
