const { Faq, Op } = require("../db");

const postFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Faq is required" });
    }

    const existingFaq = await Faq.findOne({
      where: {
        question: {
          [Op.iLike]: `%${question}%`,
        },
      },
    });

    if (existingFaq) {
      return res
        .status(406)
        .json({ message: `Faq ${question} already exists` });
    }

    await Faq.create({ question, answer });
    return res
      .status(201)
      .json({ message: `Faq ${question} created successfully` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllFaqs = async (req, res) => {
  try {
    const existingFaqs = await Faq.findAll();

    if (existingFaqs.length === 0) {
      return res.status(404).json({ message: "No Faqs found" });
    }

    return res.status(200).json(existingFaqs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFaq = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "The id must be a number." });
  }

  try {
    const faq = await Faq.findByPk(id);

    if (faq) {
      faq.active = false;
      await faq.save();
      return res
        .status(200)
        .json({ message: `The Faq ${faq.question} has been deleted.` });
    }

    return res.status(404).json({ message: `There is no Faq with id ${id}.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const putFaq = async (req, res) => {
  const { faq_id, question, active } = req.body;

  if (!faq_id) {
    return res.status(400).json({ message: "faq_id is required." });
  }

  try {
    const faq = await Faq.findByPk(faq_id);

    if (faq) {
      if (question) faq.question = question;
      if (active !== undefined) faq.active = active;

      await faq.save();
      return res.status(200).json({ message: "The Faq has been updated." });
    }

    return res
      .status(404)
      .json({ message: `There is no Faq with id ${faq_id}.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getFaqsByQuestion = async (req, res) => {
  try {
    const searchTerm = req.query.question || "";
    const faqs = await Faq.findAll({
      where: {
        question: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
    });

    if (faqs.length === 0) {
      return res.status(404).json({ message: "No se encontraron preguntas." });
    }

    return res.json(faqs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los faq" });
  }
};

module.exports = {
  postFaq,
  getAllFaqs,
  deleteFaq,
  putFaq,
  getFaqsByQuestion,
};
