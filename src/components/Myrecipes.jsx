import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

const MyRecipes = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myrecipe, setMyRecipe] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState({
    title: "", // Set a default value here
    category: "",
    vegetarian: "false",
    serving: "",
    readyin: "",
    imageurl: "",
    ingredient: "",
    instruction: "",
  });
  const [formData, setFormData] = useState({
    title: "", // Set a default value here
    category: "",
    vegetarian: "false",
    serving: "",
    readyin: "",
    imageurl: "",
    ingredient: "",
    instruction: "",
  });

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.post("/users/getmyrecipe", {
          name: user.userId,
        });

        if (response.status === 200) {
          setMyRecipe(response.data.recipes);
        }
      } catch (error) {
        console.error("Error fetching my recipes:", error);
      }
    };

    fetchMyRecipes();
  }, []);

  console.log(myrecipe);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);

    setFormData({
      title: recipe ? recipe.title : "",
      category: recipe ? recipe.category : "",
      vegetarian: recipe ? String(recipe.vegetarian) : "false",
      serving: recipe ? recipe.serving : "",
      readyin: recipe ? recipe.readyInMinutes : "",
      imageurl: recipe ? recipe.image : "",
      ingredient: recipe ? recipe.extendedIngredients : "",
      instruction: recipe ? recipe.instructions : "",
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecipe({
      title: "", // Set a default value here
      category: "",
      vegetarian: "false",
      serving: "",
      readyin: "",
      imageurl: "",
      ingredient: "",
      instruction: "",
    });
    setFormData({
      title: "",
      category: "",
      vegetarian: "false",
      serving: "",
      readyin: "",
      imageurl: "",
      ingrediant: "",
      instruction: "",
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleAddRecipe = async () => {
    console.log("add functc called");
    try {
      if (!formData) {
        throw new Error("Form data is undefined");
      }

      const data = {
        title: formData.title,
        category: formData.category,
        vegetarian: formData.vegetarian === "true",
        serving: formData.serving,
        readyin: formData.readyin,
        imageurl: formData.imageurl,
        ingrediant: formData.ingredient,
        instruction: formData.instruction,
        author: user.userId,
      };

      const response = await axios.post("/users/addrecipe", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 201) {
        toast.success("Recipe added successfully 👌", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData({
          title: "",
          category: "",
          vegetarian: "false",
          serving: "",
          readyin: "",
          imageurl: "",
          ingrediant: "",
          instruction: "",
        });
      } else {
        toast.error("Error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      closeModal();
    } catch (error) {
      console.error("Error:", error.message);
    }

    closeModal();
  };

  const handleAddEditRecipe = async () => {
    console.log("edit functc called");
    try {
      if (!formData) {
        throw new Error("Form data is undefined");
      }

      const data = {
        title: formData.title,
        category: formData.category,
        vegetarian: formData.vegetarian === "true",
        serving: formData.serving,
        readyin: formData.readyin,
        imageurl: formData.imageurl,
        ingrediant: formData.ingredient,
        instruction: formData.instruction,
        author: user.userId,
      };

      // Send the data to the backend
      const response = await axios.post("/users/editmyrecipe", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 201) {
        toast.success("Recipe updated successfully 👌", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData({
          title: "",
          category: "",
          vegetarian: "false",
          serving: "",
          readyin: "",
          imageurl: "",
          ingrediant: "",
          instruction: "",
        });
      } else {
        toast.error("Error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      closeModal();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className=" w-4/5 sm:w-4/5 mx-auto mb-2 mt-20">
      <h3 className="text-lg">My Recipes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myrecipe.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white p-4 rounded-lg flex flex-col items-center text-center transition-transform transform"
          >
            <div className="w-52 h-52 max-h-60 max-w-60">
              <img
                src={recipe.image}
                className="w-full h-full rounded-lg"
                alt={recipe.title}
              />
            </div>
            <h3 className="text-lg font-semibold hover:text-red-600">
              {recipe.title}
            </h3>
            <p className="text-gray-500">Likes: {recipe.likes}</p>
            <FontAwesomeIcon
              className="text-gray-600 hover:text-red-600 cursor-pointer mt-2"
              icon={faEdit}
              onClick={() => openModal(recipe)}
            />
          </div>
        ))}
        {/* Empty card for adding a new recipe */}
        <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center text-center transition-transform transform">
          <button
            className="text-red-600 hover:underline"
            onClick={() => openModal()}
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            Add Recipe
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center  justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full h-4/5 scrollbar-track-gray-300 scrollbar-thumb-blue-500 scrollbar-thumb-rounded-md  max-w-md overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {selectedRecipe ? "Edit Recipe" : "Add Recipe"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                selectedRecipe ? handleAddEditRecipe() : handleAddRecipe();
              }}
            >
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Likes */}
              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Vegetarian */}
              <div className="mb-4">
                <label
                  htmlFor="vegetarian"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vegetarian
                </label>
                <select
                  id="vegetarian"
                  name="vegetarian"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.vegetarian}
                  onChange={handleInputChange}
                  required
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Servings
                </label>
                <input
                  type="text"
                  id="serving"
                  name="serving"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.serving}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  ReadyIn
                </label>
                <input
                  type="text"
                  id="readyin"
                  name="readyin"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.readyin}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  ImageUrl
                </label>
                <input
                  type="text"
                  id="imageurl"
                  name="imageurl"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.imageurl}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ingredients{" "}
                  <p className="text-red-400">
                    (Note: separate each Ingredients by comma(,))
                  </p>
                </label>
                <textarea
                  id="ingredient"
                  name="ingredient"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.ingredient}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instructions
                  <p className="text-red-400">
                    (Note: separate each Instructions by comma(,))
                  </p>
                </label>
                <textarea
                  id="instruction"
                  name="instruction"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.instruction}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                id="editcreate"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {selectedRecipe ? "Save Changes" : "Add Recipe"}
              </button>
              <button
                type="button"
                className="ml-2 text-red-600 hover:underline"
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
