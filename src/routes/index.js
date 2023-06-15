const { Router } = require("express");
const EditorialRoutes = require("./EditorialRoutes.js");
const LanguageRoutes = require("./LanguageRoutes.js");
const StateRoutes = require("./StateRoutes.js");

const router = Router();

router.use("/Editorials", EditorialRoutes);
router.use("/Languages", LanguageRoutes);
router.use("/States", StateRoutes);

module.exports = router;
