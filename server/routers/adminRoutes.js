const express = require("express");
const router = express.Router();

const customerMiddleware = require("../middlewares/customerMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  getAllUsers,
  addNewUser,
  updateUserByID,
  deleteUserByID,
} = require("../controllers/adminController");

router.get("/", customerMiddleware, adminMiddleware, getAllUsers);
router.post("/", customerMiddleware, adminMiddleware, addNewUser);
router.put("/:id", customerMiddleware, adminMiddleware, updateUserByID);
router.delete("/:id", customerMiddleware, adminMiddleware, deleteUserByID);

module.exports = router;
