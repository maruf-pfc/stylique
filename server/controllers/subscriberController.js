const Subscriber = require("../models/Subscriber");

const handleSubscriber = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    return res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error saving subscriber:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleSubscriber };
