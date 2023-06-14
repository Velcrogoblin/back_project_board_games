// Importa el modelo Editorial
const Editorial = require("../models/Editorial");

const getAllEditorials = async (req, res, next) => {
  // GET | /editorials
  // Obtiene un arreglo de objetos, donde cada objeto es una editorial.
  try {
    const allEditorials = await Editorial.findAll();
    return res.status(200).json(allEditorials);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "No hay editoriales en la base de datos" });
  }
};

const getEditorialById = async (req, res, next) => {
  // GET | /editorials/:id_editorial
  // Obtiene el detalle de una editorial específica
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
  // GET | /editorials/description?="..."
  // Obtiene todas las editoriales que coinciden con la descripción recibida por query
  const { description } = req.query;

  try {
    const editorials = await Editorial.findAll({
      where: {
        description: {
          [Op.iLike]: `%${description}%`, // Realiza una búsqueda case-insensitive
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
  // POST | /editorials
  // Crea una nueva editorial en la base de datos
  const { description, notes, active } = req.body;

  const existingEditorial = await Editorial.findOne({
    where: { description: description },
  });

  if (existingEditorial) {
    return res
      .status(500)
      .json({ message: "La Editorial ya existe en la base de datos" });
  }

  try {
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
  // PUT | /editorials/:id_editorial
  // Actualiza una editorial existente en la base de datos
  const { id_editorial } = req.params;
  const { description, notes, active } = req.body;

  try {
    const editorial = await Editorial.findByPk(id_editorial);
    if (editorial) {
      editorial.description = description;
      editorial.notes = notes;
      editorial.active = active;

      await editorial.save();

      return res.status(200).json(editorial);
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
  // DELETE | /editorials/:id_editorial
  // Elimina una editorial de la base de datos
  const { id_editorial } = req.params;

  try {
    const editorial = await Editorial.findByPk(id_editorial);
    if (editorial) {
      await editorial.destroy();

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
