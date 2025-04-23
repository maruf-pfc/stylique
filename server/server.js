require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const dbConnection = require("./configs/db");
const userRoutes = require("./routers/userRoutes");
const productRoutes = require("./routers/productRoutes");
const cartRoutes = require("./routers/cartRoutes");
const checkoutRoutes = require("./routers/checkoutRoutes");
const orderRoutes = require("./routers/orderRoutes");

// Application setup
const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Add emoji based on status codes
morgan.token("emoji", function (req, res) {
  const status = res.statusCode;

  if (status >= 100 && status < 200) return "🌀"; // Informational
  if (status >= 200 && status < 300) return "✅"; // Success
  if (status >= 300 && status < 400) return "📦"; // Redirection
  if (status >= 400 && status < 500) return "⚠️"; // Client Error
  if (status >= 500 && status < 600) return "💥"; // Server Error

  return "❓"; // Unknown
});

// Custom log format with colors and emojis
const customFormat = `${chalk.green(":method")} ${chalk.blue(
  ":url"
)} ${chalk.yellow(":status")} :emoji - ${chalk.magenta(":response-time ms")}`;

app.use(morgan(customFormat));

// MongoDB connection
dbConnection(MONGO_URI);

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/orders", orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
