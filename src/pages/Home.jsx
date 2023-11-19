import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import ReceipeofDay from "../components/ReceipeofDay";
import PopularCategory from "../components/PopularCategory";
import LatestRecipe from "../components/LatestRecipe";
import Footer from "../components/Footer";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className=" mx-auto">
      <Navbar />
      <Search onSearch={handleSearch} />
      <ReceipeofDay />
      <PopularCategory />
      <LatestRecipe searchdata={searchResults} />
      <Footer />
    </div>
  );
};

export default Home;
