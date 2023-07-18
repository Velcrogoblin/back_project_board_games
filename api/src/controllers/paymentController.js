const { Game, Purchase, User, Op } = require("../db");
const mercadopago = require("mercadopago");
require("dotenv").config();

const { MERCADO_PAGO_TOKEN, CURRENCY, BACK_URL, FRONT_URL, MERCADO_PAGO_FEE } =
  process.env;

mercadopago.configure({
  access_token: MERCADO_PAGO_TOKEN,
});

const createOrder = async (req, res) => {
  try {
    const { items, user_id } = req.body;
    if (!user_id || user_id === "") {
      return res.status(400).json({ message: "Username is not valid." });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items array is empty." });
    }

    const itemPromise = items.map(async (item) => {
      if (!item.title || item.title === "") {
        throw new Error("Must provide a title.");
      }

      if (isNaN(item.unit_price)) {
        throw new Error("Must provide a unit price.");
      }

      if (isNaN(item.quantity)) {
        throw new Error("Must provide a quantity.");
      }

      const existingGame = await Game.findOne({ where: { name: item.title } });
      if (!existingGame) {
        throw new Error(`No game named ${item.title} was found.`);
      }

      if (item.quantity >= existingGame.stock) {
        throw new Error("Quantity cannot be greater than existing stock.");
      }

      await Game.update(
        {
          stock: existingGame.stock - item.quantity,
        },
        {
          where: {
            name: {
              [Op.iLike]: `%${item.title}%`,
            },
          },
        }
      );
    });

    await Promise.all(itemPromise);

    const existingUser = await User.findByPk(user_id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: `No user with id ${user_id} was found.` });
    }

    const preferences = items.map((item) => ({
      title: item.title,
      unit_price: item.unit_price,
      currency_id: CURRENCY,
      quantity: item.quantity,
    }));

    let totalAmount = 0;
    const gamesPurchases = items.map((item) => {
      totalAmount += item.unit_price;
      return {
        name: item.title,
        price: item.unit_price,
        quantity: item.quantity,
      };
    });

    const gamesCreated = await Purchase.create({
      description: gamesPurchases,
      total_amount: totalAmount,
      user_id,
    });

    const result = await mercadopago.preferences.create({
      items: preferences,
      external_reference: gamesCreated.purchase_id.toString(),
      payment_methods: {
        excluded_payment_types: [
          {
            id: "atm",
          },
        ],
        installments: Number(MERCADO_PAGO_FEE),
      },
      back_urls: {
        success: BACK_URL,
        failure: BACK_URL,
        pending: BACK_URL,
      },

      auto_return: "approved",
    });

    return res.status(200).json({
      mercadopago_id: result.body.id,
      purchase_id: gamesCreated.purchase_id,
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
