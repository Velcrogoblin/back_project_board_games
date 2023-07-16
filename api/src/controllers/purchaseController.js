const { Purchase, User, Game } = require("../db");

const getAllPurchase = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ where: { active: true } });
    if (purchases.length === 0) {
      return res.status(418).json({ message: "There are no purchase yet." });
    }

    return res.status(200).json(purchases);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const postPurchase = async (req, res) => {
  try {
    const { total_amount, username, games } = req.body;
    if (!total_amount || isNaN(Number(total_amount))) {
      return res.status(400).json({ message: "Amount is not a valid number." });
    }

    if (!username || username === "") {
      return res.status(400).json({ message: "Username is not valid." });
    }

    const existingUser = await User.findOne({ where: { name: username } });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: `No user named ${username} was found` });
    }

    const existingPurchase = await Purchase.findOne({
      where: { total_amount, username },
    });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ message: "It's already exist this purchase" });
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
      total_amount,
      username,
      UserUserId: existingUser.user_id,
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
      .status(200)
      .json({ message: "Purchase was successfuly deleted." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  getAllPurchase,
  postPurchase,
  deletePurchase,
};
