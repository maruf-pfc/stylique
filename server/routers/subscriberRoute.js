const express = require("express");
const router = express.Router();
const { handleSubscriber } = require("../controllers/subscriberController");

router.post("/subscribe", handleSubscriber);

module.exports = router;
