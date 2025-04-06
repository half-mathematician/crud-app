const productModel = require("../models/productModel");
const User = require("../models/User");

const addProduct = async (req, res) => {
  try {
    const { name, price, description, weight, units, category } = req.body;

    const userId = req.user.userId;

    const isExistUser = await User.findById(userId);

    if (!isExistUser) {
      return res.status(404).json({ message: "User not fount" });
    }

    const imageBase64 = req.file.buffer.toString("base64");

    const product = new productModel({
      name,
      price,
      description,
      weight,
      units,
      category,
      imageBase64,
      user: userId,
    });

    const createProduct = await product.save();

    res.status(201).json(createProduct);

    res
      .status(200)
      .json({ message: "Product added successfully", isExistUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" || error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "user products", products: user.products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const editUserProduct = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { name, price, category, description, weight, units } = req.body;

    const { productId } = req.params;

    const user = await User.findById(userId);

    const product = user.products.id(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
    product.weight = weight;
    product.units = units;

    await user.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteUserProduct = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { productId } = req.params;

    const user = await User.findById(userId);

    const product = user.products.id(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    product.deleteOne();
    await user.save();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  editUserProduct,
  deleteUserProduct,
};
