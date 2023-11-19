// LatestRecipe.js

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const LatestRecipe = ({ searchdata }) => {
  const [latestrecipe, setlatestrecipe] = useState([]);

  useEffect(() => {
    const latestrecipefunc = async () => {
      try {
        if (searchdata && searchdata.length > 0) {

          setlatestrecipe(searchdata);
        } else {
          const response = await axios.get("/users/latestrecipe");

          if (response.status === 200) {
            setlatestrecipe(response.data.latestRecipes);
          }
        }
      } catch (error) {
        console.error("Error fetching latest recipes:", error);
      }
    };

    latestrecipefunc();
  }, [searchdata]);

  const recipes = [
    {
      id: 1,
      title: "Delicious Dish 1",
      rating: 4.5,
      imageUrl:
        "https://fabrx.co/preview/tastebite/assets/images/menus/menu20.jpg",
    },
    {
      id: 2,
      title: "Tasty Treat 2",
      rating: 3.8,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      title: "Yummy Recipe 3",
      rating: 5.0,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      title: "Yummy Recipe 3",
      rating: 5.0,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 5,
      title: "Yummy Recipe 3",
      rating: 5.0,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 6,
      title: "Yummy Recipe 3",
      rating: 5.0,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 7,
      title: "Yummy Recipe 3",
      rating: 5.0,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 8,
      title: "Yummy Recipe 3",
      rating: 5.0,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 9,
      title: "Yummy Recipe 3",
      rating: 5.0,
      imageUrl: "https://via.placeholder.com/300",
    },
    // Add more recipes as needed
  ];

  return (
    <div className="mt-10 w-4/5 sm:w-4/5 mx-auto mb-2">
      <h3 className="text-lg">Latest Recipes </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4">
        {latestrecipe
          ? latestrecipe.map((recipe) => (
              <a href={`/recipedesc/${recipe._id}`} key={recipe._id}>
                <div className="relative bg-white p-4 rounded-lg flex flex-col items-center text-center transition-transform transform">
                  <div className="relative overflow-hidden w-60 h-52 max-h-52 rounded-lg mb-4">
                    <img
                      className="w-full h-full object-cover transform transition-transform hover:scale-110"
                      src={recipe.image}
                      alt={recipe.title}
                    />
                    {/* <FontAwesomeIcon
                      className="absolute text-white text-2xl border-2 p-1 rounded-full bg-orange-400 top-3 right-3 -mt-2 -mr-2"
                      icon={faHeart}
                      onClick={favadd}
                    /> */}
                  </div>
                  <h3 className="text-lg font-semibold hover:text-red-600">
                    {recipe.title}
                  </h3>
                  <div className="flex justify-center items-center space-x-1 mt-2">
                    <FontAwesomeIcon
                      className="text-yellow-500"
                      icon={faThumbsUp}
                    />
                    <p>{recipe.Likes}</p>
                  </div>
                </div>
              </a>
            ))
          : recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="relative bg-white p-4 rounded-lg flex flex-col items-center text-center transition-transform transform"
              >
                <div className="relative overflow-hidden w-60 h-52 max-h-52 rounded-lg mb-4">
                  <img
                    className="w-full h-full object-cover transform transition-transform hover:scale-110"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  {/* <FontAwesomeIcon
                    className="absolute text-white text-2xl border-2 p-1 rounded-full bg-orange-400 top-3 right-3 -mt-2 -mr-2"
                    icon={faHeart}
                    onClick={favadd}
                  /> */}
                </div>
                <h3 className="text-lg font-semibold hover:text-red-600">
                  {recipe.title}
                </h3>
                <div className="flex justify-center items-center space-x-1 mt-2">
                  <FontAwesomeIcon
                    className="text-yellow-500"
                    icon={faThumbsUp}
                  />
                  <p>{recipe.Likes}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LatestRecipe;
