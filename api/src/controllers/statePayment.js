const { Router } = require("express");

const router = Router();

const success = (req, res) => {
  console.log(req.query);
  return res.status(200).json({ message: "Success" });
};

const failure = (req, res) => res.status(500).json({ message: "Failure" });

const pending = (req, res) => res.status(202).json({ message: "Pending" });

module.exports = {
  success,
  failure,
  pending,
};
