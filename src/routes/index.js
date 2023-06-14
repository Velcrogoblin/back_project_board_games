const { Router } = require("express");
const EditorialRoutes = require("./EditorialRoutes.js");
const router = Router();

router.use("/Editorials", EditorialRoutes);

module.exports = router;
