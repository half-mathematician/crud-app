const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Please, send items for order placement" });
    }

    const order = new Order({
      user: req.user.userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrderUser = await order.save();

    res.status(201).json(createdOrderUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  placeOrder,
};
