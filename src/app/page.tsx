"use client";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Head>
        <title>Discover Unlisted Side Effects</title>
        <meta
          name="description"
          content="Our platform uses AI to discover unlisted medication side effects from sources like Reddit and forums. Find out what others are experiencing."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-red-50 py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-6">
            Discover Unlisted Side Effects with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-[60vw] mx-auto">
            We use AI to scrape data from forums and online communities to find
            medication side effects that are often overlooked in official
            sources. Stay informed with our powerful data-driven platform.
          </p>
          <div className="bg-red-600 text-white font-mono text-lg md:text-xl py-4 px-6 rounded-lg mb-6 inline-block shadow-md cursor-pointer hover:bg-red-700 transition duration-300">
            <span>Explore</span> Hidden Side Effects
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Link href="/waitlist">
            <span className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 cursor-pointer shadow-lg">
              Join the Community
            </span>
          </Link>
        </div>
      </section>

      {/* GIF Section */}
      <section className="bg-gray-100 py-20 shadow-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-6">
            AI-Powered Side Effect Discovery
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Our AI scours forums like Reddit to bring you side effects real
            users are experiencing, even when they aren't officially listed.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-red-50 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-[60vw] mx-auto">
            We're committed to uncovering the truth behind medication side
            effects by using AI to analyze data from various online sources. Our
            mission is to provide patients with better insights, enabling them
            to make informed decisions about their treatments.
          </p>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gray-200 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-6">
            Help Us Bring Hidden Side Effects to Light
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-[60vw] mx-auto">
            Your support helps us continue to grow and enhance our AI-powered
            platform. Together, we can uncover unlisted side effects and make
            healthcare more transparent.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://venmo.com/YourLinkHere" // Replace with your actual donation link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-4 py-3 rounded-full hover:bg-red-700 transition duration-300 shadow-lg"
            >
              Donate
            </a>
            <a
              href="https://calendly.com/YourLinkHere" // Replace with your actual Calendly link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 shadow-lg"
            >
              Talk to Us
            </a>
            <a
              href="https://YourSurveyLinkHere" // Replace with your actual survey or waitlist link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition duration-300 shadow-lg"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-700 py-8 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Drug Side Effects Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
