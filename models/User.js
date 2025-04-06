const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 3, maxlength: 40 },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
