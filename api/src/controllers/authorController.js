const { Author } = require("../db");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();

    if (authors.length === 0) {
      return res.status(404).json({ message: "There are no authors" });
    }
    return res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findByPk(id);
    if (author) {
      author.active = false;
      await author.save();
      return res.status(200).json({ message: `The author ${author.author_name} has been deleted.` });
    }
    res.status(400).json({ message: `There is no author with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

const putAuthor = async (req, res) => {
  const { id, author_name, nationality, active } = req.body;
  try {
    const author = await Author.findByPk(id);
    if (author) {
      if (author_name) author.author_name = author_name;
      if (nationality) author.nationality = nationality;
      if (active !== undefined) author.active = active;
      await author.save();
      return res.status(200).json({ message: `The author has been updated.` });
    }
    res.status(400).json({ message: `There is no author with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

module.exports = {
  postAuthor,
  getAllAuthors,
  deleteAuthor,
  putAuthor
};
