const {Mechanic} = require("../db");

const postMechanic = async (req, res) => {
  const { mechanic_name, description } = req.body;

  if (!mechanic_name || !description){ 
    return res.status(400).json({message: "There is missing information"});
  }

  try {
    const existingMechanic = await Mechanic.findOne({ where: { mechanic_name: mechanic_name } })
    if (existingMechanic) {
      return res.status(406).json({message: `Mechanic with name ${mechanic_name} already exists`})
    }
    const newMechanic = await Mechanic.create({
      mechanic_name: mechanic_name,
      description,
    });

    return res.status(201).json({message: `Mechanic ${mechanic_name} created successfuly`});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllMechanics = async (req, res) => {
    try {
      const existingMechanics = await Mechanic.findAll();
      existingMechanics.length === 0 && res.status(500).json({ message: "No mechanics were found" });
  
      return res.status(200).json(existingMechanics);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    postMechanic,
    getAllMechanics
};