import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productData from '../json/Products.json';
import Nev from './Nev';
import Footer from './Footer';

const ItemList = () => {
  const { categoryName, itemName, itemList } = useParams();
  const [mainProducts, setMainProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const category = categoryName.toLowerCase();
    const subcategory = itemName.toLowerCase();
    const type = decodeURIComponent(itemList).toLowerCase();

    const matched = productData.filter(
      (product) =>
        product.category.toLowerCase() === category &&
        product.subcategory.toLowerCase() === subcategory &&
        product.type.toLowerCase() === type
    );

    const related = productData.filter(
      (product) =>
        product.category.toLowerCase() === category &&
        product.subcategory.toLowerCase() === subcategory &&
        product.type.toLowerCase() !== type
    );

    setMainProducts(matched);
    setRelatedProducts(related);
  }, [categoryName, itemName, itemList]);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Nev />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="relative text-center mb-14">
          {/* Gradient Glow Background */}
          <div className="absolute inset-0 -top-10 h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-30 blur-3xl rounded-3xl"></div>

          {/* Heading */}
          <h1 className="relative text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md animate-fade-in">
            {itemList} {itemName}s
          </h1>

          {/* Subtext */}
          <p className="relative mt-3 text-gray-400 text-lg tracking-wide">
            Category: <span className="font-semibold text-indigo-300">{categoryName}</span>
          </p>

          {/* Breadcrumb */}
          <div className="relative mt-4 flex justify-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
            <span>/</span>
            <Link to={`/category/${categoryName}`} className="hover:text-indigo-400 transition">
              {categoryName}
            </Link>
            <span>/</span>
            <Link to={`/category/${categoryName}/${itemName}`} className="hover:text-indigo-400 transition">
              {itemName}
            </Link>
            <span>/</span>
            <span className="text-indigo-300 font-medium">{itemList}</span>
          </div>
        </div>

        {/* Main Products */}
        {mainProducts.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-200">Product Details</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {mainProducts.map((product, index) => (
                <Link
                  key={index}
                  to={`/category/${categoryName}/${itemName}/${itemList}/${product.id}`}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 block"
                >
                  <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-indigo-400">{product.name}</h3>
                      <p className="text-gray-400 mt-2 text-sm">{product.details}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold text-green-400">
                          ₹{product.price.toFixed(2)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            product.stock > 50
                              ? 'bg-green-900 text-green-300'
                              : product.stock > 10
                              ? 'bg-yellow-900 text-yellow-300'
                              : 'bg-red-900 text-red-300'
                          }`}
                        >
                          {product.stock > 50
                            ? 'In Stock'
                            : product.stock > 10
                            ? 'Limited Stock'
                            : 'Low Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center mb-16">
            No products found in this category/type.
          </p>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-200">
              You may also like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow hover:shadow-xl hover:bg-gray-700 transition duration-300 overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-indigo-300">{product.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">{product.details}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-green-400 font-bold">₹{product.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ItemList;
