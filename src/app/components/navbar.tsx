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
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-purple-100 to-pink-100 shadow-md opacity-90"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-xl font-mackinac text-indigo-900 font-semibold">
          <Link href="/">Am I the Only One</Link>
        </div>
        <div className="md:flex space-x-4 ">
          <Link href="/waitlist">
            <span className="text-indigo-900 hover:text-indigo-700 transition duration-300">
              Explore
            </span>
          </Link>
          <button onClick={() => alert("Under Construction")}>
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 cursor-pointer">
              Log In
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
