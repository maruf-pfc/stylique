const express = require("express");
const router = express.Router();

const customerMiddleware = require("../middlewares/customerMiddleware");
const {
  addToCart,
  updateProductQuantity,
  removeFromCart,
  authOrGuestUserCart,
  mergeGuestCart,
} = require("../controllers/cartController");

router.post("/", addToCart);
router.put("/", updateProductQuantity);
router.delete("/", removeFromCart);
router.get("/", authOrGuestUserCart);
router.post("/merge", customerMiddleware, mergeGuestCart);

module.exports = router;
