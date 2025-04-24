// server/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const rateLimiter = require("./middlewares/rateLimiter");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const dbConnection = require("./configs/db");
const userRoutes = require("./routers/userRoutes");
const productRoutes = require("./routers/productRoutes");
const cartRoutes = require("./routers/cartRoutes");
const checkoutRoutes = require("./routers/checkoutRoutes");
const orderRoutes = require("./routers/orderRoutes");
const uploadRoutes = require("./routers/uploadRoutes");
const subscriberRoutes = require("./routers/subscriberRoute");
const adminRoutes = require("./routers/adminRoutes");
const adminProductRoutes = require("./routers/productAdminRoutes");
const adminOrderRoutes = require("./routers/adminOrderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Apply rate limiter to all requests
app.use(rateLimiter);

// Custom emoji + morgan setup
morgan.token("emoji", (req, res) => {
  const status = res.statusCode;
  if (status >= 100 && status < 200) return "🌀";
  if (status >= 200 && status < 300) return "✅";
  if (status >= 300 && status < 400) return "📦";
  if (status >= 400 && status < 500) return "⚠️";
  if (status >= 500 && status < 600) return "💥";
  return "❓";
});
const customFormat = `${chalk.green(":method")} ${chalk.blue(
  ":url"
)} ${chalk.yellow(":status")} :emoji - ${chalk.magenta(":response-time ms")}`;
app.use(morgan(customFormat));

// Declare each route YAML only once
const adminOrderRoute = YAML.load(path.join(__dirname, 'swagger-docs', 'admin-order-routes.yaml'));
const adminProductRoute = YAML.load(path.join(__dirname, 'swagger-docs', 'admin-product-routes.yaml'));
const cartRoute = YAML.load(path.join(__dirname, 'swagger-docs', 'cart-routes.yaml'));
const checkoutRoute = YAML.load(path.join(__dirname, 'swagger-docs', 'checkout-routes.yaml'));
const productRoute = YAML.load(path.join(__dirname, 'swagger-docs', 'product-routes.yaml'));
const userRoute = YAML.load(path.join(__dirname, 'swagger-docs', 'user-routes.yaml'));

// Serve Swagger UI at different routes
app.use('/api-docs/admin/orders', swaggerUi.serve, swaggerUi.setup(adminOrderRoute));
app.use('/api-docs/admin/products', swaggerUi.serve, swaggerUi.setup(adminProductRoute));
app.use('/api-docs/cart', swaggerUi.serve, swaggerUi.setup(cartRoute));
app.use('/api-docs/checkout', swaggerUi.serve, swaggerUi.setup(checkoutRoute));
app.use('/api-docs/products', swaggerUi.serve, swaggerUi.setup(productRoute));
app.use('/api-docs/users', swaggerUi.serve, swaggerUi.setup(userRoute));

// Mongo connection (only once in main entry file)
if (process.env.NODE_ENV !== "test") {
  dbConnection(process.env.MONGO_URI);
}

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/", subscriberRoutes);
app.use("/api/v1/admin/users", adminRoutes);
app.use("/api/v1/admin/products", adminProductRoutes);
app.use("/api/v1/admin/orders", adminOrderRoutes);

module.exports = app;
