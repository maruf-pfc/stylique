const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Helper function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

const addToCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // determine if the user is logged in or guest
    const cart = await getCart(userId, guestId);

    // if the cart exits, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (productIndex > -1) {
        // if the product already exists in the cart, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // if the product does not exist in the cart, add it
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // recalculate total price
      cart.totalPrice = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // if the cart does not exist, create a new one
      const newCart = await Cart.create({
        user: userId ? userId : null,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      await newCart.save();
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateProductQuantity = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found!!" });
    }

    const productIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );
    if (productIndex > -1) {
      // update the quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove product if quantity is 0
      }

      cart.totalPrice = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );
    if (productIndex > -1) {
      // remove the product
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const authOrGuestUserCart = async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const mergeGuestCart = async (req, res) => {
  const { guestId } = req.body;

  try {
    // Find the guest cart
    const guestCart = await Cart.findOne({ guestId });
    if (!guestCart) {
      return res.status(404).json({ message: "Guest cart not found" });
    }
    // Find the user cart
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(404).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((item) => {
          const productIndex = userCart.products.findIndex(
            (product) =>
              product.productId.toString() === item.productId.toString() &&
              product.size === item.size &&
              product.color === item.color
          );
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += item.quantity;
          } else {
            userCart.products.push(item);
          }
        });
        userCart.totalPrice = userCart.products.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        await userCart.save();

        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (err) {
          console.error("Error deleting guest cart:", err);
          return res.status(500).json({ message: "Server error" });
        }
        return res.status(200).json(userCart);
      } else {
        // if the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  updateProductQuantity,
  removeFromCart,
  authOrGuestUserCart,
  mergeGuestCart,
};
