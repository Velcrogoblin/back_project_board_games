const Mechanic = require("../models/Mechanic");

const CREATE_MECHANIC = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newMechanic = await Mechanic.create({
      name,
      description,
    });

    return res.status(200).json(newMechanic);
  } catch (error) {
    return res.status(500).json({ message: "Error creating mechanics." });
  }
};

module.exports = {
  CREATE_MECHANIC,
};
