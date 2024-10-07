"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Replace with your Google Form URL and entry ID
  const formActionUrl =
    "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
  const emailEntryField = "entry.123456789"; // Replace with your form's email entry field name

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Construct form data
    const formData = new FormData();
    formData.append(emailEntryField, email);

    try {
      // Submit to Google Forms
      await fetch(formActionUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setIsSubmitted(true);
      setMessage("Thank you! You have been added to the waitlist.");
      setEmail(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error submitting form: ", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-red-50 text-gray-800 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Join the Waitlist</title>
        <meta
          name="description"
          content="Submit your email to join the waitlist for our upcoming product."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-[-rem]">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
          Join Our Waitlist
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-red-50 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                isSubmitted ? "text-green-600" : "text-red-600"
              } mb-4`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          >
            Join the Waitlist
          </button>
        </form>
      </main>
    </div>
  );
}
