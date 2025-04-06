const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleBaseAuthorization");
const { getAdminDashboard } = require("../controllers/adminController");
const router = express.Router();

router.get("/dashboard", authenticateToken, checkRole(["admin"]), getAdminDashboard)

module.exports = router;
