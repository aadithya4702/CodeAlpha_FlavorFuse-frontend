import React, { useContext } from "react";
import { UserContextProvider } from "./context/userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Landingpage from "./pages/Landingpage";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Cateory from "./pages/Cateory";
import Myfavorites from "./pages/Myfavorites";
import Recipe from "./pages/Recipe";
import RecipeDesc from "./pages/RecipeDesc";
import ProtectedRoute from "../PrivateRoute";

function App() {
  return (
    <>
      <UserContextProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/auth" element={<Signin />} />

            <Route
              path="/category"
              element={<ProtectedRoute component={<Cateory />} />}
            />
            <Route
              path="/myrecipes"
              element={<ProtectedRoute component={<Recipe />} />}
            />
            {/* <Route
              path="/favorites"
              element={<ProtectedRoute component={<Myfavorites />} />}
            /> */}
            <Route
              path="/recipedesc/:recipeId"
              element={<ProtectedRoute component={<RecipeDesc />} />}
            />
            <Route
              path="/home"
              element={<ProtectedRoute component={<Home />} />}
            />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
