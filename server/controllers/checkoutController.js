const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const createCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    console.log("Checkout created:", req.user._id, newCheckout._id);

    res.status(201).json({
      message: "Checkout created successfully",
      checkout: newCheckout,
    });
  } catch (err) {
    console.error("Error creating checkout:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const updateCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      res.status(200).json({
        message: "Checkout updated successfully",
        checkout,
      });
    } else {
      return res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (err) {
    console.error("Error finding checkout:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // create order based on checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        paymentStatus: "paid",
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Delete the cart items
      await Cart.findOneAndDelete({
        user: checkout.user,
      });

      res.status(200).json({
        message: "Checkout finalized successfully",
        order: finalOrder,
      });
    } else if (checkout.isFinalized) {
      res.status(400).json({
        message: "Checkout already finalized",
      });
    } else {
      res.status(400).json({
        message: "Checkout not paid yet",
      });
    }
  } catch (err) {
    console.error("Error finalizing checkout:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  createCheckout,
  updateCheckout,
  finalizeCheckout,
};
