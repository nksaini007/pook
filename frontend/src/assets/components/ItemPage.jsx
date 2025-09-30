import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nev from './Nev';
import Footer from './Footer';
import productData from '../json/Products.json';

function ItemPage() {
  const { categoryName, itemName } = useParams();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // Filter products matching category and subcategory (itemName)
      const filtered = productData.filter(
        (item) =>
          item.category.toLowerCase() === categoryName.toLowerCase() &&
          item.subcategory.toLowerCase() === itemName.toLowerCase()
      );

      // Extract unique types with an image per type
      const uniqueTypesMap = new Map();

      filtered.forEach((item) => {
        const typeKey = item.type.toLowerCase();
        if (!uniqueTypesMap.has(typeKey)) {
          uniqueTypesMap.set(typeKey, {
            type: item.type,
            image: item.image || null,
          });
        }
      });

      setTypes(Array.from(uniqueTypesMap.values()));
    };

    fetchData();
  }, [categoryName, itemName]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Nev />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="relative text-center mb-14">
          {/* Gradient Glow Background */}
          <div className="absolute inset-0 -top-10 h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-30 blur-3xl rounded-3xl"></div>

          {/* Heading */}
          <h1 className="relative text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md animate-fade-in">
            {itemName} Types
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
            <span className="text-indigo-300 font-medium">{itemName}</span>
          </div>
        </div>

        {/* Types Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {types.length > 0 ? (
            types.map(({ type, image }, idx) => (
              <Link
                key={idx}
                to={`/category/${categoryName}/${itemName}/${type.toLowerCase()}`}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 flex flex-col"
              >
                {/* Image Section */}
                {image ? (
                  <img
                    src={image}
                    alt={`${type} ${itemName}`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
                    No image available
                  </div>
                )}

                {/* Text Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-2 capitalize">
                    {type}
                  </h2>
                  <p className="text-gray-400 text-sm mt-auto">
                    See all {type.toLowerCase()} {itemName.toLowerCase()}s
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No types found for this item.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ItemPage;
