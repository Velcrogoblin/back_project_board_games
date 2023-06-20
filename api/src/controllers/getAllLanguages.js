const Language = require("../db");

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

module.exports = getAllLanguages;
