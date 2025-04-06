const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://ijazliaqat7900:${process.env.DB_PASSWORD}@cluster0.fljlx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true`
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // process.exit(1);
  }
};

module.exports = connectDB;
