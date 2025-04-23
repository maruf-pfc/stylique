const express = require("express");
const customerMiddleware = require("../middlewares/customerMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
  getAllProducts,
  getAllFilteredProducts,
  getSimilarProducts,
  getBestSellerProducts,
  getNewArrivalsProducts,
  createNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/filtered", getAllFilteredProducts);
router.get("/similar/:id", getSimilarProducts);
router.get("/best-seller", getBestSellerProducts);
router.get("/new-arrivals", getNewArrivalsProducts);
router.post("/", customerMiddleware, adminMiddleware, createNewProduct);
router.get("/:id", getProductById);
router.put("/:id", customerMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", customerMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
