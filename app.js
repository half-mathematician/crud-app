require("dotenv").config();
var cors = require("cors");
const express = require("express");
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// connect database
ConnectDB();

// middleware parsing JSON
app.use(express.json());
app.use(bodyParser.json({ limit: "3mb" }));

// Routes
app.get("/", (req,res )=>{
  res.send("Home page")
})
app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/admin", adminRoutes);

app.use("/order", orderRoutes);


app.listen(8080, () => {
  console.log(`Server is running on 8080`);
});
