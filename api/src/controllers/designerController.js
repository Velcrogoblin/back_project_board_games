const { Designer } = require("../db");

const getAllDesigners = async (req, res) => {
  try {
    const designers = await Designer.findAll();

    if (designers.length === 0) {
      return res.status(404).json({ message: "There are no designers" });
    }
    return res.status(200).json(designers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postDesigner = async (req, res) => {
  const { designer_name } = req.body;
  try {
    if (!designer_name) {
      return res.status(400).json({ message: "There is missing information" });
    }

    const designer = await Designer.findOne({ where: { designer_name } });

    if (designer) {
      return res.status(400).json({
        message: `There is already a designer with the name ${designer_name}`,
      });
    } else {
      await Designer.create({ designer_name });
      return res.status(201).json({ message: "Designer created successfuly" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteDesigner = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ message: "The id must be a number." });

  try {
    const designer = await Designer.findByPk(id);
    if (designer) {
      designer.active = false;
      await designer.save();
      return res
        .status(200)
        .json({
          message: `The designer ${designer.designer_name} has been deleted.`,
        });
    }
    res.status(404).json({ message: `There is no designer with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const putDesigner = async (req, res) => {
  const { designer_id, designer_name, active } = req.body;

  if (designer_id === undefined)
    return res.status(400).json({ message: "Id is required." });

  try {
    const designer = await Designer.findByPk(designer_id);
    if (designer) {
      if (designer_name) designer.designer_name = designer_name;
      if (active !== undefined) designer.active = active;
      await designer.save();
      return res
        .status(200)
        .json({ message: `The designer has been updated.` });
    }
    res
      .status(404)
      .json({ message: `There is no designer with id ${designer_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

module.exports = {
  postDesigner,
  getAllDesigners,
  deleteDesigner,
  putDesigner,
};
