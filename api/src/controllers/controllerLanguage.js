const {Language} = require("../db");

const postLanguage = async (req, res) => {

    const {language_name} = req.body;
  
    if(!language_name) {
      return res.status(400).json({message: "Language is required"});
    }

    const existingLanguage = await Language.findOne({
      where: { language_name: language_name },
    });
  
    if(existingLanguage) {
      return res.status(406).json({ message: `Language ${language_name} already exists` });
    }
  
    try {
      const newLanguage = await Language.create({
        language_name: language_name
      });
  
      return res.status(201).json({message: `Language ${language_name} created successfuly`});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const getAllLanguages = async (req, res) => {
    try {
     const allLanguages = await Language.findAll();
     allLanguages.length === 0 && res.status(404).json({message: "No languages were found"});
     return res.status(200).json(allLanguages);
   } catch (error) {
     return res
       .status(500)
       .json({ message: error.message });
   }
 };

  module.exports = {
    postLanguage,
    getAllLanguages
  };