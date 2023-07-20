const { Review, Game, User, Op } = require("../db");

const getAllReviews = async (req, res) => {
  try {
    const existingReview = await Review.findAll({
      where: { active: true },
      include: [{ model: User }, { model: Game }],
    });
    if (existingReview.length === 0) {
      return res.status(404).json({ message: "No reviews were found." });
    }

    return res.status(200).json(existingReview);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const postReviews = async (req, res) => {
  try {
    const { rating, comment, user_id, game_id } = req.body;

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
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

    return res.status(201).json({ message: "Review was successfuly created." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const getReviewByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === "") {
      return res.status(400).json({ message: "id is not valid." });
    }

    const existingUser = await User.findAll({
      where: {
        user_id: {
          [Op.iLike]: `%${id}%`,
        },
      },

      include: [{ model: Review }],
    });
    if (!existingUser || existingUser.length === 0) {
      return res
        .status(400)
        .json({ message: `No user with id ${id} was found.` });
    }

    return res.status(200).json(existingUser);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const getReviewsByIdGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "id is invalid." });
    }

    const existingGame = await Game.findAll({
      where: {
        game_id: {
          [Op.eq]: id,
        },
      },
      include: [{ model: Review }],
    });
    if (!existingGame || existingGame.length === 0) {
      return res
        .status(404)
        .json({ message: `No game with id ${id} was found.` });
    }

    return res.status(200).json(existingGame);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "id is not valid." });
    }

    const existingReview = await Review.findByPk(id);
    if (!existingReview) {
      return res
        .status(404)
        .json({ message: `No review with id ${id} was found.` });
    }

    await existingReview.update({ active: false });

    return res.status(204).json({ message: "Review was successfuly deleted." });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  getAllReviews,
  getReviewByIdUser,
  getReviewsByIdGame,
  postReviews,
  deleteReviewById,
};
