const Mechanic = require("../db");

const postMechanic = async (req, res) => {
  const { name, description } = req.query;

  (!name || !description) && res.status(400).json({message: "There is missing information"});


  try {
    const newMechanic = await Mechanic.findOne({ where: { name } })
    newMechanic ? res.status(406).json({message: `Mechanic with name ${name} already exists`})
    : await Mechanic.create({
      name,
      description,
    });

    return res.status(201).json({message: `Mechanic ${name} created successfuly`});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = postMechanic;
