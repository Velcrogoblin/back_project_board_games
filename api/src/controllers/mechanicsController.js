const { Mechanic } = require("../db");

const postMechanic = async (req, res) => {
  const { mechanic_name, description } = req.body;

  if (!mechanic_name || !description) {
    return res.status(400).json({ message: "There is missing information" });
  }

  try {
    const existingMechanic = await Mechanic.findOne({
      where: { mechanic_name: mechanic_name },
    });
    if (existingMechanic) {
      return res.status(406).json({
        message: `Mechanic with name ${mechanic_name} already exists`,
      });
    }
    const newMechanic = await Mechanic.create({
      mechanic_name: mechanic_name,
      description,
    });

    return res
      .status(201)
      .json({ message: `Mechanic ${mechanic_name} created successfuly` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllMechanics = async (req, res) => {
  try {
    const existingMechanics = await Mechanic.findAll();
    if (existingMechanics.length === 0) {
      return res.status(500).json({ message: "No mechanics were found" });
    }
    return res.status(200).json(existingMechanics);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMechanic = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ message: "The id must be a number." });

  try {
    const mechanic = await Mechanic.findByPk(id);
    if (mechanic) {
      mechanic.active = false;
      await mechanic.save();
      return res
        .status(200)
        .json({
          message: `The mechanic ${mechanic.mechanic_name} has been deleted.`,
        });
    }
    res.status(404).json({ message: `There is no mechanic with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const destroyMechanic = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "id is invalid" });
    }

    let response = await Mechanic.findByPk(id);
    await response.destroy();
    return res.status(200).json({ message: "Mechanic was destroyed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putMechanic = async (req, res) => {
  const { mechanic_id, mechanic_name, description, active } = req.body;

  if (!mechanic_id) return res.status(400).json({ message: "Id is required." });

  try {
    const mechanic = await Mechanic.findByPk(mechanic_id);
    if (mechanic) {
      if (mechanic_name) mechanic.mechanic_name = mechanic_name;
      if (description) mechanic.description = description;
      if (active !== undefined) mechanic.active = active;
      await mechanic.save();
      return res
        .status(200)
        .json({ message: `The mechanic has been updated.` });
    }
    res
      .status(404)
      .json({ message: `There is no mechanic with id ${author_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

module.exports = {
  postMechanic,
  getAllMechanics,
  deleteMechanic,
  putMechanic,
  destroyMechanic,
};
