const express = require("express");
const customerMiddleware = require("../middlewares/customerMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
  createNewProduct,
  //   getAllProducts,
  //   getProductById,
  updateProduct,
  deleteProduct,
  //   searchProducts,
  //   getProductsByCategory,
  //   getProductsByBrand,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", customerMiddleware, adminMiddleware, createNewProduct);
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
router.put("/:id", customerMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", customerMiddleware, adminMiddleware, deleteProduct);
// router.get("/search", searchProducts);
// router.get("/category/:category", getProductsByCategory);
// router.get("/brand/:brand", getProductsByBrand);

module.exports = router;
