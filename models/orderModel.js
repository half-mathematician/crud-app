const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      name: String,
      quantity: { type: Number, require: true },
      price: { type: Number, require: true },
    },
  ],
  shippingAddress: {
    address: { type: String, require: true },
  },
  paymentMethod: { type: String },
  totalPrice: { type: String, require: true },
});

module.exports = mongoose.model("Order", orderSchema);
