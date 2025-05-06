import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // handle adding or subtracting quantity
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if( newQuantity >= 1){
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size,
        color,
      }))
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(updateCartItemQuantity({
      productId,
      guestId,
      userId,
      size,
      color,
    }))
  }
  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)} className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}  className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {product.price.toLocaleString()}</p>
            <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)} className="mt-2">
              <RiDeleteBin6Line className="h-6 w-6 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
