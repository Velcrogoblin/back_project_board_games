const { Editorial } = require("../db");

const postEditorial = async (req, res) => {
  const { editorial_name } = req.body;

  if (!editorial_name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const existingEditorial = await Editorial.findOne({
    where: { editorial_name: editorial_name },
  });

  if (existingEditorial) {
    return res.status(406).json({
      message: `Editorial with name ${editorial_name} already exists`,
    });
  }

  try {
    await Editorial.create({
      editorial_name: editorial_name,
    });

    return res.status(201).json({ message: "Editorial successfuly created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllEditorials = async (req, res) => {
  try {
    const allEditorials = await Editorial.findAll();
    if (allEditorials.length === 0) {
      return res.status(404).json({ message: "No editorials were found" });
    }
    return res.status(200).json(allEditorials);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEditorial = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ message: "The id must be a number." });

  try {
    const editorial = await Editorial.findByPk(id);
    if (editorial) {
      editorial.active = false;
      await editorial.save();
      return res
        .status(200)
        .json({
          message: `The editorial ${editorial.editorial_name} has been deleted.`,
        });
    }
    res.status(404).json({ message: `There is no editorial with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const putEditorial = async (req, res) => {
  const { editorial_id, editorial_name, active } = req.body;

  if (editorial_id === undefined)
    return res.status(400).json({ message: "Id is required." });

  try {
    const editorial = await Editorial.findByPk(editorial_id);
    if (editorial) {
      if (editorial_name) editorial.editorial_name = editorial_name;
      if (active !== undefined) editorial.active = active;
      await editorial.save();
      return res
        .status(200)
        .json({ message: `The editorial has been updated.` });
    }
    res
      .status(404)
      .json({ message: `There is no editorial with id ${editorial_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

module.exports = {
  postEditorial,
  getAllEditorials,
  deleteEditorial,
  putEditorial,
};
