"use client"; // Marking this as a client component

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-red-600 to-red-400 shadow-xl py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white ml-[-2rem]">
          Am I the Only One
        </div>
        <div className="md:flex space-x-8">
          <button onClick={() => alert("Chill we aren't there yet")}>
            <span className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300 cursor-pointer">
              Log In
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
