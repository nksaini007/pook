import React from 'react';
import { useParams } from 'react-router-dom';
import categoryData from "../json/Catogry.json";
import Nev from './Nev';

function CategoryPage() {
  const { categoryName } = useParams();

  const matchedCategories = categoryData.homeCategories.filter(
    item => item.name === categoryName
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-0">
      {/* Navbar */}
      <Nev />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-gray-800 text-white py-8 shadow-md mb-10">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold">
            Category: <span className="capitalize text-indigo-300">{categoryName}</span>
          </h1>
          <p className="text-lg mt-2 text-gray-300">
            Explore items in the "{categoryName}" category.
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-5xl mx-auto px-4">
        {matchedCategories.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No matching categories found.
          </div>
        ) : (
          matchedCategories.map((category) => (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-4">{category.name}</h2>

              {/* Subcategory Cards */}
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.subcategories && category.subcategories.length > 0 ? (
                  category.subcategories.map((sub, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-lg p-5 shadow-md cursor-pointer border border-gray-700 hover:shadow-lg"
                      onClick={() => console.log(`Navigating to ${sub}`)} // Replace with navigation logic
                    >
                      <h3 className="text-lg font-medium text-indigo-200 mb-2">{sub}</h3>
                      <p className="text-sm text-gray-400">
                        Explore all items under "{sub}".
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 col-span-full">No subcategories available.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
