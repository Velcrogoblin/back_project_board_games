const { ShippingAdress, User } = require("../db");

const getShippingAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const shippingAddress = await ShippingAdress.findByPk(id);
    if (!shippingAddress) return res.status(400).json({ message: 'There is no shipping address with id: ${id}' });

    return res.status(200).json({ shippingAddress });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const createShippingAddress = async (req, res) => {
  const { user_uid, province, city, street, street_number, apartmen_number, phone_number } = req.body;

  try {
    const user = await User.findByPk(user_uid);

    if (!user) {
      return res.status(400).json({ message: `There is no user with id: ${user_uid}` });
    } else {
      const newShippingAddress = ShippingAdress.create({ province, city, street, street_number, apartmen_number, phone_number });

      await user.setShippingAddress(newShippingAddress);

      return res.status(200).json({ message: "Shipping address created." });
    }

  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const deleteShippingAddress = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ message: 'Id is required.' });

    await ShippingAdress.destroy({
      where: {
        shippingAddress_id: id
      }
    });

    return res.status(200).json({ message: "Shipping address has been deleted" })
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}



module.exports = {
  getShippingAddressById,
  createShippingAddress,
  deleteShippingAddress,
  // putShippingAdress
};