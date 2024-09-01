import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-lg py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">pip-ai</div>
        <div className="hidden md:flex space-x-8">
          {/* <Link href="/">
            <span className="text-gray-300 hover:text-white cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-300 hover:text-white cursor-pointer">About Us</span>
          </Link>
          <Link href="/support">
            <span className="text-gray-300 hover:text-white cursor-pointer">Support</span>
          </Link>
          <Link href="#">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 cursor-pointer">
              Log In
            </span>
          </Link> */}
        </div>
        <button className="md:hidden flex items-center">
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
