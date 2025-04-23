const express = require("express");
const router = express.Router();

const customerMiddleware = require("../middlewares/customerMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { getAllProducts } = require("../controllers/adminProductController");

router.get("/", customerMiddleware, adminMiddleware, getAllProducts);

module.exports = router;
