const { Thematic, Op } = require("../db");

const postThematic = async (req, res) => {
  try {
    const { name } = req.query;

    !name && res.status(400).json({ message: "Thematic is required" });

    const existingThematic = await Thematic.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    existingThematic ? res.status(406).json({ message: `Thematic ${name} already exists` })
    : await Thematic.create({ name });
    return res.status(201).json({ message: `Thematic ${name} created successfuly` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = postThematic;
