const { Author, Op } = require("../db");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();

    if (authors.length === 0) {
      return res.status(404).json({ message: "There are no authors" });
    }
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postAuthor = async (req, res) => {
  const { author_name, nationality } = req.body;
  try {
    if (!author_name || !nationality) {
      return res.status(400).json({ message: "There is missing information" });
    }

    const author = await Author.findOne({ where: { author_name } });

    if (author) {
      return res
        .status(400)
        .json({
          message: `There is already an author with the name ${author_name}`,
        });
    } else {
      await Author.create({ author_name, nationality });
      return res.status(201).json({ message: "Author created successfuly" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  postAuthor,
};
