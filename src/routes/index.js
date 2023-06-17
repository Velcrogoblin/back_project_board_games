const { Router } = require("express");
const EditorialRoutes = require("./EditorialRoutes.js");
const LanguageRoutes = require("./LanguageRoutes.js");
<<<<<<< HEAD
const StateRoutes = require("./StatesRoutes.js");

=======
const gameRoutes = require("./gameRoutes.js");
>>>>>>> 2a4a1ba18371d028afe1d8b2f632625603757a46
const router = Router();

router.use("/Editorials", EditorialRoutes);
router.use("/Languages", LanguageRoutes);
router.use("/games", gameRoutes);

module.exports = router;
