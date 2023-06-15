// Importa el modelo Language
const Language = require("../models/Language");

const getAllLanguages = async (req, res, next) => {
  // GET | /languages
  // Obtiene un arreglo de objetos, donde cada objeto es un lenguaje.
  try {
    const allLanguages = await Language.findAll();
    return res.status(200).json(allLanguages);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "No hay lenguajes en la base de datos" });
  }
};

const getLanguageById = async (req, res, next) => {
  // GET | /languages/:id_language
  // Obtiene el detalle de un lenguaje específico
  const { id_language } = req.params;

  try {
    const language = await Language.findByPk(id_language);
    if (language) {
      return res.status(200).json(language);
    } else {
      return res.status(404).json({ message: "No se encontró el languaje" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el languaje" });
  }
};

const searchLanguagesByName = async (req, res, next) => {
  // GET | /languages/name?="..."
  // Obtiene todos los lenguajes que coinciden con el name recibida por query
  const { name } = req.query;

  try {
    const languages = await Language.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Realiza una búsqueda case-insensitive
        },
      },
    });

    if (languages.length > 0) {
      return res.status(200).json(languages);
    } else {
      return res.status(404).json({ message: "No se encontraron lenguajes" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar lenguajes" });
  }
};

const createLanguage = async (req, res, next) => {
  // POST | /languages
  // Crea un nuevo lenguaje en la base de datos
  const { name, notes, active } = req.body;

  const existingLanguage = await Language.findOne({
    where: { name: name },
  });

  if (existingLanguage) {
    return res
      .status(500)
      .json({ message: "El Lenguaje ya existe en la base de datos" });
  }

  try {
    const newLanguage = await Language.create({
      name,
      notes,
      active,
    });

    return res.status(201).json(newLanguage);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el lenguaje" });
  }
};

const updateLanguage = async (req, res, next) => {
  // PUT | /languages/:id_language
  // Actualiza una language existente en la base de datos
  const { id_language } = req.params;
  const { name, notes, active } = req.body;

  try {
    const language = await Language.findByPk(id_language);
    if (language) {
      language.name = name;
      language.notes = notes;
      language.active = active;

      await language.save();

      return res.status(200).json(language);
    } else {
      return res.status(404).json({ message: "No se encontró el lenguaje" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el lenguaje" });
  }
};

const deleteLanguage = async (req, res, next) => {
  // DELETE | /languages/:id_language
  // Elimina un lenguaje de la base de datos
  const { id_language } = req.params;

  try {
    const language = await Language.findByPk(id_language);
    if (language) {
      await language.destroy();

      return res
        .status(200)
        .json({ message: "Lenguaje eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "No se encontró el lenguaje" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el lenguaje" });
  }
};

module.exports = {
  getAllLanguages,
  getLanguageById,
  searchLanguagesByName,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
