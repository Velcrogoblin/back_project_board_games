const { Thematic, Op } = require("../db");

const postThematic = async (req, res) => {
  try {
    const { thematic_name } = req.body;

    if (!thematic_name) {
      return res.status(400).json({ message: "Thematic is required" });
    }

    const existingThematic = await Thematic.findOne({
      where: {
        thematic_name: {
          [Op.iLike]: `%${thematic_name}%`,
        },
      },
    });
    if (existingThematic) {
      return res
        .status(406)
        .json({ message: `Thematic ${thematic_name} already exists` });
    }
    await Thematic.create({ thematic_name: thematic_name });
    return res
      .status(201)
      .json({ message: `Thematic ${thematic_name} created successfuly` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllThematics = async (req, res) => {
  try {
    const existingThematic = await Thematic.findAll();

    if (existingThematic.length === 0) {
      return res.status(404).json({ message: "No thematics found" });
    }

    return res.status(200).json(existingThematic);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteThematic = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ message: "The id must be a number." });

  try {
    const thematic = await Thematic.findByPk(id);
    if (thematic) {
      thematic.active = false;
      await thematic.save();
      return res
        .status(200)
        .json({
          message: `The thematic ${thematic.thematic_name} has been deleted.`,
        });
    }
    res.status(404).json({ message: `There is no thematic with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const destroyThematic = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "id is invalid" });
    }

    let response = await Thematic.findByPk(id);
    await response.destroy();
    return res.status(200).json({ message: "Thematic was destroyed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putThematic = async (req, res) => {
  const { thematic_id, thematic_name, active } = req.body;

  if (thematic_id === undefined)
    return res.status(400).json({ message: "Id is required." });

  try {
    const thematic = await Thematic.findByPk(thematic_id);
    if (thematic) {
      if (thematic_name) thematic.thematic_name = thematic_name;
      if (active !== undefined) thematic.active = active;
      await thematic.save();
      return res
        .status(200)
        .json({ message: `The thematic has been updated.` });
    }
    res
      .status(404)
      .json({ message: `There is no thematic with id ${thematic_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

module.exports = {
  postThematic,
  getAllThematics,
  deleteThematic,
  putThematic,
  destroyThematic,
};
