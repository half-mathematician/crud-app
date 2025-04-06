const express = require("express");
const {
  register,
  login,
  getUserProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// register user route
router.post("/register", register);

// login route
router.post("/login", login);

// forgot password
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// User profile route
router.get("/userProfile", authenticateToken, getUserProfile);

module.exports = router;
