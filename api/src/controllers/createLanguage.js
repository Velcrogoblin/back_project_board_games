const Language = require("../db");

const createLanguage = async (req, res) => {

    const { name } = req.query;
  
    !name && res.status(400).json({message: "Language is required"});
    
    const existingLanguage = await Language.findOne({
      where: { name },
    });
  
    existingLanguage && res.status(406).json({ message: `Language ${name} already exists` });
    
  
    try {
      const newLanguage = await Language.create({
        name
      });
  
      return res.status(201).json({message: `Language ${name} created successfuly`});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  module.exports = createLanguage;
  