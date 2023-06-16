const { Router } = require("express");
const EditorialRoutes = require("./EditorialRoutes.js");
const LanguageRoutes = require("./LanguageRoutes.js");
const gameRoutes = require("./gameRoutes.js");
const router = Router();

router.use("/Editorials", EditorialRoutes);
router.use("/Languages", LanguageRoutes);
router.use("/games", gameRoutes);

module.exports = router;
