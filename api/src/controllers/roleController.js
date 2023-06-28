const { Role } = require("../db");

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();

    if (!roles) return res.status(400).json({ message: 'There is no roles.' })

    return res.status(200).json({ roles });

  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};

const createRole = async (req, res) => {
  const { role_name } = req.body;
  try {
    if (role_name) {
      const role = await Role.create({ role_name });
      return res.status(201).json({ message: `Role ${role_name} created successfuly` });
    }
    return res.status(400).json({ message: "Role is required." })
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ message: "Id is required." });

    const role = await Role.findByPk(id);
    if (role) {
      if (!role.active) return res.status(400).json({ message: `The role had already been deleted.` })
      role.active = false;
      role.save();
      return res.status(200).json({ message: `The role ${role.role_name} has been deleted.` });
    }
    return res.status(400).json({ message: `There is no role with id: ${id}` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

const putRole = async (req, res) => {
  const { role_id, role_name, active } = req.body;
  console.log('active')
  console.log(active)
  try {
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ message: `There is no role with id: ${role_id}` });
    }
    if (role_name) role.role_name = role_name;
    if (active !== undefined) role.active = active;

    role.save();

    return res.status(200).json({ message: 'The role has been updated.' })
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

module.exports = {
  getRoles,
  createRole,
  deleteRole,
  putRole
}