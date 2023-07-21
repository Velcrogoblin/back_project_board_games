const { Purchase, User, Game, Op } = require("../db");

const getAllPurchase = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { active: true },
    });
    if (purchases.length === 0) {
      return res.status(418).json({ message: "There are no purchase yet." });
    }

    return res.status(200).json(purchases);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const getPurchaseByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === "") {
      return res.status(400).json({ message: "id is not valid." });
    }

    const userPurchases = await Purchase.findAll({
      where: {
        user_id: {
          [Op.iLike]: `%${id}%`,
        },
      },

      include: [{ model: User }],
    });

    if (!userPurchases) {
      return res
        .status(400)
        .json({ message: `No purchases with user id ${id} was found.` });
    }

    return res.status(200).json(userPurchases);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "id is not valid." });
    }

    const existingPurchase = await Purchase.findOne({
      where: {
        purchase_id: {
          [Op.eq]: id,
        },
      },
      include: [{ model: User }],
    });
    if (!existingPurchase) {
      return res
        .status(400)
        .json({ message: `No purchase with id ${id} was found.` });
    }

    return res.status(200).json(existingPurchase);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const postPurchase = async (req, res) => {
  try {
    const { total_amount, user_id, games } = req.body;

    console.log(user_id);
    if (!total_amount || isNaN(Number(total_amount))) {
      return res.status(400).json({ message: "Amount is not a valid number." });
    }

    if (!user_id || user_id === "") {
      return res.status(400).json({ message: "User id is not valid." });
    }

    const existingUser = await User.findByPk(user_id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: `No user with id ${user_id} was found.` });
    }

    const gamePromises = games.map(async (game) => {
      if (!game.name || game.name === "") {
        throw new Error("Must provide the game name.");
      }

      const existingGame = await Game.findOne({ where: { name: game.name } });
      if (!existingGame) {
        throw new Error(`No game named ${game.name} was found.`);
      }

      if (!game.price || isNaN(game.price)) {
        throw new Error("Must provide the game price.");
      }

      if (!game.quantity || isNaN(game.quantity)) {
        throw new Error("Must provide game quantity.");
      }
    });

    await Promise.all(gamePromises);

    await Purchase.create({
      description: games,
      total_amount: Number(total_amount),
      user_id: user_id,
      UserUserId: user_id,
      email: existingUser.dataValues.email,
      name: existingUser.dataValues.name,
    });

    return res
      .status(201)
      .json({ message: "Purchase was successfuly created" });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "id is invalid." });
    }

    const existingPurchase = await Purchase.findByPk(id);
    if (!existingPurchase) {
      return res.status(400).json({ message: "Purchase does not exist." });
    }

    existingPurchase.update({ active: false });

    return res
      .status(204)
      .json({ message: "Purchase was successfuly deleted." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const destroyPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const existingPurchase = await Purchase.findByPk(id);
    if (!existingPurchase) {
      return res
        .status(404)
        .json({ message: `No purchase with id ${id} was found` });
    }

    await existingPurchase.destroy();
    return res.status(204).json({ message: "Purchase was destroyed" });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const changeStateById = async (req, res) => {
  const { purchase_id, state } = req.body;

  try {
    if (isNaN(purchase_id)) {
      return res.status(400).json({ message: "id is invalid." });
    }

    if (state !== "Preparing" && state !== "Shipped" && state !== "Delivered") {
      return res.status(400).json({ message: "Invalid state" });
    }

    const existingPurchase = await Purchase.findByPk(purchase_id);
    if (!existingPurchase) {
      return res.status(400).json({ message: "Purchase does not exist." });
    }

    existingPurchase.state = state;
    await existingPurchase.save();

    return res.status(200).json({ message: "Purchase state was updated." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  getAllPurchase,
  getPurchaseByIdUser,
  getPurchaseById,
  postPurchase,
  deletePurchase,
  destroyPurchase,
  changeStateById,
};
