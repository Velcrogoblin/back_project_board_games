const mercadopago = require("mercadopago");
require("dotenv").config();

// Test user token, not a real one
const { MERCADO_PAGO_TOKEN, CURRENCY } = process.env;

// This code is ugly, I will clean it up
const createOrder = async (req, res) => {
  try {
    // I will need an object with name, price and quantity properties
    const { name, price, quantity } = req.body;
    // verifications
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "Must provide product name, price and quantity" });
    }

    if (isNaN(parseFloat(price)) || isNaN(parseInt(quantity))) {
      return res.status(418).json({ message: "Price and quantity must be numbers, teapot" });
    }

    // Product must exist in the database

    // mercadopago connections
    mercadopago.configure({
      access_token: MERCADO_PAGO_TOKEN,
    });

    const result = await mercadopago.preferences.create({
      items: [{
        title: name,
        unit_price: parseFloat(price),
        currency_id: CURRENCY,
        quantity: parseInt(quantity),
      }]
    });

    // Response to client
    return res.status(200).json(result);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  createOrder,
};
