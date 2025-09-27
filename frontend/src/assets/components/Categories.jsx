// import React from "react";
// import cetogry from "../json/Catogry.json";

// const Categories = () => {
//   return (
//     <div className="p-3 sm:p-6 bg-slate-900 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
//           Home Categories
//         </h2>

//         {/* ✅ 2 items on mobile, 3 on large */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {cetogry.homeCategories.map((category) => (
//             <div
//               key={category.id}
//               className="bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col"
//             >
//               {/* Category Image */}
//               <div className="h-32 sm:h-40 w-full overflow-hidden">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               {/* Card Content */}
//               <div className="p-3 sm:p-5 flex flex-col flex-grow">
//                 {/* Category Title */}
//                 <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3 hover:text-pink-400 cursor-pointer text-center">
//                   {category.name}
//                 </h3>

//                 {/* Subcategories - hidden on small screens */}
//                 <div className="hidden sm:grid grid-cols-2 gap-2 mt-auto">
//                   {category.subcategories.map((sub, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-pink-600 rounded px-2 py-1 text-white text-xs sm:text-sm font-medium hover:bg-blue-500 transition cursor-pointer text-center"
//                     >
//                       {sub}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;
import React from "react";
import cetogry from "../json/Catogry.json";

const Categories = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden p-6">
      {/* Light glow blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-500 opacity-20 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-pink-500 opacity-20 rounded-full blur-[100px] z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cetogry.homeCategories.map((category) => (
            <div
              key={category.id}
              className="relative group bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="h-48 w-full mb-6 overflow-hidden rounded-lg"> {/* Increased height to 192px */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 text-center group-hover:text-pink-400 transition">
                {category.name}
              </h3>

              {/* Subcategories */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                {category.subcategories.map((sub, idx) => (
                  <span
                    key={idx}
                    className="text-white text-xs bg-white/20 px-3 py-1 rounded-full text-center backdrop-blur-sm hover:bg-pink-500 hover:text-white transition-all cursor-pointer"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

