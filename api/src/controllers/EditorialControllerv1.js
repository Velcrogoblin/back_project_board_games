const Editorial = require("../models/Editorial");

const getAllEditorials = async (req, res, next) => {
  try {
    const allEditorials = await Editorial.findAll();
    return res.status(200).json(allEditorials);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las editoriales" });
  }
};

const getEditorialById = async (req, res, next) => {
  const { id_editorial } = req.params;

  try {
    const editorial = await Editorial.findByPk(id_editorial);
    if (editorial) {
      return res.status(200).json(editorial);
    } else {
      return res.status(404).json({ message: "No se encontró la editorial" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la editorial" });
  }
};

const searchEditorialsByDescription = async (req, res, next) => {
  const { description } = req.query;

  try {
    const editorials = await Editorial.findAll({
      where: {
        description: {
          [Op.iLike]: `%${description}%`,
        },
      },
    });

    if (editorials.length > 0) {
      return res.status(200).json(editorials);
    } else {
      return res.status(404).json({ message: "No se encontraron editoriales" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar editoriales" });
  }
};

const createEditorial = async (req, res, next) => {
  const { description, notes, active } = req.body;

  try {
    const existingEditorial = await Editorial.findOne({
      where: { description: description },
    });

    if (existingEditorial) {
      return res
        .status(400)
        .json({ message: "La editorial ya existe en la base de datos" });
    }

    const newEditorial = await Editorial.create({
      description,
      notes,
      active,
    });

    return res.status(201).json(newEditorial);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la editorial" });
  }
};

const updateEditorial = async (req, res, next) => {
  const { id_editorial } = req.params;
  const { description, notes, active } = req.body;

  try {
    const [updatedRowsCount, updatedRows] = await Editorial.update(
      {
        description,
        notes,
        active,
      },
      {
        returning: true,
        where: { id_editorial: id_editorial },
      }
    );

    if (updatedRowsCount > 0) {
      return res.status(200).json(updatedRows[0]);
    } else {
      return res.status(404).json({ message: "No se encontró la editorial" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar la editorial" });
  }
};

const deleteEditorial = async (req, res, next) => {
  const { id_editorial } = req.params;

  try {
    const deletedRowsCount = await Editorial.destroy({
      where: { id_editorial: id_editorial },
    });

    if (deletedRowsCount > 0) {
      return res
        .status(200)
        .json({ message: "Editorial eliminada correctamente" });
    } else {
      return res.status(404).json({ message: "No se encontró la editorial" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la editorial" });
  }
};

module.exports = {
  getAllEditorials,
  getEditorialById,
  searchEditorialsByDescription,
  createEditorial,
  updateEditorial,
  deleteEditorial,
};
