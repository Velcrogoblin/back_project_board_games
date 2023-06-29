const { Router } = require("express");
const { getRoles, createRole, deleteRole, putRole } = require("../controllers/roleController");

const router = Router();

router.get("", getRoles)
    .post("/", createRole)
    .delete("/:id", deleteRole)
    .put("/", putRole);

module.exports = router;