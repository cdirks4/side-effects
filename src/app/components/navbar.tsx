"use client"; // Marking this as a client component

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900
        fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 shadow-md opacity-90"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-lg font-mackinac text-indigo-800 dark:text-indigo-300 font-semibold">
            <Link href="/" className="text-center group">
              <div className="flex items-center">
                <svg
                  className="transition-transform duration-300 transform group-hover:scale-110"
                  height="34"
                  viewBox="0 0 60 60"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="logoTitle"
                  role="img"
                >
                  <title id="logoTitle">Am I the Only One Logo</title>
                  {/* Person Icon */}
                  <circle
                    cx="32"
                    cy="16"
                    r="8"
                    className="fill-indigo-700 dark:fill-indigo-300"
                  />{" "}
                  {/* Head */}
                  <path
                    d="M20 43 C23 23 41 23 44 43 Z"
                    className="fill-indigo-700 dark:fill-indigo-300 stroke-indigo-700 dark:stroke-indigo-300"
                  />
                  {/* Body */}
                  {/* Thought Bubble */}
                  <path
                    d="M40,12 Q40,4 32,4 Q24,4 24,12 Q24,16 28,16 Q28,20 32,20 Q36,20 36,16 Q40,16 40,12 Z"
                    className="fill-gray-200 dark:fill-gray-700 stroke-indigo-800 dark:stroke-indigo-300 "
                    strokeWidth="2"
                  />
                  {/* Central Question Mark */}
                  <text
                    x="32"
                    y="16"
                    textAnchor="middle"
                    fontSize="12"
                    className="fill-indigo-700 dark:fill-indigo-300 stroke-indigo-800 dark:stroke-indigo-300 "
                    fontFamily="Arial, Helvetica, sans-serif"
                  >
                    ?
                  </text>
                  {/* Additional Question Marks */}
                  {/* Top Question Mark */}
                  <text
                    x="32"
                    y="0"
                    textAnchor="middle"
                    fontSize="8"
                    className="fill-indigo-800 dark:fill-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fontFamily="Arial, Helvetica, sans-serif"
                  >
                    ?
                  </text>
                  {/* Diagonal Left Question Mark */}
                  <text
                    x="20"
                    y="8"
                    textAnchor="middle"
                    fontSize="8"
                    className="fill-indigo-600 dark:fill-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fontFamily="Arial, Helvetica, sans-serif"
                  >
                    ?
                  </text>
                  {/* Diagonal Right Question Mark */}
                  <text
                    x="44"
                    y="8"
                    textAnchor="middle"
                    fontSize="8"
                    className="fill-indigo-600 dark:fill-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fontFamily="Arial, Helvetica, sans-serif"
                  >
                    ?
                  </text>
                </svg>
                <span className="ml-2">Am I the Only One</span>
              </div>
            </Link>
          </div>
          <div className="flex space-x-6 items-center">
            <Link href="/waitlist">
              <span className="text-sm text-indigo-900 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-500 transition duration-300">
                Explore
              </span>
            </Link>
            <button onClick={() => alert("Under Construction")}>
              <span className="text-sm bg-indigo-600 text-white px-4 py-1 rounded-full hover:bg-indigo-700 transition duration-300 cursor-pointer">
                Log In
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
