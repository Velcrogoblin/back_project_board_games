const { Router } = require("express");
const { getUsers, createUser } = require("../controllers/userController");
// const { getUsers, createUser } = require("../controllers/userController");

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;