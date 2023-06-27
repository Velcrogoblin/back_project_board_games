const { Language } = require("../db");

const postLanguage = async (req, res) => {
  const { language_name } = req.body;

  if (!language_name) {
    return res.status(400).json({ message: "Language is required" });
  }

  const existingLanguage = await Language.findOne({
    where: { language_name: language_name },
  });

  if (existingLanguage) {
    return res
      .status(406)
      .json({ message: `Language ${language_name} already exists` });
  }

  try {
    const newLanguage = await Language.create({
      language_name: language_name,
    });

    return res
      .status(201)
      .json({ message: `Language ${language_name} created successfuly` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllLanguages = async (req, res) => {
  try {
    const allLanguages = await Language.findAll();
    if (allLanguages.length === 0) {
      return res.status(404).json({ message: "No languages were found" });
    }
    return res.status(200).json(allLanguages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteLanguage = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ message: "The id must be a number." });

  try {
    const language = await Language.findByPk(id);
    if (language) {
      language.active = false;
      await language.save();
      return res
        .status(200)
        .json({
          message: `The language ${language.language_name} has been deleted.`,
        });
    }
    res.status(404).json({ message: `There is no language with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const putEditorial = async (req, res) => {
  const { language_id, language_name, active } = req.body;

  if (language_id === undefined)
    return res.status(400).json({ message: "Id is required." });

  try {
    const language = await Language.findByPk(language_id);
    if (language) {
      if (language_name) language.language_name = language_name;
      if (active !== undefined) language.active = active;
      await language.save();
      return res
        .status(200)
        .json({ message: `The language has been updated.` });
    }
    res
      .status(404)
      .json({ message: `There is no language with id ${language_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

module.exports = {
  postLanguage,
  getAllLanguages,
  deleteLanguage,
  putEditorial,
};
