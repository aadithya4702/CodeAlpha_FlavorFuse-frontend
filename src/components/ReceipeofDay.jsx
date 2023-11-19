// ReceipeOfDay.js

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const ReceipeofDay = () => {
  const [randomrecipe, setrandomrecipe] = useState([]);

  useEffect(() => {
    const randomrecipefunc = async () => {
      try {
        const response = await axios.get("/users/random");

        if (response.status === 200) {
          setrandomrecipe(response.data.randomRecipe[0]);
        }
      } catch (error) {
        console.error("Error fetching my recipes:", error);
      }
    };

    randomrecipefunc();
  }, []);

  return (
    <div className="mt-10 w-4/5 sm:w-4/5 mx-auto">
      {randomrecipe ? (
        <div
          className="flex flex-col sm:flex-row items-center rounded-lg bg-slate-400 h-fit"
          key={randomrecipe._id}
        >
          <div className="w-full sm:w-2/4 rounded-lg overflow-hidden mb-5 sm:mb-0">
            <img
              className="rounded-lg w-full h-full object-cover"
              src={randomrecipe.image}
              alt=""
            />
          </div>
          <div className="w-full sm:w-2/4 relative p-5">
            <h3 className="text-3xl text-red-600 mb-5">Recipe of the Day</h3>
            <div className="flex space-x-3 items-center mb-3">
              <FontAwesomeIcon
                className="text-white rounded-full bg-red-500 p-2"
                icon={faThumbsUp}
              />
              <p className="text-white">Likes: {randomrecipe.Likes}</p>
            </div>
            <h3 className="text-2xl mb-3 custom_logo_font tracking-wider text-white">
              {randomrecipe.title}
            </h3>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5 mt-10 text-white">
              <p>Cooking Time: {randomrecipe.readyInMinutes} min</p>
              <p>Serves: {randomrecipe.serving}</p>
            </div>
            <div className="absolute bottom-0 ml-auto right-0 mb-4  sm:right-10">
              <Link to={`/recipedesc/${randomrecipe._id}`}>
                <FontAwesomeIcon
                  className="text-white bg-rose-500 rounded-full p-2 hover:bg-red-600"
                  icon={faArrowRight}
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center rounded-lg bg-slate-400 h-fit">
          <div className="w-full sm:w-2/4 rounded-lg overflow-hidden mb-5 sm:mb-0">
            <img
              className="rounded-lg w-full h-full object-cover"
              src="https://fabrx.co/preview/tastebite/assets/images/menus/menu1.jpg"
              alt=""
            />
          </div>
          <div className="w-full sm:w-2/4 relative p-5">
            <h3 className="text-3xl text-red-600 mb-5">Recipe of the Day</h3>
            <div className="flex space-x-3 items-center mb-3">
              <FontAwesomeIcon
                className="text-white rounded-full bg-red-500 p-2"
                icon={faThumbsUp}
              />
              <p className="text-white">Likes: 83</p>
            </div>
            <h3 className="text-2xl mb-3 custom_logo_font tracking-wider text-white">
              Mighty Super Cheesecake
            </h3>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5 mt-10 text-white">
              <p>Cooking Time: 45 min</p>
              <p>Serves: 4</p>
            </div>
            <div className="absolute bottom-0 ml-auto right-0 mb-4  sm:right-10">
              <FontAwesomeIcon
                className="text-white bg-rose-200 rounded-full p-2 hover:bg-red-600"
                icon={faArrowRight}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceipeofDay;
