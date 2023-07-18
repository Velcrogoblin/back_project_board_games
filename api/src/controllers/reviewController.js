const { Review, Game, User, Op } = require("../db");

const getAllReviews = async (req, res) => {
  try {
    const existingReview = await Review.findAll({
      include: [{ model: User }, { model: Game }],
    });
    if (existingReview.length === 0) {
      return res.status(400).json({ message: "No reviews were found." });
    }

    return res.status(200).json(existingReview);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const postReviews = async (req, res) => {
  try {
    const { rating, comment, user_id, game_id } = req.body;
    if (!rating || isNaN(rating)) {
      return res.status(400).json({ message: "Rating is not valid" });
    }

    if (!comment || comment === "") {
      return res.status(400).json({ message: "Comment is invalid" });
    }

    if (!user_id || user_id === "") {
      return res.status(400).json({ message: "User id is not valid" });
    }

    if (!game_id || isNaN(game_id)) {
      return res.status(400).json({ message: "Game id is not valid" });
    }

    const existingReview = await Review.findOne({
      where: {
        rating: {
          [Op.eq]: rating,
        },

        comment: {
          [Op.iLike]: `%${comment}%`,
        },
      },
    });

    if (existingReview) {
      return res.status(400).json({
        message: `Purchase with rating ${rating} and comment ${comment} already exists.`,
      });
    }

    const existingGame = await Game.findByPk(game_id);
    if (!existingGame) {
      return res
        .status(400)
        .json({ message: `No game with id ${game_id} was found.` });
    }

    const existingUser = await User.findByPk(user_id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: `No user with id ${user_id} was found.` });
    }

    const reviewCreated = await Review.create({
      rating,
      comment,
    });

    reviewCreated.addUsers(existingUser);
    reviewCreated.addGames(existingGame);

    return res
      .status(201)
      .json({ message: "Your review was successfuly created." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  getAllReviews,
  postReviews,
};
