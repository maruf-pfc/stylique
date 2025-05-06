import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-center">Loading products...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-center">Error loading products</p>
      </div>
    );
  }
  // console.log(`products ->`, products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.isArray(products) &&
        products.slice(0, 8).map((product, index) => (
          <Link key={index} to={`/product/${product._id}`}>
            <div className="bg-white p-4 rounded-lg">
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h1 className="text-sm mb-2">{product.name}</h1>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProductGrid;
