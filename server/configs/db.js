
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = dbConnection;
