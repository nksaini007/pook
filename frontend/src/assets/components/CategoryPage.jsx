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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <Nev />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="relative text-center mb-14">
          {/* Gradient Glow Background */}
          <div className="absolute inset-0 -top-10 h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-30 blur-3xl rounded-3xl"></div>

          {/* Heading */}
          <h1 className="relative text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md animate-fade-in">
            Category: {categoryName}
          </h1>

          {/* Subtext */}
          <p className="relative mt-3 text-gray-400 text-lg tracking-wide">
            Explore items in the <span className="font-semibold text-indigo-300">"{categoryName}"</span> category.
          </p>

          {/* Breadcrumb */}
          <div className="relative mt-4 flex justify-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
            <span>/</span>
            <span className="text-indigo-300 font-medium">{categoryName}</span>
          </div>
        </div>

        {/* Category Content */}
        {matchedCategories.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No matching categories found.
          </div>
        ) : (
          matchedCategories.map((category) => (
            <div key={category.id} className="mb-16">
              {/* Category Title */}
              <h2 className="text-2xl font-semibold text-indigo-300 mb-6">{category.name}</h2>

              {/* Category Image */}
              <div className="relative w-full max-w-4xl mx-auto mb-10 group">
                <div className="overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm bg-white/5">
                  <img
                    src={category.image}
                    alt="Category"
                    className="w-full h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Subcategory Cards */}
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.subcategories && category.subcategories.length > 0 ? (
                  category.subcategories.map((sub, index) => (
                    <Link
                      key={index}
                      to={`/category/${categoryName}/${sub.toLowerCase()}`}
                      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 block p-5"
                    >
                      <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent capitalize mb-2">
                        {sub}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Explore all items under "{sub}".
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 col-span-full">No subcategories available.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CategoryPage;
