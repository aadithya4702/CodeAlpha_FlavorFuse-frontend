import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Search = ({ onSearch }) => {
  const [searchdata, setsearchdata] = useState("");

  const handlesearch = async () => {
    try {
      console.log(searchdata);

      const searchresult = await axios.post("/users/search", {
        query: searchdata,
      });

      if (searchresult.data.recipes) {
        onSearch(searchresult.data.recipes);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div className="w-4/5 mx-auto mt-5">
      <div className="flex bg-gray-700 h-14 items-center justify-center  rounded-lg">
        {/* <div className="h-full flex justify-center items-center p-2 bg-slate-400 space-x-2 rounded-tl-lg rounded-bl-lg">
          <h3 className="md:block hidden">All Category</h3>
          <FontAwesomeIcon className="iconofclose" icon={faCaretDown} />
        </div> */}
        <div className="flex-1 h-full">
          <input
            placeholder="search for recipes ..."
            className="w-full pl-2 h-full border-2 border-black"
            type="text"
            name=""
            id=""
            value={searchdata}
            onChange={(e) => setsearchdata(e.target.value)}
          />
        </div>
        <div className="p-4 text-white hover:text-red-600">
          <FontAwesomeIcon
            className="iconofclose"
            icon={faSearch}
            onClick={handlesearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
