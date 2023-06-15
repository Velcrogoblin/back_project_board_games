const { Router } = require("express");
const dogRoute = require("./dogRoute");

const router = Router();

router.use("/game", dogRoute);

module.exports = router;
