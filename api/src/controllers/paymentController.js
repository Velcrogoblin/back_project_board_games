const mercadopago = require("mercadopago");
require("dotenv").config();

// Test user token, not a real one
const { MERCADO_PAGO_TOKEN, CURRENCY, PORT } = process.env;

// Maybe this could be in the .env
const HOST = `http://localhost:${PORT}`;

// This code is ugly, I will clean it up
const createOrder = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ message: "Must provide product name, price and quantity" });
    }

    if (isNaN(parseFloat(price)) || isNaN(parseInt(quantity))) {
      return res
        .status(418)
        .json({ message: "Price and quantity must be numbers, teapot" });
    }

    // Game must exist in the database

    mercadopago.configure({
      access_token: MERCADO_PAGO_TOKEN,
    });

    const result = await mercadopago.preferences.create({
      items: [
        {
          title: name,
          unit_price: parseFloat(price),
          currency_id: CURRENCY,
          quantity: parseInt(quantity),
        },
      ],

      back_urls: {
        success: `${HOST}/success`,
        failure: `${HOST}/failure`,
        pending: `${HOST}/pending`,
      },
    });

    return res.status(200).json(result.body);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  createOrder,
};
