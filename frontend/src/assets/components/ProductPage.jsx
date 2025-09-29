import React from 'react';
import { useParams } from 'react-router-dom';
import productdata from '../json/Products.json';
import Nev from './Nev';
import Footer from './Footer';
const ProductPage = () => {
  const { categoryName, itemName, productName } = useParams();
  const productId = parseInt(productName, 10);
  const productInfo = productdata.find((product) => product.id === productId);

  if (!productInfo) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <h2 className="text-2xl font-semibold text-red-500">Product not found.</h2>
      </div>
    );
  }

  return (
 <>
 <Nev/>
    <div className="bg-gray-900 min-h-screen py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden md:flex md:space-x-10 p-6 md:p-10 transition-all duration-300">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={productInfo.image}
            alt={productInfo.name}
            className="rounded-lg w-full object-cover h-full shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between mt-6 md:mt-0">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">{productInfo.name}</h1>
            <div className="text-sm text-gray-400 mb-4 space-y-1">
              <p><span className="text-gray-500">Category:</span> {productInfo.category}</p>
              <p><span className="text-gray-500">Subcategory:</span> {productInfo.subcategory}</p>
              <p><span className="text-gray-500">Type:</span> {productInfo.type}</p>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">{productInfo.details}</p>

            <div className="mb-6">
              <p className="text-3xl font-extrabold text-green-400 mb-2">
                ${productInfo.price.toFixed(2)}
              </p>
              <p className={`font-medium ${productInfo.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {productInfo.stock > 0
                  ? `${productInfo.stock} in stock`
                  : 'Out of stock'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition disabled:opacity-50"
              disabled={productInfo.stock === 0}
            >
              🛒 Add to Cart
            </button>
            <button
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition disabled:opacity-50"
              disabled={productInfo.stock === 0}
            >
              💳 Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
 </>
  );
};

export default ProductPage;
