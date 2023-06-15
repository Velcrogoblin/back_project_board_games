// Importa el modelo State
const State = require("../models/State");

const getAllStates = async (req, res, next) => {
  // GET | /states
  // Obtiene un arreglo de objetos, donde cada objeto es un Estado.
  try {
    const allStates = await State.findAll();
    return res.status(200).json(allStates);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "No hay Estados en la base de datos" });
  }
};

const getStateById = async (req, res, next) => {
  // GET | /states/:id_state
  // Obtiene el detalle de un estado específico
  const { id_state } = req.params;

  try {
    const state = await State.findByPk(id_state);
    if (state) {
      return res.status(200).json(state);
    } else {
      return res.status(404).json({ message: "No se encontró el estado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el estado" });
  }
};

const searchStatesByName = async (req, res, next) => {
  // GET | /states/name?="..."
  // Obtiene todos los estados que coinciden con el name recibido por query
  const { name } = req.query;

  try {
    const states = await State.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Realiza una búsqueda case-insensitive
        },
      },
    });

    if (states.length > 0) {
      return res.status(200).json(states);
    } else {
      return res.status(404).json({ message: "No se encontraron estados" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar estados" });
  }
};

const createState = async (req, res, next) => {
  // POST | /states
  // Crea un nuevo estado en la base de datos
  const { name, notes, active } = req.body;

  const existingState = await State.findOne({
    where: { name: name },
  });

  if (existingState) {
    return res
      .status(500)
      .json({ message: "El Estado ya existe en la base de datos" });
  }

  try {
    const newState = await State.create({
      name,
      notes,
      active,
    });

    return res.status(201).json(newState);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el estado" });
  }
};

const updateState = async (req, res, next) => {
  // PUT | /states/:id_state
  // Actualiza un estado existente en la base de datos
  const { id_state } = req.params;
  const { name, notes, active } = req.body;

  try {
    const state = await State.findByPk(id_state);
    if (state) {
      state.name = name;
      state.notes = notes;
      state.active = active;

      await state.save();

      return res.status(200).json(state);
    } else {
      return res.status(404).json({ message: "No se encontró el estado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el estado" });
  }
};

const deleteState = async (req, res, next) => {
  // DELETE | /states/:id_state
  // Elimina un estado de la base de datos
  const { id_state } = req.params;

  try {
    const state = await State.findByPk(id_state);
    if (state) {
      await state.destroy();

      return res
        .status(200)
        .json({ message: "Estado eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "No se encontró el estado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el estado" });
  }
};

module.exports = {
  getAllStates,
  getStateById,
  searchStatesByName,
  createState,
  updateState,
  deleteState,
};
