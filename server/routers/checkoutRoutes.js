const express = require("express");
const router = express.Router();
const customerMiddleware = require("../middlewares/customerMiddleware");
const { createCheckout, updateCheckout, finalizeCheckout } = require("../controllers/checkoutController");

router.post("/", customerMiddleware, createCheckout);
router.put("/:id/pay", customerMiddleware, updateCheckout);
router.post("/:id/finalize", customerMiddleware, finalizeCheckout);

module.exports = router;