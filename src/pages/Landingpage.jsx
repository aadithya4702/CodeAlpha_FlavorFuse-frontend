import React, { useEffect } from "react";
import Typed from "typed.js";

const Landingpage = () => {
  useEffect(() => {
    // Initialize Typed.js instance
    const options = {
      strings: [
        "FlavorFuse: Where Taste Meets Innovation!",
        "Savor Every Moment with FlavorFuse.",
        "Ignite Your Culinary Creativity with FlavorFuse!",
      ],
      typeSpeed: 50, // typing speed in milliseconds
      backSpeed: 3, // backspacing speed in milliseconds
    };

    const typed = new Typed(".typed-text", options);

    // Clean up the Typed.js instance when the component unmounts
    return () => {
      // Check if the destroy method exists before calling it
      if (typed && typeof typed.destroy === "function") {
        typed.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-3/4 bg-blue-950 p-6 lg:p-10 h-full text-white">
          <div className="logo">
            <h3 className="text-2xl lg:text-3xl tracking-wide custom_logo_font">
              FlavorFuse
            </h3>
          </div>
          <div className="flex items-center justify-center h-full flex-col gap-4">
            <h3 className="text-2xl lg:text-4xl text-red-600">
              Welcome to FlavorFuse.
            </h3>
            <div className="typed">
              <span className="typed-text text-base lg:text-xl"></span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4 bg-slate-500 text-white flex items-center flex-col justify-center p-6 h-screen">
          <h3 className="text-2xl lg:text-3xl text-blue-950 mb-3 lg:mb-5">
            Get Started
          </h3>
          <div className="px-6 py-2 text-sm rounded shadow bg-red-600 hover:bg-slate-200 hover:text-red-600 text-white ">
            <a href="/auth">
              <button className="button-50" role="button">
                Log in / Sign up
              </button>
            </a>
          </div>
          <div className=" mt-10    ">
            <div className="flex items-center justify-center">
              <h3 className="text-xl">FlavorFuse</h3>
            </div>
            <p className="ml-1 mt-1 text-xs">Copyrights &copy; reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
