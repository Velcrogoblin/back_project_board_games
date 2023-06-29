const { User } = require("../db");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No hay usuarios' });
    }
    return res.status(200).json({ users });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
}

const createUser = async (req, res) => {
  const { uid, email, name } = req.body;
  try {
    const user = await User.create({ uid, email, name });
    console.log('user')
    console.log(user)
    if (user) {
      return res.status(201).json({ message: "Usuario creado con exito!" })
    }
  } catch ({ message }) {
    res.status(500).json({ error: message })
  }
}

module.exports = {
  createUser,
  getUsers,
}