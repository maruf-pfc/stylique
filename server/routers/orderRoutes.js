const express = require('express');
const router = express.Router();
const customerMiddleware = require('../middlewares/customerMiddleware');
const { getMyOrders, getOrderDetailsById } = require('../controllers/orderController');

router.get("/my-orders", customerMiddleware, getMyOrders);
router.get("/:id", customerMiddleware, getOrderDetailsById);

module.exports = router;