import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PopularCategory = () => {
  const categories = [
    {
      url: "https://th.bing.com/th/id/OIP.G3nQkiY2vipdZLk4u_ZkVAHaHa?w=155&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title: "Non-veg",
    },

    {
      url: "https://th.bing.com/th/id/OIP.F998iqEzh587YecC3mTvPgHaEK?w=298&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title: "Veg",
    },
  ];

  return (
    <div className="mt-10 w-4/5 sm:w-4/5 mx-auto">
      <h3 className="text-lg">Popular Category</h3>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center ">
            <div
              key={index}
              className="bg-white p-4 rounded-full flex flex-col items-center sm:justify-center text-center overflow-hidden hover:scale-110 transform transition-transform"
              style={{ width: "200px", height: "200px" }}
            >
              <img
                src={category.url}
                alt={category.title}
                className="text-3xl text-teal-500 mb-2 w-full h-full object-cover rounded-full"
                style={{ borderRadius: "50%", width: "100%", height: "100%" }}
              />
            </div>
            <p className="text-lg font-semibold mt-2">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
