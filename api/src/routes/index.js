const { Router } = require("express");

const EditorialRoutes = require("./EditorialRoutes.js");
const LanguageRoutes = require("./LanguageRoutes.js");
const gameRoutes = require("./gameRoutes.js");
const categoriesRoutes = require("./categoriesRoutes.js");
const thematicRoute = require("./thematicRoute.js");
const mechanicsRoute = require("./mechanicRoute.js");
const authorRoutes = require("./authorRoutes.js");
const designerRoutes = require("./designerRoutes.js");
const userRoutes = require("./userRoutes.js");
const roleRoutes = require("./roleRoutes.js");
const shippingAddressRouter = require("./shippingAddressRoutes.js");
const faqsRoutes = require("./faqRoute.js");
const paymentRoutes = require("./paymentRoute");
const purchaseRoutes = require("./purchaseRoutes");
const reviewRoutes = require("./reviewRoutes");

const router = Router();

router.use("/editorials", EditorialRoutes);
router.use("/languages", LanguageRoutes);
router.use("/games", gameRoutes);
router.use("/categories", categoriesRoutes);
router.use("/thematics", thematicRoute);
router.use("/mechanics", mechanicsRoute);
router.use("/authors", authorRoutes);
router.use("/designers", designerRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/shipping-address", shippingAddressRouter);
router.use("/faqs", faqsRoutes);
router.use("/create-order", paymentRoutes);
router.use("/purchase", purchaseRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
