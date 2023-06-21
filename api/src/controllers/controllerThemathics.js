const { Thematic, Op } = require("../db");

const postThematic = async (req, res) => {
  try {
    const { thematic_name } = req.body;

    if (!thematic_name) {
      return res.status(400).json({ message: "Thematic is required" });  
    } ;

    const existingThematic = await Thematic.findOne({
      where: {
        thematic_name: {
          [Op.iLike]: `%${thematic_name}%`,
        },
      },
    });
    if(existingThematic){ 
      return res.status(406).json({ message: `Thematic ${thematic_name} already exists` })
    }
    await Thematic.create({ thematic_name: thematic_name });
    return res.status(201).json({ message: `Thematic ${thematic_name} created successfuly` });
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

module.exports = {
    postThematic,
    getAllThematics
};