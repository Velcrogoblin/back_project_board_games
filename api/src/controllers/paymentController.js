const mercadopago = require("mercadopago");
require("dotenv").config();

const { MERCADO_PAGO_TOKEN, CURRENCY, BACK_URL, FRONT_URL } = process.env;

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

    const preferences = items.map((item) => ({
      title: item.title,
      unit_price: item.unit_price,
      currency_id: CURRENCY,
      quantity: item.quantity,
    }));

    const result = await mercadopago.preferences.create({
      items: preferences,
      back_urls: {
        success: BACK_URL,
        failure: BACK_URL,
        pending: BACK_URL,
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

const payment = (req, res) => {
  try {
    const { status } = req.query;
    const paymentStatus = status === "approved" ? "Approved" : "Pay in process";
    switch (paymentStatus) {
      case "Approved":
        return res.redirect(`${FRONT_URL}success`);

      case "Pay in process":
        return res.redirect(`${FRONT_URL}pending`);

      default:
        return res.redirect(`${FRONT_URL}failure`);
    }
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  createOrder,
  payment,
};
