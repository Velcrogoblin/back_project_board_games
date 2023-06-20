const { Router } = require("express");
const EditorialRoutes = require("./EditorialRoutes.js");
const LanguageRoutes = require("./LanguageRoutes.js");
const gameRoutes = require("./gameRoutes.js");
const categoriesRoutes = require("./categoriesRoutes.js");
const thematicRoute = require("./thematicRoute.js");
const mechanicsRoute = require("./mechanicRoute.js");


const router = Router();

router.use("/Editorials", EditorialRoutes);
router.use("/Languages", LanguageRoutes);
router.use("/games", gameRoutes);
router.use("/categories", categoriesRoutes);
router.use("/thematics", thematicRoute);
router.use("/mechanics", mechanicsRoute);

module.exports = router;
