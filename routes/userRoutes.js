const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  addProduct,
  getAllProducts,
  editUserProduct,
  deleteUserProduct,
} = require("../controllers/userController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/add-products",
  authenticateToken,
  upload.single("image"),
  addProduct
);
router.get("/get-all-products", authenticateToken, getAllProducts);
router.put("/products/:productId", authenticateToken, editUserProduct);
router.delete(
  "/delete-products/:productId",
  authenticateToken,
  deleteUserProduct
);

module.exports = router;
