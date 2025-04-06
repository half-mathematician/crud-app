const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const { passwordResetTemplate } = require("../utils/emailTemplate");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is requried" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // generate reset token
  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();

  const resetURL = `http://localhost:8080/auth/forgot-password/${token}`;

  
  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: passwordResetTemplate(user.firstName, resetURL),
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successfully" });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !email || !password) {
    return res.json({ message: "All fields are required" });
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    return res.json({ message: "User are exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    firstName,
    lastName,
    email,
    role,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: "user created successfully", newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "All fields are required" });
  }

  const existUser = await User.findOne({ email });

  if (!existUser) {
    return res.json({ message: "Email or password not correct" });
  }

  const isPasswordMatch = await bcrypt.compare(password, existUser.password);

  if (!isPasswordMatch) {
    return res.json({ message: "Email or password not correct" });
  }

  // token
  const token = jwt.sign(
    { userId: existUser._id, role: existUser.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5h" }
  );

  res.json({
    message: "login successfully",
    user: {
      id: existUser._id,
      userName: existUser.firstName + " " + existUser.lastName,
      email: existUser.email,
      role: existUser.role,
      token: token,
    },
  });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {}
};

module.exports = {
  register,
  login,
  getUserProfile,
  forgotPassword,
  resetPassword,
};
