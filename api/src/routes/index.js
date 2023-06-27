const { Router } = require("express");

const EditorialRoutes = require("./EditorialRoutes.js");
const LanguageRoutes = require("./LanguageRoutes.js");
const gameRoutes = require("./gameRoutes.js");
const categoriesRoutes = require("./categoriesRoutes.js");
const thematicRoute = require("./thematicRoute.js");
const mechanicsRoute = require("./mechanicRoute.js");
const authorRoutes = require("./authorRoutes.js");
const designerRoutes = require("./designerRoutes.js");
const faqRoutes = require("./faqRoute.js");

const router = Router();

router.use("/editorials", EditorialRoutes);
router.use("/languages", LanguageRoutes);
router.use("/games", gameRoutes);
router.use("/categories", categoriesRoutes);
router.use("/thematics", thematicRoute);
router.use("/mechanics", mechanicsRoute);
router.use("/authors", authorRoutes);
router.use("/designers", designerRoutes);
router.use("/faqs", faqRoutes);

module.exports = router;
