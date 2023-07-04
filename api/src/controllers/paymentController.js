const mercadopago = require("mercadopago");
require("dotenv").config();

const { MERCADO_PAGO_TOKEN, CURRENCY, HOST_DEPLOY } = process.env;

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items is empty" });
    }

    // Game must exist in the database

    mercadopago.configure({
      access_token: MERCADO_PAGO_TOKEN,
    });

    let pedido = [];
    const preferences = items.map((item) => {
      pedido.push({
        title: item.title,
        unit_price: item.unit_price,
        currency_id: CURRENCY,
        quantity: item.quantity,
      });
    });

    const result = await mercadopago.preferences.create({
      items: pedido,
      back_urls: {
        success: "https://boardgames-n9tuptxl0-mgs1987.vercel.app/success",
        failure: "https://boardgames-n9tuptxl0-mgs1987.vercel.app/failure",
        pending: "https://boardgames-n9tuptxl0-mgs1987.vercel.app/pending",
      },
    });

    return res.status(200).json({
      id_mercadopago: result.body.id,
      init_point: result.body.init_point,
    });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  createOrder,
};
