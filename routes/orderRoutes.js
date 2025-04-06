const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const { placeOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/place-order", authenticateToken, placeOrder)

module.exports = router;