import React from 'react';
import { useParams, Link } from 'react-router-dom';
import categoryData from "../json/Catogry.json";
import Nev from './Nev';
import Footer from './Footer';

function CategoryPage() {
  const { categoryName } = useParams();

  const matchedCategories = categoryData.homeCategories.filter(
    item => item.name.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800">
      <Nev />

      <div className="max-w-7xl min-h-screen mx-auto px-4 py-10">
        {/* Header */}
        <div className="relative text-center mb-14">
          <div className="absolute inset-0 -top-10 h-40 bg-gray-200 opacity-30 blur-3xl rounded-3xl"></div>

          <h1 className="relative text-5xl font-extrabold bg-gray-400 bg-clip-text text-transparent drop-shadow-md">
             {categoryName}
          </h1>

          <p className="relative mt-3 text-gray-600 text-lg tracking-wide">
            Explore items in the <span className="font-semibold text-gray-400">"{categoryName}"</span> category.
          </p>

          <div className="relative mt-4 flex justify-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-pink-400 transition">Home</Link>
            <span>/</span>
            <span className="text-gray-400 font-medium">{categoryName}</span>
          </div>
        </div>

        {/* Category Content */}
        {matchedCategories.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No matching categories found.
          </div>
        ) : (
          matchedCategories.map((category) => (
            <div key={category.id} className="mb-16">
              {/* Category Title */}
              <h2 className="text-2xl font-semibold text-gray-500 mb-6">{category.name}</h2>

              {/* Category Image */}
              <div className="relative w-full max-w-4xl mx-auto mb-10 group">
                <div className="overflow-hidden rounded-2xl shadow-lg bg-white/50 backdrop-blur-md">
                  <img
                    src={category.image}
                    alt="Category"
                    className="w-full h-96 object-cover rounded-xl p-1 transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Subcategory Cards */}
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.subcategories && category.subcategories.length > 0 ? (
                  category.subcategories.map((sub, index) => (
                    <Link
                      key={index}
                      to={`/category/${categoryName}/${sub.toLowerCase()}`}
                      className="bg-white/70 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 block p-5"
                    >
                      <h3 className="text-lg font-bold text-gray-700 mb-2 capitalize">
                        {sub}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Explore all items under "{sub}".
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 col-span-full">No subcategories available.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CategoryPage;
