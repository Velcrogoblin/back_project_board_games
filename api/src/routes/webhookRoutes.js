const { Router } = require("express");

const { receiveWebhook } = require("../controllers/webhookController");

const router = Router();

router.post("/", receiveWebhook);

module.exports = router;
