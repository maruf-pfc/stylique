import React, { useEffect } from "react";
import { clearCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDeliveryDate = (orderDate) => {
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5); // Assuming 5 days for delivery
    return deliveryDate.toLocaleDateString();
  };

  console.log("checkout", checkout);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order ID and Date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Estimated Delivery Date */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDeliveryDate(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.size} | {item.color}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-lg font-semibold">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment and Delivery Information */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Information */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Payment Information
              </h4>
              <p className="text-gray-500">Payment Method: PayPal</p>
            </div>

            {/* Delivery Information */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Delivery Information
              </h4>
              <p className="text-gray-500">
                Address: {checkout.shippingAddress.address},{" "}
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
              <p className="text-gray-500">Shipping Method: Standard</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
