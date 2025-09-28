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
    <div className="min-h-screen bg-gray-900 text-white">
      <Nev />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Item: <span className="capitalize text-indigo-400">{itemName}</span> (
          <span className="capitalize">{categoryName}</span>)
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {types.length > 0 ? (
            types.map(({ type, image }, idx) => (
              <Link
                key={idx}
                to={`/category/${categoryName}/${itemName}/${type.toLowerCase()}`}
                className="bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg border border-gray-700 overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col"
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
                  <h2 className="text-xl text-indigo-300 capitalize mb-2 font-semibold">{type}</h2>
                  <p className="text-gray-400 text-sm mt-auto">
                    See all {type.toLowerCase()} {itemName.toLowerCase()}s
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No types found for this item.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ItemPage;
