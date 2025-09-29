import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
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
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-400 capitalize mb-2">
            {itemList} {itemName}s
          </h1>
          <p className="text-gray-400 text-lg">Category: {categoryName}</p>
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
                    <div
                  key={index}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
                >
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
                      <span className="text-lg font-semibold text-green-400">${product.price.toFixed(2)}</span>
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
          <p className="text-gray-400 text-center mb-16">No products found in this category/type.</p>
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
                      <span className="text-green-400 font-bold">${product.price.toFixed(2)}</span>
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
