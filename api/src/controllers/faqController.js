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
    await Faq.create({ question: question, answer: answer });
    return res
      .status(201)
      .json({ message: `Faq ${question} created successfuly` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllFaqs = async (req, res) => {
  try {
    const existingFaq = await Faq.findAll();

    if (existingFaq.length === 0) {
      return res.status(404).json({ message: "No Faqs found" });
    }

    return res.status(200).json(existingFaq);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFaq = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ message: "The id must be a number." });

  try {
    const Faq = await Faq.findByPk(id);
    if (Faq) {
      Faq.active = false;
      await Faq.save();
      return res
        .status(200)
        .json({ message: `The Faq ${Faq.question} has been deleted.` });
    }
    res.status(404).json({ message: `There is no Faq with id ${id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

const putFaq = async (req, res) => {
  const { Faq_id, question, active } = req.body;

  if (Faq_id === undefined)
    return res.status(400).json({ message: "Id is required." });

  try {
    const Faq = await Faq.findByPk(Faq_id);
    if (Faq) {
      if (question) Faq.question = question;
      if (active !== undefined) Faq.active = active;
      await Faq.save();
      return res.status(200).json({ message: `The Faq has been updated.` });
    }
    res.status(404).json({ message: `There is no Faq with id ${Faq_id}.` });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

// Función para obtener faqs por pregunta
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
      res.status(404).json({ message: "No se encontraron preguntas." });
    } else {
      res.json(faqs);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los faq" });
  }
};

module.exports = {
  postFaq,
  getAllFaqs,
  deleteFaq,
  putFaq,
  getFaqsByQuestion,
};
