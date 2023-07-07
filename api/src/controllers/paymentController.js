const mercadopago = require("mercadopago");
require("dotenv").config();

const { MERCADO_PAGO_TOKEN, CURRENCY, HOST_DEPLOY } = process.env;

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items is empty" });
    }

    // const propsNeeded = ["title", "unit_price", "currency", "quantity"];
    // for (const item of items) {
    //   for (const prop of propsNeeded) {
    //     if (
    //       item.hasOwnProperty(prop) ||
    //       !item[prop] === undefined ||
    //       !item[prop] === ""
    //     ) {
    //       return res
    //         .status(400)
    //         .json({ message: "All fields must be filled in" });
    //     }
    //   }
    // }
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
        success: `${HOST_DEPLOY}/success`,
        failure: `${HOST_DEPLOY}/failure`,
        pending: `${HOST_DEPLOY}/pending`,
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
