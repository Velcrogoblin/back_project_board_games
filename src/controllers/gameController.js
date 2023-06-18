const getAllGames = (req, res) => {
  return res.status(200).json({ message: "Dale Nico acepta el pull." });
};

module.exports = {
  getAllGames,
};
