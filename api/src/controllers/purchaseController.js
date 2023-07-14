const { Purchase, Game, User } = require("../db");

const getAllPurchase = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    if (purchases.length === 0) {
      return res
        .status(418)
        .json({ message: "There are no purchase yet, teapot" });
    }

    return res.status(200).json(purchases);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const postPurchase = async (req, res) => {
  try {
    const { total_amount, username, game_name } = req.body;

    const existingGame = await Game.findOne({ where: { name: game_name } });
    if (!existingGame) {
      return res
        .status(400)
        .json({ message: `No game named ${game_name} was found` });
    }

    const existingUser = await User.findOne({ where: { name: username } });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: `No user named ${username} was found` });
    }

    const existingPurchase = await Purchase.findOne({
      where: { total_amount },
    });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ message: "It's already exist this purchase" });
    }

    const purchaseCreated = await Purchase({
      where: { total_amount },
    });
    purchaseCreated.addUsers(existingUser);
    purchaseCreated.addGames(existingGame);

    return res
      .status(201)
      .jsom({ message: "Purchase was successfuly created" });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  getAllPurchase,
  postPurchase,
};
