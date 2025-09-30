import React from "react";
import cetogry from "../json/Catogry.json";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-100 to-white overflow-hidden p-6">
      {/* Light glow blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-yellow-300 opacity-20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] bg-green-300 opacity-20 rounded-full blur-[120px] z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-14 drop-shadow-md">
          Explore Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {cetogry.homeCategories.map((category) => (
            <Link key={category.id} to={`/category/${category.name}`}>
              <div className="relative group bg-white/30 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-white/20 transition-all duration-500 hover:scale-[1.04] hover:shadow-yellow-300/40 flex flex-col h-full">
                
                {/* Image */}
                <div className="h-56 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-yellow-500 transition-colors">
                    {category.name}
                  </h3>

                  {/* Subcategories with fixed width */}
                  <div className="flex flex-wrap justify-center gap-3 mt-auto">
                    {category.subcategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-sm font-medium text-gray-800/90 bg-white/60 px-2 py-1 w-28 text-center rounded-lg backdrop-blur-sm border border-gray-200/40 hover:bg-yellow-500 hover:border-yellow-400 hover:text-white transition-all cursor-pointer shadow-sm truncate"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-br from-yellow-300 via-green-300 to-teal-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
