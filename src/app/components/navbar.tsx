"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#E5E5E5] shadow-md opacity-90" : "bg-[#E5E5E5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-lg font-montserrat text-indigo-800 font-semibold">
            <Link href="/" className="text-center group flex items-center">
              <Image
                src="/assets/am-i-the-only-logo.svg"
                alt="Am I the Only One Logo"
                width={80}
                height={80}
                className="transition-transform duration-300 transform group-hover:scale-110 mr-2"
              />
              <span className="text-black">AM I THE ONLY ONE</span>
            </Link>
          </div>
          <div className="flex space-x-6 items-center">
            <Link href="/waitlist">
              <span className="text-sm text-black hover:text-indigo-700 dark:hover:text-indigo-500 transition duration-300">
                Explore
              </span>
            </Link>
            {isSignedIn ? (
              <UserButton afterSignOutUrl={pathname} />
            ) : (
              <SignInButton mode="modal">
                <span className="text-sm bg-indigo-600 text-white px-4 py-1 rounded-full hover:bg-indigo-700 transition duration-300 cursor-pointer">
                  Log In
                </span>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
