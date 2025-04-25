import React from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const products = [
    {
      _id: 12322,
      name: "Product 1",
      price: 100,
      sku: "SKU123",
    },
    {
      _id: 12324,
      name: "Product 2",
      price: 200,
      sku: "SKU124",
    },
    {
      _id: 12325,
      name: "Product 3",
      price: 300,
      sku: "SKU125",
    },
    {
      _id: 12375,
      name: "Product 4",
      price: 400,
      sku: "SKU126",
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Call API to delete the product
      console.log(`Product with id ${id} deleted`);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-100 cursor-pointer text-gray-900"
                >
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
