"use client";
import { useState } from "react";
import Head from "next/head";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [sideEffectExperience, setSideEffectExperience] = useState("");
  const [onlineValidation, setOnlineValidation] = useState("");
  const [appInterest, setAppInterest] = useState("");
  const [willingnessToPay, setWillingnessToPay] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Replace with your Google Form URL and entry IDs
  const formActionUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLScLfMxNyHsBf3XreSWEn6Rkujp27VnOAzsi_jhlQR3XGf2mJA/formResponse";
  const emailEntryField = "entry.177482849";
  const sideEffectEntryField = "entry.162371681";
  const onlineValidationEntryField = "entry.2014182556";
  const appInterestEntryField = "entry.2038789610";
  const willingnessToPayEntryField = "entry.386463666";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Construct form data
    const formData = new FormData();
    formData.append(emailEntryField, email);
    formData.append(sideEffectEntryField, sideEffectExperience);
    formData.append(onlineValidationEntryField, onlineValidation);
    formData.append(appInterestEntryField, appInterest);
    formData.append(willingnessToPayEntryField, willingnessToPay);

    try {
      // Submit to Google Forms
      await fetch(formActionUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setIsSubmitted(true);
      setMessage("Thank you! Your responses have been recorded.");
      setEmail("");
      setSideEffectExperience("");
      setOnlineValidation("");
      setAppInterest("");
      setWillingnessToPay("");
    } catch (error) {
      console.error("Error submitting form: ", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-red-50 to-red-100 text-gray-800 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Have you faced unusual side-effects?</title>
        <meta
          name="description"
          content="Help us revolutionize healthcare by sharing your experiences with medication side effects."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
          Have You Faced Unusual Side-Effects?
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          "Help us revolutionize healthcare by confirming the hidden side
          effects of medications."
          <br />
          Approximately 30 percent of medication side effects are reported
          <strong> after </strong> the medication is launched. You may be
          experiencing a side effect that is still unknown.
          <br />
          We are building an app that allows users to confirm medication side
          effects that are not yet clinically recognized.
        </p>
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

          <div className="mb-4">
            <label
              htmlFor="sideEffectExperience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Have you ever had a side-effect from a medication that was
              unreported or under-reported?
            </label>
            <select
              id="sideEffectExperience"
              value={sideEffectExperience}
              onChange={(e) => setSideEffectExperience(e.target.value)}
              className="w-full px-3 py-2 bg-red-50 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="onlineValidation"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Have you ever used online forums, like Reddit, to validate your
              symptoms/side-effects?
            </label>
            <select
              id="onlineValidation"
              value={onlineValidation}
              onChange={(e) => setOnlineValidation(e.target.value)}
              className="w-full px-3 py-2 bg-red-50 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="appInterest"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Will you use an app that confirms side-effects not yet reported
              clinically, but reported by other users?
            </label>
            <select
              id="appInterest"
              value={appInterest}
              onChange={(e) => setAppInterest(e.target.value)}
              className="w-full px-3 py-2 bg-red-50 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Maybe">Maybe</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="willingnessToPay"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Will you pay $0.10 (10 cents) per use of the app?
            </label>
            <select
              id="willingnessToPay"
              value={willingnessToPay}
              onChange={(e) => setWillingnessToPay(e.target.value)}
              className="w-full px-3 py-2 bg-red-50 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Maybe">Maybe</option>
            </select>
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
            Submit Your Response
          </button>
        </form>
      </main>
    </div>
  );
}
