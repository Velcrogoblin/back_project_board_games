const { Router } = require("express");
const { getUsers, createUser, deleteUser, putUser } = require("../controllers/userController");

const router = Router();

router.get("/", getUsers)
  .post("/", createUser)
  .delete("/:uid", deleteUser)
  .put("/", putUser);

module.exports = router;