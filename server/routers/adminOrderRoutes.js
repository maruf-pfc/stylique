const express = require("express");
const router = express.Router();

const customerMiddleware = require("../middlewares/customerMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  getAllOrders,
  updateOrderStatusByID,
  deleteOrderByID,
} = require("../controllers/adminOrderController");

router.get("/", customerMiddleware, adminMiddleware, getAllOrders);
router.put("/:id", customerMiddleware, adminMiddleware, updateOrderStatusByID);
router.delete("/:id", customerMiddleware, adminMiddleware, deleteOrderByID);

module.exports = router;