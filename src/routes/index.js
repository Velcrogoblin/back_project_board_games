const { Router } = require("express");
const EditorialRoutes = require("./EditorialRoutes.js");
const LanguageRoutes = require("./LanguageRoutes.js");

const router = Router();

router.use("/Editorials", EditorialRoutes);
router.use("/Languages", LanguageRoutes);

module.exports = router;
