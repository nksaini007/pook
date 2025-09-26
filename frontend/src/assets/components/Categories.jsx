import React from "react";
import cetogry from "../json/Catogry.json";

const Categories = () => {
  return (
    <div className="p-3 sm:p-6 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
          Home Categories
        </h2>

        {/* ✅ 2 items on mobile, 3 on large */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cetogry.homeCategories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              {/* Category Image */}
              <div className="h-32 sm:h-40 w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-5 flex flex-col flex-grow">
                {/* Category Title */}
                <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3 hover:text-pink-400 cursor-pointer text-center">
                  {category.name}
                </h3>

                {/* Subcategories - hidden on small screens */}
                <div className="hidden sm:grid grid-cols-2 gap-2 mt-auto">
                  {category.subcategories.map((sub, idx) => (
                    <div
                      key={idx}
                      className="bg-pink-600 rounded px-2 py-1 text-white text-xs sm:text-sm font-medium hover:bg-blue-500 transition cursor-pointer text-center"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
