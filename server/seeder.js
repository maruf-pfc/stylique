const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// function to seed data
const seedData = async () => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create admin users
    const adminUsers = await User.create([
      {
        name: "Maruf",
        email: "maruf@stylique.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Sohel",
        email: "sohel@stylique.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Moriam",
        email: "moriam@stylique.com",
        password: "123456",
        role: "admin",
      },
    ]);

    // assign the default user id to each product
    const userID = adminUsers[0]._id; // pick one admin as owner

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);

    console.log("Admin users created successfully:", adminUsers);
    console.log("Sample products created successfully:", sampleProducts);
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
