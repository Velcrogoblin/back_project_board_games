const { Author, Op } = require("../db");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    if (authors.length === 0) {
      return res.status(400).json({ message: "There are no authors" });
    }

    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postAuthor = async (req, res) => {
  const { author_name } = req.body;
  try {
    if (!author_name) {
      return res.status(400).json({ message: "There is missing information" });
    }

    const author = await Author.findOne({ where: { author_name } });

    if (author) {
      return res
        .status(400)
        .json({
          message: `There is already an author named ${author_name}`,
        });
    } else {
      await Author.create({ author_name });
      return res.status(201).json({ message: "Author created successfuly" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'The id must be a number.' });
    }

    const author = await Author.findByPk(id);
    if (author) {
      author.active = false;
      await author.save();
      return res.status(200).json({ message: `The author ${author.author_name} has been deleted.` });
    }
    res.status(404).json({ message: `There is no author with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

const putAuthor = async (req, res) => {
  const { author_id, author_name, active } = req.body;

  if (!author_id) return res.status(400).json({ message: 'Id is required.' });

  try {
    const author = await Author.findByPk(author_id);
    if (author) {
      if (author_name) author.author_name = author_name;
      if (active !== undefined) author.active = active;
      await author.save();
      return res.status(200).json({ message: `The author has been updated.` });
    }
    res.status(404).json({ message: `There is no author with id ${author_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

module.exports = {
  getAllAuthors,
  deleteAuthor,
  putAuthor,
  postAuthor
};
